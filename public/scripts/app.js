const todoElement = function (todo) {
  newElement = `<label
><input type="checkbox" name="todo-element" id="${todo.id}" />${todo.title}</label
>
<article class="todoElement">
<div>category: ${todo.category}</div>
<div>title:${todo.title}</div>
<div>description: ${todo.description} </div>
</article>`;

  return newElement;
};

const addElement = function (todo) {
  if (todo.category === "toWatch") {
    $(".watch.todos").append(todoElement(todo));
  }

  if (todo.category === "toRead") {
    $("read.todos").append(todoElement(todo));
  }

  if (todo.category === "toBuy") {
    $(".buy.todos").append(todoElement(todo));
  }

  if (todo.category === "toEat") {
    $(".eat.todos").append(todoElement(todo));
  }
};

$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/todo",
  }).done((todos) => {
    todos.forEach((todo) => {
      addElement(todo);
    });
  });
});

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users",
//   }).done((users) => {
//     for (user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });
