import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PaymentMethods from "@/components/PaymentMethods";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Guide from "@/components/Guide";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <PaymentMethods />
        <Pricing />
        <Guide />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
