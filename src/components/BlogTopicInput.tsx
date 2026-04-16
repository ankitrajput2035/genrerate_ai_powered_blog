import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface BlogTopicInputProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = ["Machine Learning", "Web Development", "Climate Change", "Space Exploration", "Healthy Eating"];

const BlogTopicInput = ({ onGenerate, isLoading }: BlogTopicInputProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) onGenerate(topic.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a blog topic…"
          className="h-12 text-base font-sans bg-card border-border focus-visible:ring-primary"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !topic.trim()} className="h-12 px-6 gap-2 text-base">
          <Sparkles className="w-4 h-4" />
          Generate
        </Button>
      </form>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setTopic(s); onGenerate(s); }}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-full text-sm font-sans bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogTopicInput;
