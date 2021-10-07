const todoSave = document.getElementById('todo-save');
const todoInput = document.getElementById('todo-input');
const todoListItem = document.getElementById('todo-list__item');
const todoText = document.getElementsByClassName('todo-text');
const checkTodo = document.getElementsByClassName('check-todo');
const checkFavorite1 = document.getElementsByClassName('check-favorite');
let todoList = [];

if (localStorage.todo !== undefined) {
  todoList = JSON.parse(localStorage.todo);
  fetchList();
}

todoSave.addEventListener('click', function() {
  let todoItems = {
    text: todoInput.value,
    complete: false,
    favorite: false
  }

  todoItems.text === '' || todoItems.text === null ?
  alert('할 일을 입력해 주세요.') :
  todoList.push(todoItems);

  todoInput.value = '';

  setLocalStorage();
  fetchList();
});

// functions 
function fetchList() {
  todoList = todoList.sort(function(a,b) {
    return a.complete - b.complete;
  }).sort(function(a,b) {
    return b.favorite - a.favorite;
  });
  let htmlBox = '';
  for (let index in todoList) { 
    const todoTemplate = `
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-1">
              <i class="fas fa-check ${todoList[index].complete ? 'check-todo complete-check' : 'check-todo'}" onclick="checkTodo1(${index})"></i>
            </div>
            <div class="col-1">
              <i class="far fa-star ${todoList[index].favorite ? 'check-favorite complete-favorite' : 'check-favorite'}" onclick="checkFavorite(${index})"></i>
            </div>
            <div class="col-9 ${todoList[index].complete ? 'todo-text text-decoration-line-through' : 'todo-text'}" onclick="updateTodoText(${index})">${todoList[index].text}</div>
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

function checkTodo1(index) {
  todoList[index].complete = !todoList[index].complete;
  
  if (todoList[index].complete === true) {
    todoText[index].className = "col-10 todo-text text-decoration-line-through";
    checkTodo[index].className = 'fas fa-check check-todo complete-check';
  } else {
    todoText[index].className = "col-10 todo-text";
    checkTodo[index].className = 'fas fa-check check-todo';
    
  }
  setLocalStorage();
  fetchList()
}

function deleteTodo(index) {
  confirm('정말 삭제할까요?') ? 
  todoList.splice(index, 1)
  : null;
  setLocalStorage();
  fetchList();
} 

function setLocalStorage() {
  if (localStorage.todo !== undefined) {
    localStorage.removeItem('todo');
  }
  localStorage.setItem('todo', JSON.stringify(todoList));
}

function updateTodoText(index) {
  let updateText = prompt('수정할 내용을 입력해 주세요.', todoList[index].text );
  todoList[index].text = updateText !== null ? updateText : todoList[index].text;
  setLocalStorage();
  fetchList();
}


function checkFavorite(index) {
  todoList[index].favorite = !todoList[index].favorite;
  if (todoList[index].favorite) {
    checkFavorite1[index].className = "check-favorite complete-favorite";
  } else
  checkFavorite1[index].className = "check-favorite";
  setLocalStorage();
  fetchList()
}
