let title = document.querySelector("#title"),
  Price_container = document.querySelectorAll(".price input"),
  price = document.querySelector("#price"),
  taxes = document.querySelector("#taxes"),
  ads = document.querySelector("#ads"),
  discount = document.querySelector("#discount"),
  total = document.querySelector("#total"),
  count = document.querySelector("#count"),
  category = document.querySelector("#category"),
  create = document.querySelector("#create"),
  search_input = document.querySelector("#search_input"),
  tbody = document.querySelector("#tbody");

title.focus();
// get total
for (let i = 0; i < Price_container.length; i++) {
  Price_container[i].addEventListener("keyup", () => {
    if (price.value != "") {
      let res;
      res = +price.value + +taxes.value + +ads.value - +discount.value;
      total.innerHTML = res.toFixed(2);
      total.style.background = "green";
    } else {
      total.innerHTML = "";
      total.style.background = "#4A9DEC";
    }
  });
}

let array;
if (localStorage.Products != null) {
  array = JSON.parse(localStorage.Products);
} else {
  array = [];
}
// create element

create.addEventListener("click", () => {
  if (title.value != "") {
    createItem();
    clear();
    showData();
  } else {
    alert("you have to enter the name");
    title.focus();
  }
});

function createItem() {
  let TheElement = {
    title: title.value.trim(),
    price: +price.value || 0,
    ads: +ads.value || 0,
    taxes: +taxes.value || 0,
    discount: +discount.value || 0,
    total: +total.innerHTML || 0,
    count: +count.value || 1,
    category: category.value,
  };
  array.push(TheElement);
  localStorage.setItem("Products", JSON.stringify(array));
}
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

// function showData() {
//   tbody.innerHTML = "";

//   array.forEach((product, index) => {
//     tbody.innerHTML += `
//       <td>${index + 1}</td>
//       <td>${product.title}</td>
//       <td>${product.price}</td>
//       <td>${product.taxes}</td>
//       <td>${product.ads}</td>
//       <td>${product.discount}</td>
//       <td>${product.total}</td>
//       <td>${product.count}</td>
//       <td>${product.category}</td>
//       <td><button onclick="deleteItem(${index})" style="background-color: red;">Delete</button></td>
//     `;
//   });
// }


function showData() {
  tbody.innerHTML = ""; 

  array.forEach((product, index) => {
      let tr = document.createElement("tr");
      let tdId = document.createElement("td");
        tdId.textContent = array.indexOf(product) + 1;
        tr.appendChild(tdId); 
      for (let key in product) {
          let td = document.createElement("td");
          td.innerHTML = product[key];
          tr.appendChild(td); 
      }
      let btnUpdate = document.createElement("button");
      btnUpdate.innerHTML = "Update";
      btnUpdate.addEventListener("click", () => updateProduct(index)); 
     
      let tdUpdate = document.createElement("td");
      tdUpdate.appendChild(btnUpdate);
      tr.appendChild(tdUpdate);


      let btnDelete = document.createElement("button");
      btnDelete.style.backgroundColor = "red";
      btnDelete.innerHTML = "Delete";
      btnDelete.addEventListener("click", () => deleteProduct(index)); // Add event listener
      let tdDelete = document.createElement("td");
      tdDelete.appendChild(btnDelete);
      tr.appendChild(tdDelete);


      tbody.appendChild(tr);
  });
}



function deleteProduct(id){
    array.splice(id,1);
    localStorage.Products = JSON.stringify(array);
    showData();
}

function updateProduct(index){
  create.innerHTML = "Save";
  title.value = array[index].title ;
  create.onclick = function (){
    array[index].title = title.value;
    create.innerHTML = "Create";
  }

}

showData();

