"use server";

/**
 * Scrapes a single website using Jina AI's Reader API.
 * This handles React/CSR websites perfectly by rendering the JavaScript 
 * and returning the fully extracted text in clean Markdown format!
 */
export async function scrapeWebsite(url: string): Promise<string> {
    try {
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;

        // Use Jina Reader API which automatically renders React/JavaScript pages
        const response = await fetch(`https://r.jina.ai/${formattedUrl}`, {
            headers: {
                'Accept': 'text/plain',
                'User-Agent': 'BrochureAI-Bot'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${formattedUrl}: ${response.statusText}`);
        }

        const textContent = await response.text();

        console.log(`=== SCRAPED DATA FROM ${formattedUrl} ===`);
        console.log(`Extracted ${textContent.length} characters.`);

        return textContent;

    } catch (error) {
        console.error(`Scraping error for ${url}:`, error);
        return "Failed to scrape the website. Please check the URL and try again.";
    }
}

/**
 * Intelligently crawls a React website by fetching the homepage and then 
 * visiting the most important sub-pages (About, Services, Contact, etc.).
 * Returns a single, massive text block containing all the content.
 */
export async function scrapeFullWebsite(url: string, maxPages: number = 4): Promise<string> {
    try {
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        const initialText = await scrapeWebsite(formattedUrl);
        
        let compiledText = `## Page: ${formattedUrl}\n${initialText}\n\n---\n\n`;

        // Extract internal links from the Markdown text
        const internalLinks = new Set<string>();
        const linkRegex = /\]\((.*?)\)/g;
        let match;
        const baseUrl = new URL(formattedUrl).origin;
        
        while ((match = linkRegex.exec(initialText)) !== null) {
            let href = match[1].split(' ')[0].split('#')[0]; // Clean up URL
            if (!href) continue;

            if (href.startsWith('/') && !href.startsWith('//')) {
                internalLinks.add(`${baseUrl}${href}`);
            } else if (href.startsWith(baseUrl)) {
                internalLinks.add(href);
            }
        }

        // Keywords that indicate a page has highly valuable brochure content
        const highValueKeywords = ['about', 'story', 'company', 'service', 'product', 'contact', 'pricing', 'feature', 'solution'];
        
        // Keywords that indicate a page is NOT useful for a brochure
        const ignoreKeywords = ['blog', 'article', 'post', 'news', 'terms', 'privacy', 'policy', 'legal', 'login', 'signup', 'register', 'cart', 'checkout'];
        
        const linksToVisit = Array.from(internalLinks).filter(link => {
            const lowerLink = link.toLowerCase();
            
            // 1. Immediately skip if it contains any ignore keywords
            if (ignoreKeywords.some(keyword => lowerLink.includes(keyword))) {
                return false;
            }
            
            // 2. Only keep it if it contains a high-value keyword
            return highValueKeywords.some(keyword => lowerLink.includes(keyword)) && link !== formattedUrl;
        }).slice(0, maxPages - 1);

        for (const link of linksToVisit) {
            // Small delay to be polite
            await new Promise(resolve => setTimeout(resolve, 1000));
            const data = await scrapeWebsite(link);
            if (data && !data.startsWith("Failed")) {
                compiledText += `## Page: ${link}\n${data}\n\n---\n\n`;
            }
        }

        // Clean up the final compiled text for the AI:
        // Remove all Markdown link syntax [text](url) and just leave the "text" 
        // so the AI isn't distracted by hundreds of random navigation/footer URLs
        const cleanCompiledText = compiledText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');

        return cleanCompiledText;
    } catch (e) {
        console.error("Full scrape error:", e);
        return "Failed to scrape full website.";
    }
}
