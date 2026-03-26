'use strict';

const inputBox = document.querySelector('#input-box');
const addTodo = document.querySelector('#add-todo');
const todoList = document.querySelector('.todo-list');

/*--------- create todo function ----------*/

const myTodoArray = [];

let editTodoId = null;

const createTodo = function () {
  const inputText = inputBox.value.trim();

  if (!inputText) {
    alert('please write your to do');
    return;
  }

  const uniqid = new Date().getTime();

  /*======== edit todo  =========*/

  if (editTodoId !== null) {
    const todo = myTodoArray.find((todo) => todo.id === editTodoId);
    if (todo) {
      todo.text = inputText;
    }

    const li = document.querySelector(`[data-id='${editTodoId}']`);
    li.querySelector('.list-text').textContent = inputText;

    editTodoId = null;
    addTodo.value = 'ADD';
    inputBox.value = '';
    return;
  }

  const todoObj = {
    id: uniqid,
    text: inputText,
    markComplete: false,
  };

  myTodoArray.push(todoObj);

  const todoHTML = `
  <li class="list" data-id='${uniqid}'>
          <input type="checkbox" id = 'check-${uniqid}'  class = "todo-check"/>

          <label for="check-${uniqid}" class="list-text" >${inputText}</label>

          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#e3e3e3"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
   </li>`;

  todoList.insertAdjacentHTML('beforeend', todoHTML);
  inputBox.value = '';
};

/*--------- add todo function ----------*/

addTodo.addEventListener('click', createTodo);

/*--------- delete & mark todo function ----------*/

document.addEventListener('click', function (e) {
  const clickedEl = e.target;

  /*======== delete todo function =========*/

  if (clickedEl.closest('.delete-button')) {
    const currentElment = e.target.closest('.list');
    const id = Number(currentElment.dataset.id);
    const index = myTodoArray.findIndex((i) => i.id === id);
    if (index !== -1) myTodoArray.splice(index, 1);

    currentElment.remove();
    return;
  }

  /*======== mark todo done =========*/

  if (clickedEl.classList.contains('todo-check')) {
    const currentElment = e.target.closest('.list');
    const id = Number(currentElment.dataset.id);
    const todo = myTodoArray.find((i) => i.id === id);
    if (todo) {
      todo.markComplete = !todo.markComplete;
    }

    const text = clickedEl.closest('.list').querySelector('.list-text');
    text.classList.toggle('completed');

    return;
  }
});

/*--------- edite todo function ----------*/

todoList.addEventListener('dblclick', function (e) {
  const list = e.target.closest('.list');
  if (!list) return;

  const id = Number(list.dataset.id);
  editTodoId = id;

  const text = list.querySelector('.list-text').textContent;

  inputBox.value = text;
  inputBox.focus();

  addTodo.value = 'EDIT';
});
