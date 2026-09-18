import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroNetworkScene from "@/components/three/HeroNetworkScene";
import About from "@/components/sections/About";
import CaseStudies from "@/components/sections/CaseStudies";
import BlogCarousel from "@/components/sections/BlogCarousel";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroNetworkScene />
        <About />
        <CaseStudies />
        <BlogCarousel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
