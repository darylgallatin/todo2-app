import { TodoCard } from "./TodoCard";

export function TodoList(props) {
  // Destructure the props including todos, selectedTab, and setselectedTab (though setselectedTab is not used here).
  const { todos, selectedTab, setselectedTab } = props

  // Filter the todos based on the selected tab.
  // - 'All': no filtering, show every todo.
  // - 'Completed': only show todos that are marked complete.
  // - 'Open': only show todos that are not complete.
  const filterTodosList = selectedTab === 'All' ?
    todos :
    selectedTab === 'Completed' ?
      todos.filter(val => val.complete) :
      todos.filter(val => !val.complete)

  return (
    <>
      {filterTodosList.map((todo, todoIndex) => {
        // This finds the actual index of the todo in the original todos array.
        // It warns that using the todo text to find an index has limitations if there are duplicate todos.
        const tempTodoIndex = todos.findIndex(val => val.input === todo.input)
        console.log(tempTodoIndex)
        // Render a TodoCard for each filtered todo.
        return (
          <TodoCard
            key={todoIndex}            // key for React list rendering
            {...props}                 // spread all props for additional handlers if needed
            todoIndex={tempTodoIndex}   // pass the computed index for proper action handling
            todo={todo}                 // the todo object itself
          />
        )
      })}
    </>
  )
}
