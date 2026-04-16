import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import BlogTopicInput from "@/components/BlogTopicInput";
import BlogDisplay from "@/components/BlogDisplay";
import LoadingState from "@/components/LoadingState";
import { generateBlog } from "@/lib/api";
import { PenLine } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const [blogTopic, setBlogTopic] = useState("");
  const { toast } = useToast();

  const handleGenerate = async (topic: string) => {
    setIsLoading(true);
    setBlogContent(null);
    setBlogTopic(topic);

    try {
      const content = await generateBlog(topic);
      setBlogContent(content);
    } catch {
      toast({
        title: "Generation failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-16 px-4 space-y-12">
        {/* Header */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-sans">
            <PenLine className="w-4 h-4" />
            AI Blog Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
            Write brilliant blogs,<br />in seconds.
          </h1>
          <p className="text-muted-foreground font-sans text-lg max-w-md mx-auto">
            Enter any topic and let AI craft a well-structured blog post for you.
          </p>
        </header>

        {/* Input */}
        <BlogTopicInput onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Divider */}
        {(isLoading || blogContent) && (
          <hr className="border-border" />
        )}

        {/* Content */}
        {isLoading && <LoadingState />}
        {!isLoading && blogContent && (
          <BlogDisplay content={blogContent} topic={blogTopic} />
        )}
      </div>
    </div>
  );
};

export default Index;
