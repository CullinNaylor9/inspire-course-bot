
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AIHelper } from "@/components/AIHelper";
import Index from "./pages/Index";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/course/:id",
    element: <Course />
  },
  {
    path: "/course/:courseId/lesson/:lessonId",
    element: <Lesson />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RouterProvider router={router} />
      <Toaster />
      <Sonner />
      <AIHelper />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
