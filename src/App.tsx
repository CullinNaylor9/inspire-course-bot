
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import NotFound from "./pages/NotFound";
import Simulator from "./pages/Simulator";
import { AIHelper } from "./components/AIHelper";

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
    path: "/simulator",
    element: <Simulator />
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
      <AIHelper /> {/* AI Helper is now rendered at the app level */}
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
