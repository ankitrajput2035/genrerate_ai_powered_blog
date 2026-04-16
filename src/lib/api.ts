const API_URL = "https://n3txk4vv91.execute-api.us-east-1.amazonaws.com/dev/generate_blogs";

export async function generateBlog(blogTopic: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blog_topic: blogTopic }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate blog (${response.status})`);
  }

  const data = await response.json();
  // Handle different response formats
  if (typeof data === "string") return data;
  return data.blog || data.body || data.result || JSON.stringify(data);
}
