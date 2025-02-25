
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Course {id} Details
          </h1>
          <p className="text-lg text-muted-foreground">
            This page will contain the full course content and materials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Course;
