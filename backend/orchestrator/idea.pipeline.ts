import { ResearchAgent } from "../agents/research.agent.js";
import { ValidationAgent } from "../agents/validation.agent.js";
import { ProductAgent } from "../agents/product.agent.js";
import { MarketAgent } from "../agents/market.agent.js";
import { CriticAgent } from "../agents/critic.agent.js";

export class BuildryPipeline {
  private research = new ResearchAgent();
  private validation = new ValidationAgent();
  private product = new ProductAgent();
  private market = new MarketAgent();
  private critic = new CriticAgent();

  async run(input: { problemStatement: string; geography?: string }) {
    console.log("🚀 [PIPELINE] Starting pipeline");
    
    try {
      const research = await this.research.run(input);
      const validation = await this.validation.run(research);
      const product = await this.product.run(validation);
      const market = await this.market.run(research);

      const critic = await this.critic.run({
        research,
        validation,
        product,
        market,
      });

      console.log("✅ [PIPELINE] Pipeline completed");

      return {
        research,
        validation,
        product,
        market,
        critic,
      };
    } catch (error) {
      console.error(`❌ [PIPELINE] Pipeline failed: ${(error as Error).message}`);
      throw error;
    }
  }
}
