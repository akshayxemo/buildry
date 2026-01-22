import { BaseAgent } from "./base.agent.js";
import { runLLM } from "../llm/ollama.client.js";
import { cleanJsonResponse, parseJsonSafely } from "../utils/json.utils.js";
import type { ResearchOutput } from "../types/research.types.js";
import type { MarketOutput } from "../types/market.types.js";

export class MarketAgent extends BaseAgent<ResearchOutput, MarketOutput> {
  name = "MarketAgent";

  async run(research: ResearchOutput): Promise<MarketOutput> {
    this.logStart();
    
    try {
      const prompt = `
        CRITICAL: Return ONLY valid JSON. No markdown, no explanations, no extra text.

        You are a market analyst.

        Analyze the market using this research:
        ${JSON.stringify(research, null, 2)}

        Rules:
        - Be realistic
        - No hype
        - No assumptions beyond data
        - Escape all quotes in string values
        - No trailing commas

        Return this EXACT JSON structure:
        {
          "existingAlternatives": ["string"],
          "differentiation": ["string"],
          "pricingSignals": ["string"],
          "distributionChannels": ["string"]
        }
      `;

      const response = await runLLM(prompt);
      const cleanedResponse = cleanJsonResponse(response);
      const parsedResponse = parseJsonSafely<MarketOutput>(cleanedResponse);
      
      this.logSuccess();
      return parsedResponse;
      
    } catch (error) {
      this.logError(error as Error);
      throw error;
    }
  }
}
