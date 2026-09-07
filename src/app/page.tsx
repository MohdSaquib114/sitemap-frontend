import Nav from "@/components/Nav";
import CrawlSection from "@/components/CrawlSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <CrawlSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}