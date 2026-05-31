// import Image from "next/image";
import Navbar from '@/components/Navbar'
import Intro from '@/components/Intro'

export default function Home() {
  return (
    <div className="bg-sky-50 text-black min-h-screen">
      <Navbar />
      <Intro />
    </div>
  );
}
