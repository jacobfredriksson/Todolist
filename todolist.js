
    const date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const todayDate = year + "-" + month + "-" + day;

    document.getElementById('today').value = todayDate


  const addTodo = document.querySelector('.add-todo')
  const todoList = document.querySelector('.todo-list')
  let items = JSON.parse(localStorage.getItem('items')) || []

  function addItem(e) {
    e.preventDefault()

    const today = (this.querySelector('#today')).value
    const until = (this.querySelector('#until')).value
    const header = (this.querySelector('#header')).value
    const info = (this.querySelector('#info')).value
    const prio = (this.querySelector('#prio')).value

    const item = {
      today,
      until,
      header,
      info,
      prio,
      done: false
    }

    items.push(item)
    populateList(items, todoList)
    localStorage.setItem('items', JSON.stringify(items))
    this.reset()
    document.getElementById('today').value = todayDate
  }

  function populateList(todo = [], todoList) {
    todoList.innerHTML = todo.map((todo, i) => {
      return `
        <li>
          <section data-index="${i}" class="one-todo">
            <h4 data-index="${i}"> <b>Titel:</b> ${todo.header} </h4>
            <label data-index="${i}"> Skapades: </label> ${todo.today}<br>
            <label data-index="${i}"> Skall vara klart: </label> ${todo.until} <br>
            <label data-index="${i}"> Att göra: </label> <p>${todo.info}</p> <br>
            <label data-index="${i}"> Prio: </label> ${todo.prio} <br>
            <label> Klar: </label>
            <input type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} class="done-checkbox"/> <br>
            <button id="remove" data-index="${i}" class="btn btn-danger"> Ta bort </button>
            <button id="update" data-index="${i}" class="btn btn-warning"> Ändra </button>
            <hr>
          </section>
        </li>
      `
    }).join('')
  }

  //Update todo
  function updateTodo(e) {
    if(!e.target.matches('#update')) return
      const el = e.target
      const index = el.dataset.index
      var getValues = items[index]

        $('#today').val(getValues.today)
        $('#until').val(getValues.until)
        $('#header').val(getValues.header)
        $('#info').val(getValues.info)
        $('#prio').val(getValues.prio)

        el.parentNode.remove()
        items.splice(index, 1)
        localStorage.setItem('items', JSON.stringify(items))
        populateList(items, todoList)
  }

  //remove a todolist item
  function removeTodo(e) {
    if(!e.target.matches('#remove')) return
      e.target.parentNode.parentNode.remove()
      el = e.target
      const index = el.dataset.index
      items.splice(index, 1)
      localStorage.setItem('items', JSON.stringify(items))
      populateList(items, todoList)
  }

  //done checkbox on/off
  function toggleDone(e) {
    if(!e.target.matches('input')) return
      const el = e.target
      const index = el.dataset.index
      items[index].done = !items[index].done
      localStorage.setItem('items', JSON.stringify(items))
      populateList(items, todoList)
  }

  addTodo.addEventListener('submit', addItem)
  todoList.addEventListener('click', toggleDone)
  todoList.addEventListener('click', removeTodo)
  todoList.addEventListener('click', updateTodo)

  populateList(items, todoList)


  //remove all todos
  document.getElementById('clear').addEventListener('click', function(event) {
    event.preventDefault()
    $(todoList).empty()
    localStorage.clear()
    items = []
  })
