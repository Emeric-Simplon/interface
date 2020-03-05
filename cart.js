let productList = httpGet("http://localhost:3000/products");

let cart = [];
let productArr = [];
let cartElt = document.getElementById("cart");
let totalElt = document.getElementById("total");
let total = 0;

let createProductList = jsonProductList => {
  console.log(jsonProductList)
  const productListElt = document.getElementById("productList");
  productListElt.innerHTML = '';
  jsonProductList.forEach(item => {
    const newProduct = document.createElement("div");
    productListElt.appendChild(newProduct);
    newProduct.setAttribute("class", "product");
    newProduct.id = item.ID;
    newProduct.innerHTML = `
        <h2>${item.Name}</h2>
        <p>${item.Brand}</p>
        <p>${item.Price} €</p>
        <select selected=1>
        <option value=1>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
        <option value=6>6</option>
        <option value=7>7</option>
        <option value=8>8</option>
        <option value=9>9</option>
        <option value=10>10</option>
    </select>
        <button onClick="addProductToCart(this.parentNode.id, parseInt(this.parentNode.childNodes[8].previousElementSibling.value))">Add</button>`;
  });
  productArr.push(jsonProductList);
};

// Retourne le produit (objet) du tableau initial
let getProduct = id => {
  let product = productArr[0].find(item => item.ID == id);
  return product;
};

// Retourne le produit (objet) du tableau panier
let isInCart = id => {
  let product = cart.find(item => item.ID == id);
  return product;
};

// Parcours le tableau cart afin de créer le panier
let createCart = arr => {
  cartElt.innerHTML = "";
  arr.forEach(p => {
    const cartProduct = document.createElement("div");
    cartElt.appendChild(cartProduct);
    cartProduct.innerHTML = `<p>${p.Name}</p>
        <p >${p.Price}</p>
        <button onClick="incrementQuantity(this.nextSibling)">+</button>
        <p productId=${p.ID}>${p.Quantity}</p>
        <button onClick="decrementQuantity(this.previousSibling)">-</button>
        `;
  });
};

let totalPrice = arr => {
  total = 0;
  for (i = 0; i < arr.length; i++) {
    total += arr[i].Quantity * arr[i].Price;
  }
  return total;
};
let incrementQuantity = node => {
  let productId = node.nextSibling.getAttribute("productId");

  isInCart(productId).Quantity += 1;
  node.nextSibling.innerHTML = isInCart(productId).Quantity;
  createCart(cart);
  totalElt.innerHTML = totalPrice(cart);
};

let decrementQuantity = node => {
  let productId = node.previousSibling.getAttribute("productId");
  isInCart(productId).Quantity -= 1;
  node.nextSibling.innerHTML = isInCart(productId).Quantity;
  createCart(cart);
  totalElt.innerHTML = totalPrice(cart);
  if(isInCart(productId).Quantity <= 0){
   cart.splice(cart.indexOf(isInCart(productId))) 
   createCart(cart);
  }
};

let addProductToCart = (id, quantity) => {
  if (isInCart(id) != getProduct(id)) {
    cart.push(getProduct(id));
    isInCart(id).Quantity = quantity;
    createCart(cart);
    totalElt.innerHTML = totalPrice(cart);
  } else {
    isInCart(id).Quantity += quantity;
    createCart(cart);
    totalElt.innerHTML = totalPrice(cart);
  }
};

setTimeout(createProductList(productList), 700);
