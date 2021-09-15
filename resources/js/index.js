const addTodoBtn = document.getElementById('addTodoBtn');
const todoInput = document.getElementById('todoInput');
const todoItem = document.getElementById('todoItem');

let todoList = [];


addTodoBtn.addEventListener('click', function() {
  let todoText = todoInput.value;
  
  todoList.push(todoText)
  todoInput.value = '';

  fetchList();
});

// functions
function fetchList() {
  
}