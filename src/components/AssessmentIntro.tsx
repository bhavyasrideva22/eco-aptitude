import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp, Leaf, Globe, BarChart3 } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              Climate Career Assessment
            </Badge>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Is Climate Adaptation Planning
              <span className="block text-accent">Right for You?</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              A comprehensive assessment to evaluate your readiness for careers in climate adaptation and resilience planning
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 shadow-card">
              <CardHeader className="text-center pb-3">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">20-30 Minutes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Comprehensive evaluation covering personality, skills, and career fit</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 shadow-card">
              <CardHeader className="text-center pb-3">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">WISCAR Framework</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Multi-dimensional analysis of Will, Interest, Skill, Cognitive fit & more</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 shadow-card">
              <CardHeader className="text-center pb-3">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Career Roadmap</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Personalized recommendations and learning paths for your journey</p>
              </CardContent>
            </Card>
          </div>

          {/* What You'll Discover */}
          <Card className="bg-gradient-card backdrop-blur-sm border-white/20 shadow-glow mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-foreground">What You'll Discover</CardTitle>
              <CardDescription className="text-center text-lg">
                This assessment evaluates multiple dimensions of career fit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Psychological Fit</h3>
                      <p className="text-muted-foreground">Big 5 personality traits, values alignment, and motivation style</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Leaf className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Technical Readiness</h3>
                      <p className="text-muted-foreground">Environmental science, GIS, and climate adaptation knowledge</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Career Alignment</h3>
                      <p className="text-muted-foreground">Match with specific roles like Climate Resilience Analyst</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Learning Path</h3>
                      <p className="text-muted-foreground">Customized roadmap to develop required skills and knowledge</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button 
              onClick={onStartAssessment} 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold shadow-eco hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Start Your Assessment
            </Button>
            <p className="text-white/80 mt-4">
              Free • No registration required • Instant results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};