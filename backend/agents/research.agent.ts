import { BaseAgent } from "./base.agent.js";
import { runLLM } from "../llm/ollama.client.js";
import { cleanJsonResponse, parseJsonSafely } from "../utils/json.utils.js";
import type { ResearchInput, ResearchOutput } from "../types/research.types.js";

export class ResearchAgent extends BaseAgent<ResearchInput, ResearchOutput> {
  name = "ResearchAgent";

  async run(input: ResearchInput): Promise<ResearchOutput> {
    this.logStart();
    
    try {
      const prompt = `
        CRITICAL: Return ONLY valid JSON. No markdown, no explanations, no extra text.

        You are a research analyst.
        Research this problem factually:

        "${input.problemStatement}"

        Geography: ${input.geography ?? "Global"}

        Rules:
        - No opinions
        - Use neutral language
        - No assumptions
        - Escape all quotes in string values
        - No trailing commas

        Return this EXACT JSON structure:
        {
          "overview": "string",
          "affectedUsers": ["string"],
          "statistics": [
            { "stat": "string", "source": "string" }
          ],
          "constraints": ["string"]
        }
      `;

      const response = await runLLM(prompt);
      const cleanedResponse = cleanJsonResponse(response);
      const parsedResponse = parseJsonSafely<ResearchOutput>(cleanedResponse);
      
      this.logSuccess();
      return parsedResponse;
      
    } catch (error) {
      this.logError(error as Error);
      throw error;
    }
  }
}
