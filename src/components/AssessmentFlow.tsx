import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  section: string;
  question: string;
  options: { value: string; label: string; score: number }[];
  dimension: string;
}

interface AssessmentFlowProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

const questions: Question[] = [
  // Psychometric Questions
  {
    id: "climate_interest",
    section: "Interest & Values",
    question: "I regularly follow climate change and sustainability news.",
    options: [
      { value: "1", label: "Strongly Disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly Agree", score: 5 }
    ],
    dimension: "interest"
  },
  {
    id: "problem_solving",
    section: "Problem Solving Style",
    question: "I prefer structured, evidence-based approaches to solving problems.",
    options: [
      { value: "1", label: "Strongly Disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly Agree", score: 5 }
    ],
    dimension: "cognitive"
  },
  {
    id: "teamwork",
    section: "Work Context",
    question: "I enjoy working in multidisciplinary teams to solve societal challenges.",
    options: [
      { value: "1", label: "Strongly Disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly Agree", score: 5 }
    ],
    dimension: "real_world_alignment"
  },
  {
    id: "growth_mindset",
    section: "Learning Mindset",
    question: "I believe I can develop skills in a field even if I'm not naturally gifted at it.",
    options: [
      { value: "1", label: "Strongly Disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly Agree", score: 5 }
    ],
    dimension: "ability_to_learn"
  },
  {
    id: "motivation",
    section: "Motivation",
    question: "I am passionate about making a difference more than earning a high salary.",
    options: [
      { value: "1", label: "Strongly Disagree", score: 1 },
      { value: "2", label: "Disagree", score: 2 },
      { value: "3", label: "Neutral", score: 3 },
      { value: "4", label: "Agree", score: 4 },
      { value: "5", label: "Strongly Agree", score: 5 }
    ],
    dimension: "will"
  },
  // Technical Questions
  {
    id: "data_interpretation",
    section: "Technical Skills",
    question: "When looking at a flood risk map, what would be most important to assess first?",
    options: [
      { value: "1", label: "Population density in affected areas", score: 5 },
      { value: "2", label: "Economic value of infrastructure", score: 3 },
      { value: "3", label: "Historical flood patterns", score: 4 },
      { value: "4", label: "Political boundaries", score: 2 }
    ],
    dimension: "skill"
  },
  {
    id: "gis_knowledge",
    section: "Technical Knowledge",
    question: "What does GIS primarily help with in climate adaptation planning?",
    options: [
      { value: "1", label: "Creating beautiful maps", score: 2 },
      { value: "2", label: "Spatial analysis of climate risks", score: 5 },
      { value: "3", label: "Data storage", score: 3 },
      { value: "4", label: "I'm not familiar with GIS", score: 1 }
    ],
    dimension: "skill"
  },
  {
    id: "adaptation_concepts",
    section: "Climate Knowledge",
    question: "Climate adaptation differs from mitigation because it focuses on:",
    options: [
      { value: "1", label: "Reducing greenhouse gas emissions", score: 1 },
      { value: "2", label: "Adjusting to climate change impacts", score: 5 },
      { value: "3", label: "Preventing climate change", score: 2 },
      { value: "4", label: "Carbon trading", score: 1 }
    ],
    dimension: "skill"
  },
  {
    id: "systems_thinking",
    section: "Cognitive Abilities",
    question: "A coastal city faces sea level rise. What's the most comprehensive approach?",
    options: [
      { value: "1", label: "Build sea walls", score: 2 },
      { value: "2", label: "Relocate all residents", score: 3 },
      { value: "3", label: "Integrate infrastructure, policy, and community planning", score: 5 },
      { value: "4", label: "Focus only on economic impacts", score: 1 }
    ],
    dimension: "cognitive"
  },
  {
    id: "persistence",
    section: "Work Style",
    question: "Climate adaptation projects often take years to implement. How do you handle long-term projects?",
    options: [
      { value: "1", label: "I prefer quick results", score: 2 },
      { value: "2", label: "I can manage with clear milestones", score: 4 },
      { value: "3", label: "I thrive on long-term, complex challenges", score: 5 },
      { value: "4", label: "I find them frustrating", score: 1 }
    ],
    dimension: "will"
  },
  // Additional WISCAR questions
  {
    id: "environmental_concern",
    section: "Values & Interest",
    question: "How important is environmental protection in your career decisions?",
    options: [
      { value: "1", label: "Not important", score: 1 },
      { value: "2", label: "Somewhat important", score: 3 },
      { value: "3", label: "Very important", score: 4 },
      { value: "4", label: "Essential - it's my top priority", score: 5 }
    ],
    dimension: "interest"
  },
  {
    id: "learning_style",
    section: "Learning Approach",
    question: "How do you prefer to learn new technical skills?",
    options: [
      { value: "1", label: "Hands-on practice and experimentation", score: 5 },
      { value: "2", label: "Structured courses and lectures", score: 4 },
      { value: "3", label: "Reading and self-study", score: 3 },
      { value: "4", label: "Learning from colleagues", score: 4 }
    ],
    dimension: "ability_to_learn"
  },
  {
    id: "policy_interest",
    section: "Work Environment",
    question: "How comfortable are you with policy and regulatory environments?",
    options: [
      { value: "1", label: "Very uncomfortable - I prefer technical work", score: 2 },
      { value: "2", label: "Somewhat comfortable", score: 3 },
      { value: "3", label: "Comfortable - I understand their importance", score: 4 },
      { value: "4", label: "Very comfortable - I enjoy policy work", score: 5 }
    ],
    dimension: "real_world_alignment"
  },
  {
    id: "uncertainty_comfort",
    section: "Problem Solving",
    question: "Climate science involves uncertainty and evolving knowledge. How do you handle this?",
    options: [
      { value: "1", label: "I prefer certainty and clear answers", score: 2 },
      { value: "2", label: "I can work with some uncertainty", score: 3 },
      { value: "3", label: "I'm comfortable with uncertainty", score: 4 },
      { value: "4", label: "I thrive in uncertain, evolving fields", score: 5 }
    ],
    dimension: "cognitive"
  },
  {
    id: "community_engagement",
    section: "Work Style",
    question: "How interested are you in working directly with communities affected by climate change?",
    options: [
      { value: "1", label: "Not interested - I prefer behind-the-scenes work", score: 2 },
      { value: "2", label: "Somewhat interested", score: 3 },
      { value: "3", label: "Very interested", score: 4 },
      { value: "4", label: "Essential - community engagement drives my passion", score: 5 }
    ],
    dimension: "real_world_alignment"
  }
];

export const AssessmentFlow = ({ onComplete, onBack }: AssessmentFlowProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results
      const results = calculateResults(answers);
      onComplete(results);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const canProceed = answers[currentQ.id] !== undefined;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Climate Adaptation Assessment</h2>
            <span className="text-muted-foreground">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="text-sm text-primary font-medium mb-2">
              {currentQ.section}
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQ.id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQ.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer text-base leading-relaxed"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentQuestion === 0 ? "Back to Intro" : "Previous"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

function calculateResults(answers: Record<string, string>) {
  const dimensions = {
    will: [] as number[],
    interest: [] as number[],
    skill: [] as number[],
    cognitive: [] as number[],
    ability_to_learn: [] as number[],
    real_world_alignment: [] as number[]
  };

  // Process answers and group by dimension
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const option = question.options.find(opt => opt.value === answerValue);
      if (option) {
        dimensions[question.dimension as keyof typeof dimensions].push(option.score);
      }
    }
  });

  // Calculate average scores for each dimension
  const wiscalScores = Object.entries(dimensions).reduce((acc, [dimension, scores]) => {
    const average = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
    acc[dimension] = Math.round((average / 5) * 100); // Convert to 0-100 scale
    return acc;
  }, {} as Record<string, number>);

  // Calculate overall scores
  const psychometricFit = Math.round((wiscalScores.interest + wiscalScores.will + wiscalScores.real_world_alignment) / 3);
  const technicalReadiness = wiscalScores.skill;
  const confidenceScore = Math.round(Object.values(wiscalScores).reduce((sum, score) => sum + score, 0) / 6);

  // Determine recommendation
  let recommendation = "Not Yet";
  if (confidenceScore >= 75) recommendation = "Yes";
  else if (confidenceScore >= 60) recommendation = "Maybe";

  return {
    psychometric_fit: psychometricFit,
    technical_readiness: technicalReadiness,
    wiscal_scores: wiscalScores,
    confidence_score: confidenceScore,
    recommendation,
    answers
  };
}