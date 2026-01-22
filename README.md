# 🏗️ Buildry

**Build ideas the right way.**

Buildry is an agentic AI system that helps founders and teams turn raw ideas into **structured, validated startup plans** before writing a single line of production code.

Instead of jumping straight into building, Buildry focuses on **reasoning, research, and clarity**.

---

## ✨ Why Buildry?

Most products fail not because of bad execution, but because of:

* Poor problem validation
* Weak market understanding
* Rushed MVP definitions
* Ignored risks

**Buildry exists to fix that.**

It acts like a virtual co-founder that thinks critically, asks the right questions, and produces structured outputs you can actually build on.

---

## 🧠 What Buildry Does

Buildry uses autonomous AI agents to:

* Research real-world problems
* Validate ideas using evidence
* Define clear MVP scopes
* Analyze market and competitors
* Identify risks and assumptions

All outputs are **structured, explainable, and actionable** — not vague AI text.

---

## 🤖 Agent Architecture

Buildry is composed of multiple task-focused agents:

### 1. Research Agent (Core)

* Gathers factual information from trusted sources
* Produces structured research summaries
* Extracts statistics, trends, and constraints

### 2. Validation Agent

* Evaluates whether a problem is real and worth solving
* Identifies target users and pain points
* Flags weak or risky assumptions

### 3. Product Agent

* Converts validated problems into MVP definitions
* Defines features, exclusions, and success metrics

### 4. Market Agent

* Analyzes competitors and alternatives
* Suggests positioning and differentiation

### 5. Critic Agent

* Challenges outputs from other agents
* Identifies risks, blind spots, and edge cases

Agents can run sequentially or independently depending on the use case.

---

## 🛠️ Tech Stack

**Backend**

* Node.js (TypeScript)
* Express / Fastify
* Ollama (local LLM runtime)

**LLM**

* Phi-3 Mini (quantized)
* Fully local, lightweight, privacy-friendly

**Frontend**

* Flutter (Web + Mobile)

**Storage**

* MongoDB (sessions, outputs, agent memory)

---

## 🔒 Key Principles

* **Local-first**: Runs without sending data to external APIs
* **Explainable**: Every output follows a clear structure
* **Agentic**: Multiple reasoning steps, not single-shot prompts
* **Practical**: Focused on real startup decisions

---

## 📂 Project Structure (Example)

```
buildry/
├── backend/
│   ├── agents/
│   │   ├── research.agent.ts
│   │   ├── validation.agent.ts
│   │   └── critic.agent.ts
│   ├── llm/
│   │   └── ollama.client.ts
│   └── server.ts
│
├── frontend/
│   └── flutter_app/
│
└── README.md
```

---

## 🚀 Getting Started (High-Level)

1. Install Ollama and pull a supported model
2. Start the local LLM server
3. Run the Buildry backend
4. Launch the Flutter frontend
5. Define a problem and let agents work

---

## 🎯 Example Use Cases

* Startup idea validation
* Founder brainstorming
* Product requirement discovery
* Market research automation
* Pre-MVP planning

---

## 🧩 Roadmap

* [ ] Agent memory and iteration loops
* [ ] Source citation tracking
* [ ] Export reports (PDF / Markdown)
* [ ] Multi-idea comparison
* [ ] Team collaboration

---

## 📜 License

MIT License

---

## 🏗️ Buildry Philosophy

> "Strong products are built on clear thinking, not assumptions."

Buildry helps you **think before you build**.
