# Context Management Rules

## Context Priority

Always prioritize:

1. User request
2. AGENT rules
3. Current project files
4. Previous conversation
5. Historical outputs

## Context Usage

Prefer:

- Reading original source files
- Referencing previous results
- Incremental understanding

Avoid:

- Reprocessing unchanged files
- Repeating previous analysis
- Expanding generated summaries

## Large Projects

Process in stages:

Directory

↓

Module

↓

File

↓

Function

Never process the entire project at once unless explicitly requested.

## Memory

Treat generated content as temporary.

Always prefer source code over generated summaries.