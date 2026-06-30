
// Stage Executor — loads skill + formats execution context
// Uses skillRegistry from node_repl (must be pre-loaded)

function executeStage(stage, taskContext) {
  var skill = skillRegistry[stage.skill];
  if (!skill) return { error: 'Skill not found: ' + stage.skill };
  
  var inputKey = stage.input_from;
  var inputValue = inputKey === 'task' 
    ? taskContext.task.description || taskContext.task.product
    : (taskContext[inputKey] || taskContext.outputs?.[inputKey] || '');
  
  return {
    stage: stage.id,
    phase: stage.phase,
    name: stage.name,
    skill: stage.skill,
    skill_description: skill.description,
    skill_duty: skill.duty,
    skill_checklist: skill.checkCount + ' items',
    input_source: inputKey,
    input: inputValue,
    execution_context: {
      instruction: skill.fullContent,
      task_data: taskContext.task,
      previous_outputs: taskContext.outputs || {}
    }
  };
}

// Export for pipeline runner
if (typeof module !== 'undefined') module.exports = { executeStage };
console.log('Stage Executor loaded — executeStage(stage, taskContext)');
