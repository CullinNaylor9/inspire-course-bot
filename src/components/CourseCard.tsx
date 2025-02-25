
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
}

export function CourseCard({ title, description, image, category, duration }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <AspectRatio ratio={16 / 9} className="bg-accent">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </AspectRatio>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {category}
          </Badge>
          <Badge variant="outline" className="ml-auto">
            {duration}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  );
}
