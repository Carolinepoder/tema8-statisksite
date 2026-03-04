const container = document.querySelector(".grid");
const endpoint = `https://kea-alt-del.dk/t7/api/categories`;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showData);
}

function showData(data) {
  let markup = "";
  data.forEach(
    (element) =>
      (markup += `<a class="card" href="productslist.html?category=${element.category}"> ${element.category}</a>`),
  );
  container.innerHTML = markup;
}

getData();
