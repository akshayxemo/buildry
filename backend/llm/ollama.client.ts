import axios from "axios";

const ollama = axios.create({
  baseURL: "http://localhost:11434/api",
  timeout: 60000,
});

export async function runLLM(
  prompt: string,
  model = "phi3:mini"
): Promise<string> {
  try {
    const res = await ollama.post("/generate", {
      model,
      prompt,
      stream: false,
    });

    return res.data.response;
    
  } catch (error) {
    console.error(`❌ [LLM] Request failed: ${(error as any).message}`);
    throw error;
  }
}
