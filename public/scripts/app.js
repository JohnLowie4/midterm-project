//function creates element for every individual todo item
const todoElement = function (todo) {
  newElement = `<label><input type="checkbox" name="todo-element" id="${todo.id}" />${todo.title}<button class="deleteButton" id="${todo.id}"> DeleteME </button></label>


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
  //hide items on load
  $(`.watch.todos`).hide();
  $(`.read.todos`).hide();
  $(`.buy.todos`).hide();
  $(`.eat.todos`).hide();

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


    //if user enters blank todo send alert for now
    if (data.length === 0) {
      return alert("To-do field is blank!");
    }

    $.ajax({ method: "POST", url: "/todo", data: { task: data } }).then(
      (response) => {
        $(".new.todo input").val("");
        loadToDos();
      }
    );
  });

  //Delete Button
  $(".todo.container").on("click", ".deleteButton", function (e) {
    e.preventDefault();
    //Would be getting the ID from the current button
    let id = $(this).attr("id");

    //alert("We are  good to go");
    $.ajax({

      method: "POST",
      url: `/todo/delete/${id}`,
      success: function (result) {
        alert(`Everything looked good. The todo is deleted ID = ${id}`);
        alert(result.result);
      },
      error: function (error) {
        console.log("there was an error doing this operation", error);
      },
    });
  });

  // toggle buttons for each category
  function toggleToDoList(category) {
    $(`.collapsible.${category}`).click(() => {
      $(`.${category}.todos`).slideToggle();
    });
  }

  toggleToDoList("watch");
  toggleToDoList("read");
  toggleToDoList("buy");
  toggleToDoList("eat");
});
