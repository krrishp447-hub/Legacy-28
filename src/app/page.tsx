import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TheWalk from "@/components/TheWalk";
import Manufacture from "@/components/Manufacture";
import Techniques from "@/components/Techniques";
import Capabilities from "@/components/Capabilities";
import Numbers from "@/components/Numbers";
import About from "@/components/About";
import MissionVision from "@/components/MissionVision";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const MARQUEE_A = ["Cut & Sew", "Oversized Tees", "Made in LA", "Full-Package", "50–500 GSM", "Streetwear"];
const MARQUEE_B = ["Designing", "Fabrics", "Patterns", "Sampling", "Printing", "Cut & Sew", "QC", "Packaging", "Shipping"];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee dark items={MARQUEE_A} />
        <TheWalk />
        <Manufacture />
        <Techniques />
        <Marquee items={MARQUEE_B} />
        <Capabilities />
        <Numbers />
        <About />
        <MissionVision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
