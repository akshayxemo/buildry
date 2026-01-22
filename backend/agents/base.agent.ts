export abstract class BaseAgent<I, O> {
  abstract name: string;
  
  abstract run(input: I): Promise<O>;

  protected logStart(): void {
    console.log(`🤖 [${this.name}] Starting...`);
  }

  protected logSuccess(): void {
    console.log(`✅ [${this.name}] Completed`);
  }

  protected logError(error: Error): void {
    console.error(`❌ [${this.name}] Failed: ${error.message}`);
  }
}