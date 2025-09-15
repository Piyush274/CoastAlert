import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FirebaseTest from "@/components/FirebaseTest";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Temporary Firebase Test - Remove after debugging */}
      <div className="py-8 px-4">
        <FirebaseTest />
      </div>
    </div>
  );
};

export default Index;
