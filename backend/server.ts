import express from "express";
import { BuildryPipeline } from "./orchestrator/idea.pipeline.js";

const app = express();
app.use(express.json());

const pipeline = new BuildryPipeline();

app.post("/analyze", async (req, res) => {
  console.log(`\n🔄 [SERVER] New request: ${req.body.problemStatement?.substring(0, 50)}...`);
  
  try {
    const result = await pipeline.run({
      problemStatement: req.body.problemStatement,
      geography: req.body.geography,
    });

    console.log(`✅ [SERVER] Request completed - Recommendation: ${result.validation?.recommendation}`);

    res.json({
      status: "SUCCESS",
      result,
    });
  } catch (err: any) {
    console.error(`❌ [SERVER] Request failed: ${err.message}`);
    
    res.status(500).json({ 
      error: err.message
    });
  }
});

app.listen(3000, () => {
  console.log("🌟 [SERVER] Buildry running on port 3000");
});
