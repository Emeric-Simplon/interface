let httpGet = theUrl => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
};

let categorieList = httpGet("http://localhost:3000/categories");
const menuElt = document.getElementById("menu");

let carType = id => {
 return httpGet(`http://localhost:3000/products/categorie/${id}`);
};

categorieList.forEach(e => {
  const categorieItem = document.createElement("div");
  menuElt.appendChild(categorieItem);
  categorieItem.innerHTML = `<button class="btn btn-info col-sm" onClick=createProductList(carType(${e.ID}))>${e.Name}</button>`;
});
