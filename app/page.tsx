// import Image from "next/image";
import Navbar from '@/components/Navbar'
import Intro from '@/components/Intro'
import Steps from '@/components/Steps'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="bg-sky-50 text-black min-h-screen">
      <Navbar />
      <Intro />
      <Steps />
      <Stats />
      <Footer />
    </div>
  );
}
