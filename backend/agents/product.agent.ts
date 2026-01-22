import { BaseAgent } from "./base.agent.js";
import { runLLM } from "../llm/ollama.client.js";
import { cleanJsonResponse, parseJsonSafely } from "../utils/json.utils.js";
import type { ValidationOutput } from "../types/validation.types.js";
import type { ProductOutput } from "../types/product.types.js";

export class ProductAgent extends BaseAgent<ValidationOutput, ProductOutput> {
  name = "ProductAgent";

  async run(validation: ValidationOutput): Promise<ProductOutput> {
    this.logStart();
    
    try {
      const prompt = `
        CRITICAL: Return ONLY valid JSON. No markdown, no explanations, no extra text.

        You are a product manager.

        Based on this validation:
        ${JSON.stringify(validation, null, 2)}

        Define a realistic MVP.

        Rules:
        - Keep scope minimal
        - No technical buzzwords
        - Focus on outcome
        - Escape all quotes in string values
        - No trailing commas

        Return this EXACT JSON structure:
        {
          "mvpGoal": "string",
          "coreFeatures": ["string"],
          "excludedFeatures": ["string"],
          "successMetrics": ["string"]
        }
      `;

      const response = await runLLM(prompt);
      const cleanedResponse = cleanJsonResponse(response);
      const parsedResponse = parseJsonSafely<ProductOutput>(cleanedResponse);
      
      this.logSuccess();
      return parsedResponse;
      
    } catch (error) {
      this.logError(error as Error);
      throw error;
    }
  }
}
