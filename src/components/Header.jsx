export function Header(props) {
    // Destructure todos from props.
    const { todos } = props
    // Get the number of todos.
    const todosLength = todos.length
    // Determine whether to use a plural or singular label based on count.
    const isTasksPlural = todos.length !== 1
    const taskOrTasks = isTasksPlural ? 'tasks' : 'task'
  
    // Display a header with a message that dynamically reflects the number of tasks.
    return (
      <header>
        <h1 className="text-gradient">
          You have {todosLength} open {taskOrTasks}.
        </h1>
      </header>
    )
  }
  