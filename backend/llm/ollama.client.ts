import axios from "axios";

const ollama = axios.create({
  baseURL: "http://localhost:11434/api",
  timeout: 60000,
});

export async function runLLM(
  prompt: string,
  model = "phi3:mini"
): Promise<string> {
  const res = await ollama.post("/generate", {
    model,
    prompt,
    stream: false,
  });

  return res.data.response;
}
