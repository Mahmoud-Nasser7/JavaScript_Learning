let item = document.getElementById("Expense");
let date = document.getElementById("date");
let amount = document.getElementById("amount");
let add = document.getElementById("Add");
let tbody = document.getElementById("tbody");
let array;
if (localStorage.Expenses != null) {
  array = JSON.parse(localStorage.Expenses);
} else {
  array = [];
}

add.onclick = function () {
  if (item.value == "" || date.value == "" || date.value == "") {
    alert("Please Fill All The Inputs");
  } else {
    let expense = {
      Name: item.value,
      date: date.value,
      amount: amount.value,
    };
    array.push(expense);
    localStorage.setItem("Expenses", JSON.stringify(array));
    clear();
    show();
  }
};

function clear() {
  item.value = "";
  date.value = "";
  amount.value = "";
}

function show() {
  let table = "";

  if (array.length == 0) {
    table = `
        <tr>
           <td colspan="4">Nothing yet</td>
        </tr>
      
      `;
  } else {
    for (let i = 0; i < array.length; i++) {
      table += `
         <tr>
                <td>${array[i].Name}</td>
                <td>${array[i].date}</td>
                <td>${array[i].amount}</td>
                <td><button onclick="Delete(${i})">Delete</button></td>
        </tr> 
        `;
    }
  }

  tbody.innerHTML = table;
}
show();

function Delete(id) {
  array.splice(id, 1);
  localStorage.Expenses = JSON.stringify(array);
  show();
}
