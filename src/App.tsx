import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OnboardingStep1 from "./pages/OnboardingStep1";
import OnboardingStep2 from "./pages/OnboardingStep2";
import OnboardingStep3 from "./pages/OnboardingStep3";
import OnboardingStep4 from "./pages/OnboardingStep4";
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";
import FounderDashboard from "./pages/FounderDashboard";
import FounderLogin from "./pages/FounderLogin";
import PasswordSetup from "./pages/PasswordSetup";
import PasswordVerify from "./pages/PasswordVerify";
import ProfilePictureSetup from "./pages/ProfilePictureSetup";
import Connections from "./pages/Connections";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Cofounders from "./pages/Cofounders";
import Mentors from "./pages/Mentors";
import Investors from "./pages/Investors";
import Events from "./pages/Events";
import VirtualEvents from "./pages/VirtualEvents";
import SuccessStories from "./pages/SuccessStories";
import IdeaValidation from "./pages/IdeaValidation";
import FounderScore from "./pages/FounderScore";
import Verification from "./pages/Verification";
import OnboardingWelcome from "./pages/OnboardingWelcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/onboarding" element={<OnboardingWelcome />} />
      <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
      <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
      <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
      <Route path="/onboarding/step4" element={<OnboardingStep4 />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/founder-login" element={<FounderLogin />} />
      <Route path="/password-setup" element={<PasswordSetup />} />
      <Route path="/password-verify" element={<PasswordVerify />} />
      <Route path="/profile-picture-setup" element={<ProfilePictureSetup />} />
      <Route path="/founder" element={<FounderDashboard />} />
      <Route path="/connections" element={<Connections />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/cofounders" element={<Cofounders />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/investors" element={<Investors />} />
      <Route path="/events" element={<Events />} />
      <Route path="/virtual-events" element={<VirtualEvents />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/idea-validation" element={<IdeaValidation />} />
      <Route path="/founder-score" element={<FounderScore />} />
      <Route path="/verification" element={<Verification />} />
    </Routes>
  );
}

export default App;


