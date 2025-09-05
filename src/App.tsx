import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import OnboardingStep1 from "./pages/OnboardingStep1";
import OnboardingStep2 from "./pages/OnboardingStep2";
import OnboardingStep3 from "./pages/OnboardingStep3";
import OnboardingStep4 from "./pages/OnboardingStep4";
import Success from "./pages/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
      <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
      <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
      <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;


