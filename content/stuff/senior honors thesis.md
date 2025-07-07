---
title: KRUPPE Overview
aliases:
  - KRUPPE
layout: pages
share: true
topics: 
tags:
  - projects
  - llm
---
*KRUPPE: Knowledge-based Research Using Pathway and Procedural Engine* is my senior honors thesis, on my proposed agentic LLM framework to answer complex financial queries.

> [!cite] Abstract
> Large Language Models (LLMs) have rapidly evolved from specialized NLP tools to general-purpose models aimed at achieving Artificial General Intelligence (AGI). In light of these developments, this paper explore LLM’s capability to answer complex questions and conduct general research, specifically within the finance domain. ==I present KRUPPE, a framework inspired by a two-decade-old analyst decision model. KRUPPE conducts financial research by dividing the research process into three parts: background exploration, lead generation, hypothesis exploration.== This hypothesis-driven approach enables KRUPPE to generate cohesive, narrative-focused reports designed to uncovering the underlying business story behind a query. To evaluate the system, I conducted a head-to-head comparison in which an LLM compared KRUPPE’s output against that of baseline models. Results show that KRUPPE reports produce high-quality narratives even when compared to larger models. The full code for KRUPPE is available on GitHub: https://github.com/CloudyLeopard/senior-thesis.

Relevant links:
- [[content/assets/Senior_Thesis_Daniel_Liu.pdf|Research Paper]]
- [Github code](https://github.com/CloudyLeopard/senior-thesis)

> [!info] KRUPPE?
> Named after one of my favorite character in my [[about me|favorite book series]]

## How KRUPPE Works

KRUPPE is structured into three agent-driven phases:

1. **[[Librarian|Background Research:]]** A “Librarian” agent gathers essential context using tool-augmented ReAct.
2. **[[Coordinator|Lead Generation:]]** The “Coordinator” agent spawns domain-specific roles (like Economist or Industry Analyst), each tasked with proposing a unique hypothesis.
3. **[[Hypothesis Researcher|Hypothesis exploration:]]** Each hypothesis is explored through a “Research-Tree”—a dynamic process that collects evidence, prunes dead ends, and backtracks when needed, ensuring the final narrative is grounded and coherent.

![[content/assets/kruppe_overall.png]]

The hypothesis approach follows the basic principle behind fundamental research: interpreting quantitative information through a central, underlying business story.

- **Hypothesis-first, not answer-first:** KRUPPE builds its reports around testable hypotheses, not just surface-level summaries.
- **Role-played diversity:** Assigning distinct analyst “roles” to generate leads improves creativity and coverage.
- **Structured, not linear:** The Research-Tree allows for dead ends, pivots, and narrative iteration.

## Motivation & Approach

Financial research is fundamentally about building a coherent, evidence-backed business story from a chaotic landscape of market data, news, and company information. This requires analysts to:

- Synthesize fragmented, often ambiguous data,
- Develop and test hypotheses,
- Iterate and backtrack as new evidence appears,
- And ultimately, produce a narrative that connects facts to a meaningful conclusion.

Large Language Models (LLMs) excel at text generation and summarization, but struggle with:

- Navigating unstructured, noisy financial data,
- Maintaining narrative coherence across multiple reasoning steps,
- Integrating retrieval, analysis, and reporting into a single workflow,
- And, crucially, producing output that reflects genuine research rather than “hallucinated” conclusions.

I created KRUPPE to bridge the gap between the raw power of LLMs and the rigorous, process-driven work of real financial analysts. The goal: see if a well-structured, hypothesis-driven workflow—where each step mimics how analysts work—can let even small LLMs produce strong, narrative-rich reports.

## Experiment

I tested KRUPPE on 73 real-world equity research questions drawn from published analyst reports. For each question, KRUPPE generated six narrative reports (3 domain roles × 2 runs). KRUPPE uses gpt-4.1-mini as the llm engine.

Evaluated using the Microsoft Graph-RAG evaluation method. KRUPPE's reports are tested against five baseline models and a human-written reports on four dimensions  (Empowerment, Cohesiveness, Comprehensiveness, Diversity). Two scoring methods were used:

- **Total-win**: all KRUPPE reports must beat the baseline
- **Any-win**: at least one KRUPPE report beats the baseline


## Main Findings

The results point to a clear path forward for building lightweight, analyst-quality LLM tools: focus on structure, not size.

- Small models with structured retrieval can match or outperform larger models by focusing on clear hypotheses.    
- Generating multiple hypotheses increases the chance of hitting the correct or most compelling business story.


![[content/assets/kruppe_total_win.png]]

![[content/assets/kruppe_any_win.png]]

