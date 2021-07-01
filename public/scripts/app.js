// const {pool, updateToDoList } = require('../databse/database');

//function creates element for every individual todo item
const todoElement = function (todo) {
  newElement = `
    <div class="single-todo" id="${todo.id}">
      <span><i class="fas fa-check-square"></i>${todo.title} </i><i class="far fa-edit"></i></span>
      <div class="update">
        <label>Change Category</label> <br>
        <select name="category" class="categoryDropDown">
          <option value="" selected></option>
          <option value="toBuy">toBuy</option>
          <option value="toEat">toEat</option>
          <option value="toWatch">toWatch</option>
          <option value="toRead">toRead</option>
        </select>
        <br><br>

      </div>
      <button class="updateButton"><i class="far fa-save"></i> Save</button>
    </div>`;

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

  //Delete Button
  $(".todo.container").on("click", ".fas.fa-check-square", function (e) {
    e.preventDefault();
    //Would be getting the ID from the current button
    let id = $(this).closest("div").prop("id");
    $.ajax({
      method: "POST",
      url: `/todo/delete/${id}`,
      success: function (result) {
        loadToDos();
      },
      error: function (error) {
        console.log("there was an error doing this operation", error);
      },
    });
  });

   //Edit ToDo
   $(".todo.container").on("click", ".updateButton", function (e) {
    e.preventDefault();
    console.log("here");
    //Would be getting the ID from the current button
    let id = $(this).closest("div").prop("id");
    let newCategory = $(".categoryDropDown").find(":selected").text();
    console.log("category", newCategory);
    $.ajax({
      method: "POST",
      url: `/todo/edit/${id}/${newCategory}`,
      success: function (result) {
        loadToDos();
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

//toggle edit drop down
function toggleEditOption() {
  $(".todo.container").on("click", ".far.fa-edit", function(e) {
    let id = $(this).closest("div").prop("id");
    $(`#${id} .update`).slideToggle();
    $(`#${id} .updateButton`).slideToggle();
  });
}

toggleEditOption()

});
