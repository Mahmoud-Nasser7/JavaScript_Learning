// get elements
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let create = document.querySelector("#create");
let tbody = document.querySelector("#tbody");
let DeletAll = document.querySelector(".DeleteAll");
let inputs = document.querySelectorAll(".price input");


let mode = "create";
let temp ;
// get total
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", function () {
    if (price.value != "") {
      let res;
      res = +price.value + +taxes.value + +ads.value - +discount.value;
      total.innerHTML = `$${res.toFixed(2)}`;
      total.style.background = "green";
    } else {
      total.innerHTML = 0;
      total.style.background = "#4A9DEC";
    }
  });
}

// Create Product
let Products;
if (localStorage.MyProducts != null) {
  Products = JSON.parse(localStorage.MyProducts);
} else {
  Products = [];
}

create.addEventListener("click", function () {
  let Product_Data = {
    title: title.value,
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    count: count.value,
    category: category.value,
    total: total.innerHTML,
  };
  if(mode == "create"){
    Products.push(Product_Data);
  }
  else{
    Products[temp] = Product_Data;
    mode = "create";
    create.innerHTML = "Create";
  }
  localStorage.setItem("MyProducts", JSON.stringify(Products));
  clear();
  show();
  total.style.background = "#4A9DEC";
});

function clear() {
  title.value = "";
  price.value = "";
  ads.value = "";
  discount.value = "";
  taxes.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

function show() {
  tbody.innerHTML = "";
  for (let i = 0; i < Products.length; i++) {
    tbody.innerHTML += `
    <tr>
          <td>${i + 1}</td>
          <td>${Products[i].title}</td>
          <td>${Products[i].price}</td>
          <td>${Products[i].taxes}</td>
          <td>${Products[i].ads}</td>
          <td>${Products[i].discount}</td>
          <td>${Products[i].total}</td>
          <td>${Products[i].count}</td>
          <td>${Products[i].category}</td>
          <td><button onclick = "updateElement(${i})" id="Update">Update</button></td>
          <td><button onclick = "DeleteElement(${i})" id="Delete">Delete</button></td>
    </tr> 
    `; 
  }
  if(Products.length > 0){
    DeletAll.innerHTML = `<button onclick = "DeleteAllElements()">Delete All ( ${Products.length} )</button>`;
  }
  else {
    DeletAll.innerHTML = ``;
  }
}
show();

function DeleteElement(id) {
  Products.splice(id, 1);
  localStorage.MyProducts = JSON.stringify(Products);
  show();
}

function DeleteAllElements(){
  localStorage.clear();
  Products.splice(0);
  show();
}

function updateElement(id){
  title.value = Products[id].title;
  price.value = Products[id].price;
  taxes.value = Products[id].taxes;
  discount.value = Products[id].discount;
  ads.value = Products[id].ads;
  category.value = Products[id].category;
  count.value = Products[id].count;
  total.innerHTML = Products[id].total;
  create.innerHTML = "Update Data";
  mode = "update";
  temp = id;
  scroll({
    top : 0,
    behavior : "smooth"
  }
  )
}