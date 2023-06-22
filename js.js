// focus for input
onload = function () {
  title.focus();
};
// get id
let title = document.getElementById("title"),
  price = document.getElementById("price"),
  takes = document.getElementById("takes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  submit = document.getElementById("submit");
let mood = "create";
let tmp;

// git total
function gettotal() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +takes.value + +ads.value - +discount.value;
    total.style.background = "#00FFFF";
    total.style.color = "#000";
  } else {
    total.innerHTML = " ";
    total.style.background = "rgb(6, 69, 69)";
  }
}
// create product
let dataPro;
// لو هى فيها بيانات اعملى كذا
// لو هى مش فاضيه اعملى كذا
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    takes: takes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // count'
  if (newPro.count <= 100 && title.value != " " && total.innerHTML != " ") {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let x = 0; x < newPro.count; x++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.textContent = "Create";
      count.style.display = "block";
      scroll({
        top: 1000000,
        behavior: "smooth",
      });
    }
    // save localStorage
    clearData();
  }
  localStorage.product = JSON.stringify(dataPro);
  showdata();
  scroll({
    top: 100000,
    behavior: "smooth",
  });
};
// clear inputs
function clearData() {
  title.value = " ";
  price.value = " ";
  takes.value = " ";
  ads.value = " ";
  discount.value = " ";
  total.value = " ";
  count.value = " ";
  category.value = " ";
  // or
  // location.reload();
}
// show data
function showdata() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].takes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="update(${i})" id="update">update</button> </td>
      <td><button onclick="deleteItem(${i})" id="delete">delete</button> </td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndeleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btndeleteAll.innerHTML = `
    <button onclick= "deleteAll()">Delete All (${dataPro.length})</button>
    `;
  }
  gettotal();
}
// delet one item
function deleteItem(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showdata();
  if (i === 0) {
    location.reload();
  }
}
// delet All
function deleteAll() {
  let conf = confirm("انت متأكد ياعمهم هتمسح كله!");
  if (conf === true) {
    localStorage.removeItem("product"); // or clear();
    dataPro.splice(0);
    showdata();
    location.reload();
  }
}
function update(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  takes.value = dataPro[i].takes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  gettotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.textContent = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
showdata();

// search
let searchMood = "title";
function getsearch(id) {
  let search = document.getElementById("search");
  if (id === "searchtitle") {
    searchMood = "title";
  } else if (id === "searchPrice") {
    searchMood = "Price";
  } else {
    searchMood = "catogery";
  }
  search.placeholder = "Search by" + searchMood;
  search.focus();
  search.value = "";
  showdata();
}
function searchData(value) {
  let table = " ";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].takes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td>
      <td>${dataPro[i].category}</td>
      <th><button onclick="update(${i})" id="update">update</button> </th>
      <th><button onclick="deleteItem(${i})" id="delete">delete</button> </th>
    </tr>
    `;
      }
    } else if (searchMood == "Price") {
      if (dataPro[i].price.includes(value)) {
        table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].takes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td>
      <td>${dataPro[i].category}</td>
      <th><button onclick="update(${i})" id="update">update</button> </th>
      <th><button onclick="deleteItem(${i})" id="delete">delete</button> </th>
      </tr>
      `;
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += `
      <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].takes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td>
      <td>${dataPro[i].category}</td>
      <th><button onclick="update(${i})" id="update">update</button> </th>
      <th><button onclick="deleteItem(${i})" id="delete">delete</button> </th>
      </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// localStorage.removeItem("product")

