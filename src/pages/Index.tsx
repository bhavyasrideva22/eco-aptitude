import { useState } from "react";
import { AssessmentIntro } from "@/components/AssessmentIntro";
import { AssessmentFlow } from "@/components/AssessmentFlow";
import { AssessmentResults } from "@/components/AssessmentResults";

type ViewState = "intro" | "assessment" | "results";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("intro");
  const [assessmentResults, setAssessmentResults] = useState(null);

  const handleStartAssessment = () => {
    setCurrentView("assessment");
  };

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentView("results");
  };

  const handleBackToIntro = () => {
    setCurrentView("intro");
  };

  const handleRestart = () => {
    setAssessmentResults(null);
    setCurrentView("intro");
  };

  return (
    <>
      {currentView === "intro" && (
        <AssessmentIntro onStartAssessment={handleStartAssessment} />
      )}
      
      {currentView === "assessment" && (
        <AssessmentFlow 
          onComplete={handleAssessmentComplete}
          onBack={handleBackToIntro}
        />
      )}
      
      {currentView === "results" && assessmentResults && (
        <AssessmentResults 
          results={assessmentResults}
          onRestart={handleRestart}
        />
      )}
    </>
  );
};

export default Index;
