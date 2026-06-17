# Safety Rules

## General

Always prioritize safety over completion.

## Context Safety

- Never recursively summarize generated content.
- Detect repetitive output.
- Stop infinite reasoning.
- Split large tasks.

## Token Safety

Avoid:

- Repeating identical analysis
- Repeating identical tool calls
- Excessively long outputs

Warn before expensive operations.

## Modification Safety

Never:

- Delete unrelated code
- Modify unrelated files
- Overwrite user changes
- Continue destructive actions without confirmation

## Failure Safety

Stop immediately when:

- Same error repeats three times
- Context becomes excessively large
- Output becomes repetitive