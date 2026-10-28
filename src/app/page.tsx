import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Manifesto } from "@/components/Manifesto";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main style={{ display: "flex", flexDirection: "column", background: "var(--page)" }}>
      <Hero />
      <Work />
      <Manifesto />
      <About />
      <Footer />
    </main>
  );
}
