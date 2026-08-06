import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyKaida from "@/components/WhyKaida";
import HowItWorks from "@/components/HowItWorks";
import Categories from "@/components/Categories";
import Partners from "@/components/Partners";
import Subscription from "@/components/Subscription";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyKaida />
        <HowItWorks />
        <Categories />
        <Partners />
        <Subscription />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
