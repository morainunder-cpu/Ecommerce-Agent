# Summary Rules

> **速查（3 秒版）**：¹引用源文件 ²不总结摘要 ³按模块拆分 ⁴检测重复立即停 ⁵上下文过大即止

---

## Objective

Produce accurate, concise, and source-based summaries that help future development and maintenance.

## Source Priority

Always summarize in the following order:

1. Original source files
    
2. Project documentation
    
3. Configuration files
    
4. Generated content (only when explicitly requested)
    

Never treat generated summaries as authoritative sources.

## Summary Strategy

For large projects:

Directory

↓

Module

↓

File

↓

Global Summary

Do not summarize the entire project in a single pass unless explicitly requested.

## Content Requirements

Summaries should include:

- Purpose
    
- Responsibilities
    
- Key components
    
- Important dependencies
    
- External interfaces
    
- Known limitations
    

Avoid implementation details unless they are essential.

## Repetition Control

If the current output becomes substantially similar to previous output:

- Stop immediately
    
- Report possible repetition
    
- Ask whether to continue
    

Never recursively expand generated summaries.

## Context Management

Prefer referencing previous conclusions instead of rewriting them.

When context becomes too large:

- Split the task
    
- Produce staged summaries
    
- Wait for user confirmation
    

## Output Format

Every summary should contain:

### Overview

Short description.

### Structure

Main modules or files.

### Responsibilities

What each part does.

### Key Dependencies

Important relationships.

### Risks / TODO

Known issues or future work.

## Forbidden

Never:

- Summarize a summary repeatedly.
    
- Expand previous generated output indefinitely.
    
- Repeat identical paragraphs.
    
- Continue summarization after repetition is detected.