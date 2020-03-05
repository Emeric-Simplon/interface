let quant = 1;

const startApp = () => {
  productBuilder(httpGet("http://localhost:3000/api/v1/products"));
};

//Http request builder
const httpGet = theUrl => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.response;
};
const total = document.getElementById("total");
let productArr = [];


let addProduct = (id, name, price, quantity) => {
  let product = { id: id, name: name, price: price, quantity: quantity };
  let isInCart = productArr.find(item => item.id == id);

  if (!isInCart) {
    productArr.push(product);
    createCart(productArr);
  } else {
    let addQuantity = productArr.find(item => item.id);
    addQuantity.quantity = addQuantity.quantity + quantity;
    
  }
};

let createCart = productArr => {
  productArr.forEach((item) => {
    const cart = document.getElementById("cart");
    const newDiv = document.createElement("div");
    const newName = document.createElement("p");
    const newPrice = document.createElement("p");
    const newQuantity = document.createElement("p");

    cart.appendChild(newDiv);
    newDiv.setAttribute("class", item.id);
    newDiv.appendChild(newName);
    newDiv.appendChild(newPrice);
    newDiv.appendChild(newQuantity);
    newPrice.innerHTML = item.price;
    newName.innerHTML = item.name;
    newQuantity.innerHTML = item.quantity;
  });
};

let productBuilder = products => {
  let productList = JSON.parse(products);

  productList.forEach(function(item) {
    const newDiv = document.createElement("div");
    const newH = document.createElement("h3");
    const newDesc = document.createElement("p");
    const newPrice = document.createElement("p");
    const newImg = document.createElement("img");
    const newBtn = document.createElement("button");
    const newInput = document.createElement("select");

    //Image
    newDiv.appendChild(newImg);
    newImg.setAttribute("src", item.imgUrl);

    //Name
    newDiv.appendChild(newH);
    newH.innerHTML = item.name;

    //Description
    newDiv.appendChild(newDesc);
    newDesc.innerHTML = item.description;

    //price
    newDiv.appendChild(newPrice);
    newPrice.innerHTML = `${item.price} €`;

    //Select
    newDiv.appendChild(newInput);
    newInput.setAttribute("value", 1);
    newInput.addEventListener("change", () => {
      quant = newInput.value;
    });

    //Options
    for (i = 1; i < 11; i++) {
      const newOption = document.createElement("option");
      newInput.appendChild(newOption);
      newOption.setAttribute("value", i);
      newOption.innerHTML = i;
    }

    //button
    newDiv.appendChild(newBtn);
    newBtn.innerHTML = "Ajouter";
    newBtn.setAttribute("key", item._id);
    newBtn.addEventListener("click", () => {
      addProduct(item._id, item.name, item.price, parseInt(quant));
    });

    const currentDiv = document.getElementById("productList");
    document.body.insertBefore(newDiv, currentDiv);
    newDiv.setAttribute("class", "product");
    newDiv.setAttribute("id", item._id);
  });
  return productList;
};

window.onload = setTimeout(startApp, 500);




//--------//
let createCartProduct = (name, price, quantity) => {
  const cartElt = document.getElementById("cart");
  cartElt.innerHTML = "";
  cart.forEach(p => {
    const cartProduct = document.createElement("div");
    cartElt.appendChild(cartProduct);
    cartProduct.innerHTML = `<p>${name}</p>
        <p>${price}</p>
        <button onClick="incrementQuantity(this.nextSibling)">+</button>
        <p>${quantity}</p>
        <button onClick="decrementQuantity(this.previousSibling)">-</button>
        `;
  });
};

let incrementQuantity = node => {
  let quantity = parseInt(node.nextSibling.textContent);
  quantity++;
  node.nextSibling.innerHTML = quantity;
};

let decrementQuantity = node => {
  let quantity = parseInt(node.previousSibling.textContent);
  quantity--;
  node.previousSibling.innerHTML = quantity;
  if (quantity <= 0) {
    node.parentNode.innerHTML = "";
  }
};

let addProductToCart = (id, quantity) => {
  let getProduct = prdList.find(item => item._id == id);
  let isInCart = cart.find(item => item._id == id);
  if (!isInCart) {
    getProduct.quantity = quantity;
    cart.push(getProduct);
    createCartProduct(getProduct.name, getProduct.price, quantity);
  } else {
    isInCart.quantity = isInCart.quantity + quantity;
    createCartProduct(getProduct.name, getProduct.price, isInCart.quantity);
  }
};
