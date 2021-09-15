let todoList = [];
let todoInput = document.getElementById('todoInput');
const todoSave = document.getElementById('todoSave');
const todoItem = document.getElementById('todoItem');


todoSave.addEventListener('click', function() {
  const todo = {
    text: todoInput.value,
    complete: false
  }
  todoList.push(todo);
  todoInput.value = '';
  fetchList();
});

// functions
function fetchList() {
  let html = ''
  for (let index in todoList) {
    let todoComplete = todoList[index].complete ? 
    `<div class="col-10 selectItem text-decoration-line-through" data-index="${index}">
      ${todoList[index].text}
    </div>` :
    `<div class="col-10 selectItem" data-index="${index}">
      ${todoList[index].text}
    </div>`

    let todoTemplete = `
      <div class="row mb-2">
        ${todoComplete}
      <div class="col-2">
        <button class="deleteItem" data-index="${index}">x</button>
      </div>
      </div>
    `
    html += todoTemplete;
  }
  todoItem.innerHTML = html;

  const deleteItems = document.getElementsByClassName('deleteItem');
  for (let deleteItem of deleteItems) {
    deleteItem.addEventListener('click', function() {
      todoList.splice(this.dataset.index, 1);
      fetchList();
    });
  }
  
  const selectItems = document.getElementsByClassName('selectItem');
  for (let selectItem of selectItems) {
    selectItem.addEventListener('click', function() {
      todoList[this.dataset.index].complete = !todoList[this.dataset.index].complete
      fetchList();
    });
  }
}


