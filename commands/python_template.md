# Command Template -- Python file-based execution

## For Text/File Processing Tasks

Step 1: Write script

    [System.IO.File]::WriteAllText(
        'D:\Ecommerce-Agent\tmp\YOUR_SCRIPT.py',
        ,
        [System.Text.Encoding]::UTF8
    )

Step 2: Execute

    C:\Users\Lenovo\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe D:\Ecommerce-Agent\tmp\YOUR_SCRIPT.py

Step 3: Cleanup (optional, within script)

    import os; os.remove(r'D:\Ecommerce-Agent\tmp\YOUR_SCRIPT.py')

## For Spreadsheet/Artifact Tasks

Same pattern, but use Node.js:

    C:\Users\Lenovo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe D:\Ecommerce-Agent\tmp\YOUR_SCRIPT.mjs

## Key Rules

- NEVER use Set-Content @'...'@ for scripts (triggers PS parser)
- ALWAYS use [System.IO.File]::WriteAllText (bypasses PS parser)
- Python for text, Node.js for spreadsheets
- Delete temp files after success
