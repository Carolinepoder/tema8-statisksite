const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`; // Brug id
const productContainer = document.querySelector("#productcontainer");

function getProduct() {
  console.log("data til id", id);

  fetch(endpoint)
    .then((res) => res.json())
    .then((product) => {
      console.log("Data", product);
      showProduct(product);
    })
    .catch((err) => console.error("fejl ved hentning af data", err));
}

function showProduct(product) {
  productContainer.innerHTML = `
      <div class="menu">
        <a href="productslist.html?category=${product.category}">Back</a>
      </div>

      <section class="product-layout ${product.category ? "sale" : ""}>
        <div class="product-image">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
            alt="${product.productdisplayname}"
          />
        </div>

        <div class="product-info">
          <h2>Product Information</h2>

          <p><strong>Model name</strong><br />${product.productdisplayname}</p>
          <p><strong>price</strong><br class="price" />${product.price}</p>
          <p><strong>Stock</strong><br />${product.soldout ? "udsolgt" : "på lager"}</p>

          <h3 class="brand">${product.brandname}</h3>
        </div>

        <div class="buy-box sale">
          <h2>${product.productdisplayname}</h2>
          <p class="category">${product.brandname}| ${product.articletype}</p>

          <button>Add to basket</button>
        </div>
      </section>
    `;
}

if (id) {
  getProduct();
} else {
  productContainer.innerHTML = "<h2>Intet produkt-ID fundet i URL</h2>";
}
