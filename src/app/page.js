
import Banner from "@/components/Banner";
import CardsSection from "@/components/CardsSection";
import HowItWorks from "@/components/howItWorks";
import TrustedByStudents from "@/components/TrustedByTheStudennt";


export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <CardsSection></CardsSection>
     
      <HowItWorks></HowItWorks>
      <TrustedByStudents></TrustedByStudents>
      
    </div>
  );
}
