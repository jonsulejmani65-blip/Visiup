import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import CaseStudies from "@/components/sections/CaseStudies";
import BlogCarousel from "@/components/sections/BlogCarousel";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <CaseStudies />
        <BlogCarousel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
