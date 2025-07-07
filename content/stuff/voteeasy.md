---
layout: pages
share: true
topics: 
tags:
  - projects
  - llm
  - politics
---
I worked on VoteEasy in preparation for the 2024 presidential election. From personal experiences, it's hard to know the candidates you are voting for, especially for local election candidates. However, these races often have the most immediate consequences.

Purpose of VoteEasy is to use new LLM technology to analyze large corpora of political text data, and compare candidates based on what they actually believe. You answer a few questions, and it shows you which candidates align with you, with clear summaries, sources, and a way to dig deeper if you want.

![[voteeasy slide.png]]
[Github Repo](https://github.com/CloudyLeopard/vote-easy)
## How It Works

- Uses a custom LLM + retrieval setup to find and summarize candidates’ stances
- Pulls from public sources like Vote-USA, FEC filings, and campaign websites
- Embeds and classifies thousands of quotes into issue-based vectors
- Matches you with candidates using similarity scoring across your survey answers
- Built with Vue3 + FastAPI, deployed on AWS EC2.