import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BlogDisplayProps {
  content: string;
  topic: string;
}

const BlogDisplay = ({ content, topic }: BlogDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-sans bg-accent text-accent-foreground uppercase tracking-wider">
          {topic}
        </span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-2 text-muted-foreground">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <div className="prose prose-lg max-w-none font-serif text-foreground leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    </article>
  );
};

export default BlogDisplay;
