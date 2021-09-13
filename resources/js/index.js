let todoList = []
const inputTodo = document.getElementById('inputTodo')
const saveTodo = document.getElementById('saveTodo')
const listTodo = document.getElementById('listTodo')

if (localStorage.todo != undefined) {
  todoList = JSON.parse(localStorage.todo)
  fetchList()
}

saveTodo.addEventListener("click", function() {  
  let todoText = inputTodo.value
  let todoItem = {
    text: todoText,
    complete: false
  }
  todoList.push(todoItem)
  setLocalStorage()

  inputTodo.value = ''
  fetchList()
})

const templateListTodo = `
<div class="card">
  <div class="card-body">
    <div class="row">
      <div class="col-10">프로그래밍</div>
      <div class="col-2">
        <button>X</button>
      </div>
    </div>
  </div>
</div>
`

function fetchList() {
  let html = ''
  for (let index in todoList) {
    let todoElement = '' 
    todoElement = todoList[index].complete ? 
    `<div class="selectTodo col-10 text-decoration-line-through" data-index=${index}>${todoList[index].text}</div>` :
    `<div class="selectTodo col-10" data-index=${index}>${todoList[index].text}</div>`
    
    const templateListTodo = `
      <div class="card mb-2">
        <div class="card-body">
          <div class="row">
            ${todoElement}
            <div class="col-2">
              <button class="deleteButton" data-index=${index}>X</button>
            </div>
          </div>
        </div>
      </div>
    `
    html += templateListTodo
  }
  listTodo.innerHTML = html

  let deleteButtons = document.getElementsByClassName('deleteButton')
  for (let deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', function() {
      const index = Number(this.dataset.index)
      todoList.splice(index, 1)
      setLocalStorage()
      fetchList()
    })
  }

  let selectTodos = document.getElementsByClassName('selectTodo')
  for (let selectTodo of selectTodos) {
    selectTodo.addEventListener('click', function() {
      const index = Number(this.dataset.index)
      todoList[index].complete = !todoList[index].complete
      setLocalStorage()
      fetchList()
    })
  }
}

function setLocalStorage() {
  if (localStorage.todo != undefined) {
    localStorage.removeItem('todo')
  }
  localStorage.setItem('todo', JSON.stringify(todoList))
}