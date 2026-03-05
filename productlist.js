const kategori = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${kategori}`;
document.querySelector("h1").textContent = kategori;

// måske den skal laves om til grid4
const container = document.querySelector("main");

let allData;
let currentData;

document
  .querySelectorAll("#filter button")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll("#sorter button")
  .forEach((knap) => knap.addEventListener("click", sorter));

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      currentData = data;
      showData(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;
  if (valgt === "All") {
    currentData = allData;
    showData(currentData);
  } else {
    currentData = allData.filter((element) => element.gender == valgt);
    showData(currentData);
  }
}

function sorter(event) {
  if (event.target.dataset.price) {
    const dir = event.target.dataset.price;
    if (dir == "acc") {
      currentData.sort((a, b) => a.price - b.price);
    } else {
      currentData.sort((a, b) => b.price - a.price);
    }
  } else {
    const dir = event.target.dataset.text;
    if (dir == "az") {
      currentData.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      currentData.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }
  showData(currentData);
}

function showData(data) {
  let markup = "";

  data.forEach((element) => {
    const soldOutclass = element.soldout ? "sold-out" : "";
    const onSaleClass = element.discount ? "sale" : "";

    markup += ` <a href="product.html?id=${element.id}" class="products">
        <article class="item ${onSaleClass} ${soldOutclass}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="${element.productdisplayname}"/>
          <h3>${element.productdisplayname}</h3>
          <p> ${element.category} - ${element.brandname}</p>
          <p class= "price">DKK ${element.price}</p>

          ${
            element.discount
              ? `
            <div class="udsalg">
            <p class="old-price">${Math.round(element.price * (1 - element.discount / 100))}</p>
            <p class="new-price">${element.discount}%</p>
          </div>`
              : ""
          }

          ${element.soldout ? `<span class="soldout">Sold Out</span>` : ""}
        </article>
      </a>
`;
  });
  container.innerHTML = markup;
}

getData();
