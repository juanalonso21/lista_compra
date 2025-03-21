class Item { //Clase para guardar los elementos de la lista de la compra
  constructor(text, checked) {
    this.text = text;
    this.checked = checked;
  }

  saveToLocalStorage() { //Funcion dentro de item para guardar los elementos en el local storage
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(this);
    localStorage.setItem('items', JSON.stringify(items));
  }

  static removeFromLocalStorage(text) { //Funcion para eliminar elementos del local storage
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(item => item.text !== text);
    localStorage.setItem('items', JSON.stringify(items));
  }

  static updateInLocalStorage(text, checked) { //Funcion para actualizar elementos del local storage
    let items = JSON.parse(localStorage.getItem('items')) || [];
    let item = items.find(item => item.text === text);
    if (item) {
      item.checked = checked;
      localStorage.setItem('items', JSON.stringify(items));
    }
  }

  static loadFromLocalStorage() { //Funcion para cargar elementos del local storage
    return JSON.parse(localStorage.getItem('items')) || [];
  }
  
}
async function loadProductsFromJSON() {
  try {
    let response = await fetch('products.json');
    let data = await response.json();
    localStorage.setItem('items', JSON.stringify(data));
    loadElementsFromLocalStorage();
  } catch (error) {
    console.error('Error cargando el archivo JSON:', error);
  }
}


function initializeList() {
  let myNodelist = document.getElementsByTagName("LI");

  for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("x");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  let close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let li = this.parentElement;
      li.style.display = "none";
      Item.removeFromLocalStorage(li.textContent.slice(0, -1));
    };
  }

  let list = document.querySelector("ul");
  list.addEventListener("click", function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      Item.updateInLocalStorage(ev.target.textContent.slice(0, -1), ev.target.classList.contains("checked"));
    }
  });
}

// Llamar a la función para inicializar la lista
initializeList();


function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("No has escrito nada");
  } else {
    document.getElementById("myUL").appendChild(li);
    let item = new Item(inputValue, false);
    item.saveToLocalStorage();
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("x");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var li = this.parentElement;
      li.style.display = "none";
      Item.removeFromLocalStorage(li.textContent.slice(0, -1));
    }
  }
}

function loadElementsFromLocalStorage() {
  var items = Item.loadFromLocalStorage();
  items.forEach(item => {
    var li = document.createElement("li");
    var t = document.createTextNode(item.text);
    li.appendChild(t);
    if (item.checked) {
      li.classList.add('checked');
    }
    document.getElementById("myUL").appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("x");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
      var li = this.parentElement;
      li.style.display = "none";
      Item.removeFromLocalStorage(li.textContent.slice(0, -1));
    }
  });
}

document.addEventListener('DOMContentLoaded', loadElementsFromLocalStorage);