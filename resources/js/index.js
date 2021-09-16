const todoSave = document.getElementById('todo-save');
const todoInput = document.getElementById('todo-input');
const todoListItem = document.getElementById('todo-list__item');

let todoList = [];

todoSave.addEventListener('click', function() {
  let todoItems = {
    text: todoInput.value,
    complete: false
  }

  todoItems.text === '' || todoItems.text === null ?
  alert('할 일을 입력해 주세요.') :
  todoList.push(todoItems);
  
  todoInput.value = '';
  fetchList();
});



// functions 
function fetchList() {
  let htmlBox = '';
  for (let index in todoList) { 
    const todoTemplate = `
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-1">
              <i class="fas fa-check check-todo" onclick="checkTodo(${index})"></i>
            </div>
            <div class="col-10 todo-text">${todoList[index].text}</div>
            <div class="col-1">
              <i class="fas fa-trash delete-todo__btn" onclick="deleteTodo(${index})"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    htmlBox += todoTemplate;
  }
  todoListItem.innerHTML = htmlBox;
}

function checkTodo(index) {
  let todoText = document.getElementsByClassName('todo-text');
  let checkTodo = document.getElementsByClassName('check-todo');

  todoList[index].complete = !todoList[index].complete;
  if (todoList[index].complete === true) {
    todoText[index].className = "col-10 todo-text text-decoration-line-through";
    checkTodo[index].className = 'fas fa-check check-todo complete-check';
  } else {
    todoText[index].className = "col-10 todo-text";
    checkTodo[index].className = 'fas fa-check check-todo';
  }
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  fetchList();
} 

