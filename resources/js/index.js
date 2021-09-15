const saveTodo = document.getElementById('saveTodo');
const inputTodo = document.getElementById('inputTodo');
const itemTodo = document.getElementById('itemTodo');

let todoList = [];


saveTodo.addEventListener('click', function() {
  let todoText = inputTodo.value;

  todoList.push(todoText)
  inputTodo.value = '';

  fetchList();
});

const templete = `
<div class="card mb-3" >
  <div class="card-body">
    <div class="row">
      <div class="col-1 cursor-pointer first__opacity"><i class="fas fa-check" id="checkIcon"></i></div>
      <div class="col-10 cursor-pointer" id="todoText">text</div>
      <div class="col-1 cursor-pointer first__opacity"><i class="fas fa-trash" id="trashIcon"></i></div>
    </div>
  </div>
</div>
`

// functions
function fetchList() {

}