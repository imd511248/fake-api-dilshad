let storeApiData = [];
let addData = [];
let file = "https://fakestoreapi.com/products";

fetch(file)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    response.map((item) => storeApiData.push(item));
    printOfApiData(storeApiData);
  })
  .catch((error) => {
    console.log(error);
  });

// print of api data in this secction /
function printOfApiData(getData) {
  let element = "";
  getData.map((item) => {
    element += `
                    <div class="cart">
                        <div class="image">
                           <img src=${item.image} alt="">
                        </div>
                        <h2>${item.category}</h2>
                        <h4>${item.title.slice(0, 20)}</h4>
                        <p>${item.description.slice(0, 80)}</p>
                        <span class="price"><i class="fa-solid fa-indian-rupee-sign fron-card"></i>${Math.round(item.price * 40)}</span>
                        <span onclick="clickToAddProduct('${item.id}')" class="addCart">ADD</span>
                    </div>`;
  });
  document.getElementById("resultBox").innerHTML = element;
}
// click to move item cart //
let counter = 0;
function clickToAddProduct(id) {
  let filterIndex = storeApiData.find((item) => item.id == id);
  if (filterIndex) {
    if (filterIndex.count) {
      filterIndex.count += 1;
    } else {
      filterIndex.count = 1;
      counter++;
      document.getElementById("notification").innerText = counter;
    }
    let index = addData.findIndex((item) => item.id == id);
    if (index >= 0) {
      addData[index] = filterIndex;
    } else {
      addData.push(filterIndex);
    }
    printSelectedProduct(addData);
  }
}

// add item cart section //

function addTOCarts() {
  document.getElementById("modaal").style.display = "block";
}
// nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

function printSelectedProduct(z) {
  let element = "";
  z.map((item) => {
    return (element += `
                <div class="profuct-image">
                    <div class="div1">
                      <img src=${item.image} alt="">
                    </div>
                    <div class="counterDiv">
                    <div clss="div2">
                        <h4 class="title">${item.title.slice(0, 30)}</h4>
                         <p class="description">${item.description.slice(0, 80)}</p>
                         <p class="price"><i class="fa-solid fa-indian-rupee-sign"></i>${Math.round(item.price * 40)}</p>
                         <p class="ratingArea">${item.rating.rate}<i class="fa-sharp fa-solid fa-star"></i></p>
                         <div class="countOfItem">
                             <button class="countBtn" onclick="decreament(${item.id})" id="minus">-</button>
                             <p id="show">${item.count}</p>
                             <button onclick="increament(${item.id})" class="countBtn">+</button>
                         </div>
                    </div>
                    </div>
                    <div class="div3">
                         <p>Price Details</p>
                         <h4>You add to cart only = <span>${item.count} product</span></h4>
                         <h4>Product price = <span><i class="fa-solid fa-indian-rupee-sign"></i>${Math.round(item.price * 40)}</span></h4>
                         <h4>Delivery Charge = <span>Free</span></h4>
                         <h2> Total price = <span><i class="fa-solid fa-indian-rupee-sign rupiya"></i>${Math.round(item.price * item.count * 40)}</span></h2>   
                    </div>
                 </div>`);
  });
  document.getElementById("max").innerHTML = element;
}
function closeModaal() {
  document.getElementById("modaal").style.display = "none";
}
printSelectedProduct(addData);

// search section /// of element products///////////

function searchProduct(value) {
  if (value !== "") {
    let filterData = storeApiData.filter((item) => {
      if (item.category.includes(value)) {
        return item;
      }
    });
    printOfApiData(filterData);
  } else {
    printOfApiData(storeApiData);
  }
}

// conter section of selected itemn in this section k

function decreament(id) {
  let data = addData.find((item) => item.id === id);
  data.count -= 1;
  printSelectedProduct(addData);
  if (data.count == 0) {
    counter--;
    document.getElementById("notification").innerText = counter;
    const remainingData = addData.filter((item) => item.id !== id);
    addData = remainingData;
    printSelectedProduct(addData);
  }
}

function increament(id) {
  let data = addData.find((item) => item.id === id);
  data.count += 1;
  printSelectedProduct(addData);
}
