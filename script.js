let input = document.getElementById('input');
let addBtn = document.getElementById('addbtn');
let addList = document.getElementById('addList');
let count = document.getElementById('countTodo');
let clearbtn = document.getElementById('clear');
let container = document.getElementById('counts');

let edit = null;

//ADD TODO
const addTodo = () => {
    let inputBox = input.value.trim();


    let todos = JSON.parse(localStorage.getItem('todo2')) || [];


    if (inputBox.length <= 0) {
        alert('Enter the todo');
        return;
    } if (addBtn.value == "Edit") {
        editLocalTodo(edit.target.previousElementSibling.innerHTML)
        edit.target.previousElementSibling.innerHTML = inputBox;
        addBtn.value = "Add";
        input.value = ""
    } else {

        if (todos.includes(inputBox)) {
            alert('Already Addedd');

            return;
        }

        // CREATE LI TAG
        let li = document.createElement('li');


        // CREATE CHECKBOX
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        li.appendChild(checkbox);

        // CREATE P TAG 
        let p = document.createElement('p');
        li.appendChild(p);
        p.innerHTML = inputBox;


        // CREATE EDIT ICON
        let edit = document.createElement('i');
        edit.classList.add('fa-solid', 'fa-eye', 'editbtn');
        li.appendChild(edit);

        // CREATE DELETE ICON
        let Delete = document.createElement('i');
        Delete.classList.add('fa-solid', 'fa-trash', 'deletebtn');
        li.appendChild(Delete);
        addList.appendChild(li);
        input.value = "";
        saveLocalTodo(inputBox);
        counLocalTodo();








    }




}

// UPDATE TODO
const updateTodo = (e) => {
    if (e.target.classList.contains('deletebtn')) {
        addList.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);
    }
    if (e.target.classList.contains('editbtn')) {
        input.value = e.target.previousElementSibling.innerHTML;
        edit = e;
        addBtn.value = "Edit";
    }
}

// SAVE LOCAL TODO
const saveLocalTodo = (todo) => {
    let todos = [];
    if (localStorage.getItem('todo2') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todo2'));
    }
    todos.push(todo);
    localStorage.setItem('todo2', JSON.stringify(todos));
}

// GET LOCAL TODO
const getLocalTodo = () => {
    let todos = [];
    if (localStorage.getItem('todo2') == null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todo2'));
        todos.forEach(item => {
            // CREATE LI TAG
            let li = document.createElement('li');


            // CREATE CHECKBOX
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";

            li.appendChild(checkbox);

            // CREATE P TAG 
            let p = document.createElement('p');
            li.appendChild(p);
            p.innerHTML = item;

            // CREATE EDIT ICON
            let edit = document.createElement('i');
            edit.classList.add('fa-solid', 'fa-eye', 'editbtn');
            li.appendChild(edit);

            // CREATE DELETE ICON
            let Delete = document.createElement('i');
            Delete.classList.add('fa-solid', 'fa-trash', 'deletebtn');
            li.appendChild(Delete);
            addList.appendChild(li);
            input.value = "";
            counLocalTodo();
        });
    }
}

// DELETE LOCAL TODO
let deleteLocalTodo = (todo) => {
    let todos = [];
    if (localStorage.getItem('todo2') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todo2'));
    }
    let todoText = todo.children[0].innerHTML;
    let index = todos.indexOf(todoText);
    todos.splice(index, 1);
    localStorage.setItem('todo2', JSON.stringify(todos));
    counLocalTodo();
}

// EDIT LOCAL TODO
let editLocalTodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem('todo2'));
    let index = todos.indexOf(todo);
    todos[index] = input.value;
    localStorage.setItem('todo2', JSON.stringify(todos))
}


// COUNT LOCAL TODO
const counLocalTodo = () => {
    let todos = [];
    if (localStorage.getItem('todo2') == null) {

    } else {

        todos = JSON.parse(localStorage.getItem('todo2'));
        if (todos && todos.length > 0) {
            count.innerHTML = `You have ${todos.length}  items`;
            container.style.visibility = "visible";
        } else {
            container.style.visibility = "hidden";

        }


    }




}

// CLEAR LOCAL TODO
const clearLocalTodo = (e) => {
    localStorage.removeItem('todo2');
    location.reload();
}
addBtn.addEventListener('click', addTodo);
addList.addEventListener('click', updateTodo);
document.addEventListener('DOMContentLoaded', getLocalTodo);
clear.addEventListener('click', clearLocalTodo);
