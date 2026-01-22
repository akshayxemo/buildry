import { BaseAgent } from "./base.agent.js";
import { runLLM } from "../llm/ollama.client.js";
import type { ResearchInput, ResearchOutput } from "../types/research.types.js";

export class ResearchAgent extends BaseAgent<ResearchInput, ResearchOutput> {
  name = "ResearchAgent";

  async run(input: ResearchInput): Promise<ResearchOutput> {
    const prompt = `
        Return ONLY valid JSON.

        You are a research analyst.
        Research this problem factually:

        "${input.problemStatement}"

        Geography: ${input.geography ?? "Global"}

        Rules:
        - No opinions
        - Use neutral language
        - No assumptions

        JSON format:
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
    return JSON.parse(response);
  }
}
