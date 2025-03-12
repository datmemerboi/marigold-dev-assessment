const PRODUCTS_API_URL = "https://api.restful-api.dev/objects";

const fetchProductData = async () => {
  console.log("Fetching products...");
  const response = await fetch(PRODUCTS_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
};

function renderProductList(products) {
  const productListDom = document.getElementById("product-list");

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.appendChild(createTextCell(product.name));
    row.appendChild(
      product.data?.price || product.data?.Price
        ? createTextCell(`$ ${product.data.price ?? product.data.Price}`)
        : createTextCell("N/A")
    );
    row.appendChild(
      createTextCell(product.data?.color || product.data?.Color ? product.data.color ?? product.data.Color : "N/A")
    );

    let extraDetailsList = document.createElement("ul");
    for (const key in product.data) {
      if (!["price", "Price", "color", "Color"].includes(key)) {
        const extraDetail = document.createElement("li");
        extraDetail.innerHTML = `<strong>${key}</strong>: ${product.data[key]}`;
        extraDetailsList.appendChild(extraDetail);
      }
    }

    row.appendChild(createCell(extraDetailsList));

    productListDom.appendChild(row);
  });

  productListDom.style.opacity = "1";
}

function createTextCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

function createCell(childNode) {
  const cell = document.createElement("td");
  cell.appendChild(childNode);
  return cell;
}

function fadeOutSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.opacity = "0";
  setTimeout(() => {
    spinner.style.display = "none";
  }, 300);
}

function fadeInProductTable() {
  const productList = document.getElementById("product-list");
  productList.style.opacity = "1";
}

function fadeInErrorMessage() {
  const errorMessage = document.getElementById("error");
  errorMessage.style.opacity = "1";
}

fetchProductData()
  .then((products) => {
    fadeOutSpinner();
    fadeInProductTable();
    renderProductList(products);
  })
  .catch((e) => {
    fadeOutSpinner();
    fadeInErrorMessage();
    console.error(e);
  });
