import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// Store dispatch 의 String이 틀릴수 있기때문에 이처럼 표현해준다.
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const removeToDo = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  };
};

// ***** state 를 Mutate 하면 안된다. 새로운 state를 리턴 하는 것일 뿐
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // return state.push(actions.text) => never
      const newToDos = [{ text: action.text, id: Date.now() }, ...state]; // => new state object
      return newToDos;
    case REMOVE_TODO:
      return state.filter((toDo) => toDo.id !== action.id); // => array filter : create new Array, not state mutate
    default:
      return state;
  }
};

const store = createStore(reducer);

// store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchRemoveToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(removeToDo(id));
};

// ToDo List 그려주는 function
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "DEL";
    button.addEventListener("click", dispatchRemoveToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(button);
    ul.appendChild(li);
  });
};

// store state가 변경될때 마다 실행
store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
