import { BaseAgent } from "./base.agent.js";
import { runLLM } from "../llm/ollama.client.js";
import { cleanJsonResponse, parseJsonSafely } from "../utils/json.utils.js";

export class CriticAgent extends BaseAgent<any, any> {
  name = "CriticAgent";

  async run(input: any) {
    this.logStart();
    
    try {
      const prompt = `
        CRITICAL: Return ONLY valid JSON. No markdown, no explanations, no extra text.

        You are a skeptical reviewer.

        Critically evaluate this startup analysis:
        ${JSON.stringify(input, null, 2)}

        Rules:
        - Be harsh but fair
        - Identify weak assumptions
        - Highlight missing evidence
        - Escape all quotes in string values
        - No trailing commas

        Return this EXACT JSON structure:
        {
          "majorConcerns": ["string"],
          "assumptionsToValidate": ["string"],
          "confidenceScore": 0,
          "finalVerdict": "STRONG"
        }
      `;

      const response = await runLLM(prompt);
      const cleanedResponse = cleanJsonResponse(response);
      const parsedResponse = parseJsonSafely(cleanedResponse);
      
      this.logSuccess();
      return parsedResponse;
      
    } catch (error) {
      this.logError(error as Error);
      throw error;
    }
  }
}
