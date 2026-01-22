import express from "express";
import { IdeaPipeline } from "./orchestrator/idea.pipeline.js";

const app = express();
app.use(express.json());

const pipeline = new IdeaPipeline();

app.post("/analyze", async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    const result = await pipeline.run({
      problemStatement: req.body.problemStatement,
      geography: req.body.geography,
    });

    res.json({
      status: "SUCCESS",
      result,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () =>
  console.log("Buildry running on port 3000")
);
