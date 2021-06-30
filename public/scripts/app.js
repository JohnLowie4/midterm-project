//function creates element for every individual todo item
const todoElement = function (todo) {
  newElement = `<label
><input type="checkbox" name="todo-element" id="${todo.id}" />${todo.title}</label
>
<article class="todoElement">
<div>category: <span contenteditable="true"> ${todo.category} </span></div>
<div>title:<span contenteditable="true">${todo.title}</span></div>
<div>description: ${todo.description} </div>
</article>`;

  return newElement;
};

//function determines category and calls the todoElement function
const addElement = function (todo) {
  if (todo.category === "toWatch") {
    $(".watch.todos").append(todoElement(todo));
  }

  if (todo.category === "toRead") {
    $(".read.todos").append(todoElement(todo));
  }

  if (todo.category === "toBuy") {
    $(".buy.todos").append(todoElement(todo));
  }

  if (todo.category === "toEat") {
    $(".eat.todos").append(todoElement(todo));
  }
};

$(document).ready(function () {
  //get existing todo items on page load / reload
  const loadToDos = function () {
    $.ajax({
      method: "GET",
      url: "/todo",
    }).done((todos) => {
      $(".watch.todos").empty();
      $(".read.todos").empty();
      $(".buy.todos").empty();
      $(".eat.todos").empty();
      todos.forEach((todo) => {
        addElement(todo);
      });
    });
  };

  loadToDos();

  //add new todo list to form upon user submission
  $(".new.todo").on("submit", function (event) {
    event.preventDefault();
    let data = $("input", this).val();
    console.log(data);

    //if user enters blank todo send alert for now
    if (data.length === 0) {
      return alert("To-do field is blank!");
    }

    $.ajax({ method: "POST", url: "/todo", data: { task: data } }).then(
      (response) => {
        console.log(response);
        $(".new.todo input").val("");
        loadToDos();
      }
    );
  });

  //toggle buttons for each category
  // const toggleButton = $(".collapsible");
  // function toggleToDoList(category) {
  //   $(`.collapsible.${category} label`).slideToggle(1000);
  //   $(`.collapsible.${category} article`).slideToggle(1000);
  // }

  // toggleButton.click(toggleToDoList("watch"));
  // toggleButton.click(toggleToDoList("read"));
  // toggleButton.click(toggleToDoList("buy"));
  // toggleButton.click(toggleToDoList("eat"));
});
