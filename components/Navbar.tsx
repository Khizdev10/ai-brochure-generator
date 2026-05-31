const Navbar = () => {
    return (
        <div className="bg-sky-50 py-4 px-8 md:px-16 border-b border-gray-200">
            <div className="flex justify-between items-center">
                <h1 className="text-blue-600 font-bold text-2xl">brochure.ai</h1>
                <ul className="flex space-x-8">
                    <li>Home</li>
                    <li>Templates</li>
                    {/* <li>Pricing</li> */}
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;