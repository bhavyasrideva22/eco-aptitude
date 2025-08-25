import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Target,
  Download,
  Share2,
  RotateCcw
} from "lucide-react";

interface AssessmentResultsProps {
  results: {
    psychometric_fit: number;
    technical_readiness: number;
    wiscal_scores: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability_to_learn: number;
      real_world_alignment: number;
    };
    confidence_score: number;
    recommendation: string;
  };
  onRestart: () => void;
}

const careerPaths = [
  {
    title: "Climate Resilience Analyst",
    description: "Design strategies for communities adapting to climate change",
    match: 85,
    salary: "$75K - $95K",
    skills: ["Risk Assessment", "Data Analysis", "Policy Understanding"]
  },
  {
    title: "Urban Sustainability Planner",
    description: "Assess environmental impact & planning in cities",
    match: 78,
    salary: "$65K - $85K", 
    skills: ["Urban Planning", "Environmental Science", "GIS"]
  },
  {
    title: "Disaster Risk Reduction Advisor",
    description: "Plan and mitigate climate-related disasters",
    match: 82,
    salary: "$70K - $100K",
    skills: ["Emergency Management", "Risk Modeling", "Community Engagement"]
  }
];

const learningPath = [
  {
    level: "Beginner",
    topics: "Climate science, UN SDGs, systems thinking",
    mode: "MOOC / LMS",
    duration: "3-4 weeks"
  },
  {
    level: "Intermediate", 
    topics: "GIS, adaptation tools, risk modeling",
    mode: "Simulations + Labs",
    duration: "6-8 weeks"
  },
  {
    level: "Job-ready",
    topics: "Capstone projects, local govt projects, portfolio",
    mode: "Live Projects + Certification", 
    duration: "3-4 months"
  }
];

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Yes": return "text-green-600 bg-green-50 border-green-200";
      case "Maybe": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-orange-600 bg-orange-50 border-orange-200";
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "Yes": return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "Maybe": return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      default: return <Clock className="h-6 w-6 text-orange-600" />;
    }
  };

  const getRecommendationText = (recommendation: string, score: number) => {
    switch (recommendation) {
      case "Yes": 
        return `Strong alignment! Your assessment shows ${score}% confidence for climate adaptation planning careers.`;
      case "Maybe":
        return `Moderate fit with ${score}% confidence. You show promising traits with some areas for development.`;
      default:
        return `Limited alignment at ${score}% confidence. Consider exploring adjacent fields or building foundational knowledge first.`;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Climate Adaptation Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your career readiness and recommendations
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className={`mb-8 border-2 ${getRecommendationColor(results.recommendation)}`}>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {getRecommendationIcon(results.recommendation)}
              <Badge variant="outline" className="text-lg px-4 py-2">
                Confidence Score: {results.confidence_score}%
              </Badge>
            </div>
            <CardTitle className="text-2xl">
              Climate Adaptation Planning: <span className="font-bold">{results.recommendation}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg leading-relaxed">
              {getRecommendationText(results.recommendation, results.confidence_score)}
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* WISCAR Scores */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(results.wiscal_scores).map(([dimension, score]) => (
                <div key={dimension} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">
                      {dimension.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm font-bold">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
              
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{results.psychometric_fit}%</div>
                  <div className="text-sm text-muted-foreground">Psychological Fit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{results.technical_readiness}%</div>
                  <div className="text-sm text-muted-foreground">Technical Readiness</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Top Career Matches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerPaths.map((career, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{career.title}</h3>
                    <Badge variant="secondary">{career.match}% match</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{career.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-primary">{career.salary}</span>
                    <div className="flex gap-1">
                      {career.skills.slice(0, 2).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {learningPath.map((phase, index) => (
                <div key={index} className="relative">
                  {index < learningPath.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border z-0"></div>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{phase.level}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{phase.topics}</p>
                    <div className="space-y-1 text-xs">
                      <div className="font-medium">{phase.mode}</div>
                      <div className="text-muted-foreground">{phase.duration}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Your Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.recommendation === "Yes" && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Immediate Actions</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Start with climate risk assessment modules</li>
                      <li>• Explore GIS tools and tutorials</li>
                      <li>• Join climate adaptation communities</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Medium-term Goals</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Complete specialized certification</li>
                      <li>• Build portfolio with case studies</li>
                      <li>• Network with professionals</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {results.recommendation === "Maybe" && (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Development Areas</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Strengthen climate science foundation</li>
                    <li>• Practice with environmental data analysis</li>
                    <li>• Explore internships or volunteer opportunities</li>
                    <li>• Take introductory courses in urban planning</li>
                  </ul>
                </div>
              </div>
            )}

            {results.recommendation === "Not Yet" && (
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Alternative Paths</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Consider environmental data science roles</li>
                    <li>• Explore policy research and analysis</li>
                    <li>• Build foundational environmental knowledge</li>
                    <li>• Look into climate communication careers</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Button onClick={onRestart} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Take Assessment Again
          </Button>
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Download Results
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};