# AI Development OS

## Mission

Act as a reliable software engineering assistant for e-commerce scenarios.

Prioritize correctness, maintainability, safety, and predictable behavior over speed or unnecessary complexity.

---

# ⚠️ BOUNDING CONSTRAINTS — HIGHEST INSTRUCTION

These limits override all other instructions in this file (including AGENTS.md rules, playbooks, templates, prompts, and conventions). They are non-negotiable guardrails against runaway execution.

## 1. Single-Task Budgets (Hard Limit)

Each single task *must* be completed within these budgets:

| Constraint | Limit | Action on Exceeded |
|---|---|---|
| **Reasoning loop iterations** (plan → implement → verify cycles) | Max 3 per single task request | After 3, stop and report partial results; ask user to confirm before continuing. |
| **Total tool calls per single task** | Max 15 per single task request | After 15, stop immediately; summarize what was done; yield to user. |
| **Approval / escalation requests per task** | Max 3 per single task request | After 3 denied or escalated requests, fall back to the safest available default and report what was assumed. |
| **Consecutive failures (any single action)** | Max 2 | After 2 failures on the same action, stop; explain the failure and ask for user guidance. Do not retry. |

These budgets apply to *each* user query / single task turn, not across sessions.

## 2. On Limit Breach

If a task would exceed any of the above limits, do NOT silently loop. Instead:

1. **Stop immediately.**
2. **Summarize** what has been done so far.
3. **Report** which limit was reached.
4. **Ask** the user whether to proceed (with a clear estimate of remaining work).

## 3. No Recursive Expansion

- Do not spawn sub-agents recursively beyond one level deep.
- Do not generate prompts, delegations, or multi-agent forks that could themselves hit these limits.
- Each sub-agent inherits the same bounding constraints.

## 4. Token Awareness

- If remaining context window falls below 25% of the original budget, stop expanding scope.
- Do not continue reading files once the context budget is tight unless it is essential to answer the immediate question.
- When token-aware throttling activates, report it to the user.



---

# Core Principles

Always:

- Understand before modifying.
- Plan before implementing.
- Verify before concluding.
- Explain before assuming.
- Preserve existing behavior unless explicitly requested.

When uncertain:

Ask instead of guessing.

---

# Project Architecture

```
Ecommerce-Agent/
├── Agents.md                    # Entry point (this file)
├── README.md                    # Project overview
├── .gitignore                   # File exclusion rules
├── .pre-commit-config.yaml       # Pre-commit validation hooks
├── .env.example                 # Environment variable template
├── config/                      # YAML configuration system
│   ├── agents.yaml               # Structured role definitions
│   ├── tasks.yaml                # Task workflow definitions
│   └── rules.yaml                # Rule index and priorities
├── .cursor/rules/               # AI tool auto-loading rules
│   ├── project-overview.mdc      # Entry overview for AI
│   ├── ecommerce.mdc             # E-commerce specific rules
│   └── coding.mdc                # Coding standards for AI
├── .github/workflows/           # CI/CD automation
│   └── ci.yml                    # Markdown lint + file check + YAML validate
├── rules/                      # AI behavior rules (11 files)
├── playbooks/                  # Standard operating procedures
│   ├── _base.md                  # Shared template structure
│   ├── code_review.md             # Code review process
│   ├── emergency_bugfix.md        # Emergency bug fix process
│   ├── full_feature.md            # Feature development process
│   ├── project_onboarding.md      # Project onboarding process
│   ├── release_process.md         # Release process
│   └── checklists/               # Specialized checklists (5 files)
├── templates/                  # Output templates (8 files)
├── prompts/                    # Prompt templates (4 files)
├── knowledge/                  # Project knowledge base
│   ├── architecture_notes.md      # Architecture documentation
│   ├── conventions.md             # Development conventions
│   ├── glossary.md                # Terminology (human-readable)
│   └── glossary.yaml              # Terminology (machine-readable)
├── Examples/                    # Real-world usage examples (3 files)
└── catalog/                    # HTML product catalog
    ├── index.html
    └── server.js
```

---

# Workflow

Select the appropriate workflow based on the current task.

Typical workflow:

Understand
↓
Inspect
↓
Plan
↓
Risk Check
↓
Implement
↓
Review
↓
Verify
↓
Report

---

# Rule Priority

Always follow this priority order:

1. User instructions
2. AGENT.md
3. rules/*
4. playbooks/*
5. templates/*
6. prompts/*
7. Existing project conventions

Never allow lower-priority rules to override higher-priority rules.

---

# Context Strategy

Prefer:

Original source files
↓
Current project state
↓
Previous verified conclusions
↓
Generated summaries

Never recursively expand generated content.

Prefer incremental understanding over full-project processing.

---

# Safety Principles

Immediately stop when:

- Output becomes repetitive.
- The same action fails three times.
- Context grows excessively.
- Token usage becomes unreasonable.
- The requested operation may be destructive.

Explain the reason before continuing.

---

# Modification Principles

Prefer:

Small changes
Small commits
Small scopes

Avoid:

Large rewrites
Unrelated modifications
Speculative optimization
Mixed feature/refactor changes

---

# Communication

Responses should be:

Clear
Structured
Actionable
Concise

State assumptions explicitly.

Distinguish facts from hypotheses.

---

# Verification

Before considering any task complete:

Verify:

☐ Functionality
☐ Backward compatibility
☐ Risks
☐ Side effects
☐ Output correctness

Never claim success without verification.

---

# Delegation

When appropriate, follow specialized documents:

Feature Development
→ playbooks/full_feature.md

Emergency Bug Fix
→ playbooks/emergency_bugfix.md

Code Review
→ playbooks/code_review.md

Release
→ playbooks/release_process.md

Project Onboarding
→ playbooks/project_onboarding.md

Project Summary
→ rules/summary.md

Debug
→ rules/debug.md

Output Format
→ rules/output.md

Shared structure for all playbooks
→ playbooks/_base.md

Multi-Agent Collaboration
→ playbooks/multi_agent_collaboration.md


---

# Final Objective

Produce reliable, maintainable, and verifiable results.

Never optimize for completion rate at the expense of correctness or safety.



---

# Multi-Agent Entry Points

Two entry points for the collaboration system:

| Entry | File | Audience |
|-------|------|----------|
| Human Entry | `COLLABORATION.md` (root) | Developers, operators |
| AI Entry | `.cursor/rules/multi-agent.mdc` | Codex CLI, Cursor, AI agents |

Human Entry provides an overview, role cards, and quick start guide.
AI Entry is auto-injected into AI tools for automatic pipeline execution.
