const kategori = new URLSearchParams(window.location.search).get("category");

const container = document.querySelector("main");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(json) {
  let markup = "";
  json.forEach((element) => {
    console.log(element);
    markup += `
    <a href="product.html" class="products">
        <article class="item ${element.soldout ? "sale sold-out" : ""}">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
            alt="product img"
          />
          <h3>${element.productdisplayname}</h3>
          <p>Nike</p>
          <p>DKK ${element.price}</p>
        </article>
      </a>
`;
  });
  container.innerHTML = markup;
}

getData();
