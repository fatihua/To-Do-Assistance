//! variables
const input = document.querySelector("input")
const arama = document.querySelector("button")
const form = document.querySelector("form")
const ekleme = document.querySelector(".inputValues")
const ul1 = document.querySelector(".ulElement")

function saveToLocalStorage() {
    const items = [];
    document.querySelectorAll(".liElement .spanText").forEach(span => {
        items.push(span.textContent);
    });
    localStorage.setItem("notlar", JSON.stringify(items));
}


// Function to load the list from localStorage
function loadFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("notlar")) || [];
    items.forEach(item => {
        showScreen(item);
    });
}

function showScreen(inputValue){
    const liElement = document.createElement("li")
    ul1.prepend(liElement)
    liElement.classList.add("liElement")
    console.log(liElement);

    const divLiLeft = document.createElement("div")
    liElement.appendChild(divLiLeft)
    divLiLeft.classList.add("divLiLeft")
    
    const markSpan = document.createElement("span");
    divLiLeft.appendChild(markSpan);
    markSpan.classList.add("markSpan")
    markSpan.innerHTML = `<i class="fa-regular fa-circle"></i>`; // İşaret ikonu (check)
    markSpan.style.cursor = "pointer"; // İkonun tıklanabilir olduğunu belirtmek için

    const spanText = document.createElement("span")
    divLiLeft.appendChild(spanText)
    spanText.classList.add("spanText")
    spanText.textContent = inputValue

    const divLiRight = document.createElement("div")
    liElement.appendChild(divLiRight)
    divLiRight.classList.add("divLiRight")
    
    const spanUnlem = document.createElement("span")
    divLiRight.appendChild(spanUnlem)
    spanUnlem.classList.add("spanUnlem")
    spanUnlem.innerHTML = `<i class="fa-solid fa-exclamation"></i>`; 

    spanUnlem.onclick=()=>{
        divLiLeft.classList.toggle("divLiLeftUnlem")
        if(divLiLeft.classList.contains("divLiLeftUnlem")){
            divLiLeft.style.backgroundColor="red"
            spanUnlem.style.opacity="1"
        }else{
            divLiLeft.style.backgroundColor="inherit"
            spanUnlem.style.opacity="0.3"
        }
    }

    const span2 = document.createElement("span")
    divLiRight.appendChild(span2)
    span2.classList.add("span2")
    console.log(span2);

    span2.innerHTML = `<i class="fa-solid fa-trash">`
    span2.style.cursor = "pointer"; // İkonun tıklanabilir olduğunu belirtmek için
    span2.onclick = () => {
        liElement.remove()
        saveToLocalStorage()

    }

    divLiLeft.onclick = () => {
        liElement.classList.toggle("marked"); // "marked" sınıfını ekle/çıkar
        if(liElement.classList.contains("marked")){
            spanText.style.textDecoration="line-through"
            markSpan.innerHTML = `<i class="fa-sharp fa-solid fa-circle-check"></i>`
        }else {
            spanText.style.textDecoration="none"
            markSpan.innerHTML = `<i class="fa-regular fa-circle"></i>`;
        }
    }
    input.value = ""
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.length > 0) {
        showScreen(input.value);
        saveToLocalStorage();
    } else {
        alert("Lütfen bir değer giriniz");
    }
});

arama.onclick = () => {
    if (input.value.length > 0) {
        showScreen(input.value);
        saveToLocalStorage();
    } else {
        alert("Lütfen bir değer giriniz");
    }
}

window.addEventListener("load", () => {
    loadFromLocalStorage();
    const text = document.querySelector('h1');
    text.classList.add('visible');
});