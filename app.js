const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const listEl = document.querySelector(".list");


let listContainer = JSON.parse(localStorage.getItem("listContainer"));

if (listContainer != null) {
  listContainer.forEach((task)=>{
    addTask(task)
  });
}

formEl.addEventListener("submit",(event)=>{
  event.preventDefault();
  addTask();
})

function addTask(task) {
  let newItem = document.createElement("li");
  newItem.innerText = inputEl.value;
  if(task){
    newItem.innerText = task.name;
  }
  listEl.appendChild (newItem);
  inputEl.value = "";
  if(task && task.checked){
    newItem.classList.add("checked")
  }
  iconSet(newItem);
}


//====function for add list item dynamicly=====

function iconSet(listItem){
  const iconELCheck = document.createElement("div");
  iconELCheck.innerHTML =`
  <i class="fas fa-check-square"></i>
  `
  const iconElDlt = document.createElement("div");
  iconElDlt.innerHTML =`
  <i class="fas fa-trash"></i>
  `
  listItem.appendChild(iconELCheck) ;
  listItem.appendChild(iconElDlt);

//=====add checked class ========

  iconELCheck.addEventListener("click",()=>{
    listItem.classList.toggle("checked");
    updateLocalStorage();
  })

//=====remove list item after clicking trash ========

  iconElDlt.addEventListener("click",()=>{
    listItem.remove();
    updateLocalStorage();
  })
  updateLocalStorage();
  
}



//========functon for update data to local storage ========

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  listContainer = [];
  liEls.forEach(liEl=>{
    listContainer.push({
      name : liEl.innerText,
      checked: liEl.classList.contains("checked")
    })
  })
  localStorage.setItem("listContainer", JSON.stringify(listContainer));
}

