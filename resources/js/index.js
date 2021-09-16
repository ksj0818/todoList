const todoSaveBtn = document.getElementById('todo-save-btn');
const todoInput = document.getElementById('todo-input');
const todoListView = document.getElementById('todo-list-view');
let todoList = [];

if (localStorage.todo != undefined) {
  todoList = JSON.parse(localStorage.todo);
  fetchList();
}

todoSaveBtn.addEventListener('click', function() {
  let todoItems = {
    text: todoInput.value,
    complete: false
  }

  todoList.push(todoItems)
  setLocalStorage();

  todoInput.value = '';

  fetchList();
});

// functions
function fetchList() {
  let html = '';
  for (let index in todoList) {
    let todoElement = '';
    todoElement = todoList[index].complete ?
    `<div class="col-11 select-todo text-decoration-line-through" data-index=${index}>${todoList[index].text}</div>` :
    `<div class="col-11 select-todo" data-index=${index}>${todoList[index].text}</div>`

    const todoListTemplate = `
      <div class="card mb-2">
        <div class="card-body">
          <div class="row">
            ${todoElement}
            <div class="col-1 deleteTodoBtn" data-index=${index}>
              <i class="fas fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    html += todoListTemplate;
  }
  todoListView.innerHTML = html;

  let deleteTodoBtns = document.getElementsByClassName('deleteTodoBtn');
  for (let deleteTodoBtn of deleteTodoBtns) {
    deleteTodoBtn.addEventListener('click', function() {
      const index = Number(this.dataset.index);
      todoList.splice(index, 1);
      setLocalStorage()
      fetchList();
    });
  }

  let selectTodos = document.getElementsByClassName('select-todo');
  for (selectTodo of selectTodos) {
    selectTodo.addEventListener('click', function() {
      const index = Number(this.dataset.index);
      todoList[index].complete = !todoList[index].complete;
      setLocalStorage()
      fetchList()
    });
  }
} // end fetchList()

function setLocalStorage() {
  if (localStorage.todo != undefined) {
    localStorage.removeItem('todo');
  }
  localStorage.setItem('todo', JSON.stringify(todoList));
}

