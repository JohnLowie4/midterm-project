$(() => {

  $.get('/todo')
  .then((items) => {
    console.log(items);
  });

  const createProductElement = (item) => {
    const $product = $(`
      <div class="item">
        <h2>Product Name: ${item.item_name}</h2>
      </div>
    `);
  }

});
