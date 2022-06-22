const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const registerForm = document.getElementById("register-form");
const menuForm = document.getElementById("menu-form");
const basicInfo = document.getElementById("basic-info");
const imageInput = document.querySelectorAll(".image-input");
const addFoodBtn = document.getElementById("add-btn");

let currentPage = 0;
let counter = 1;

registerForm.onsubmit = (e) => {
    e.preventDefault();
}

nextBtn.onclick = backBtn.onclick = (e) => {
    basicInfo.classList.toggle('d-none');
    menuForm.classList.toggle('d-none');
}

function getPreviewImage(e) {
    const parentElement = e.target.parentElement;
    const iconClass = parentElement.querySelector(".menu-box label i");
    const imgPreviewBox = parentElement.querySelector("img");

    imgPreviewBox.src = URL.createObjectURL(e.target.files[0]);
    imgPreviewBox.classList.remove('d-none');
    iconClass.classList.add('d-none');

    imgPreviewBox.onload = () => {
        URL.revokeObjectURL(imgPreviewBox.src);
    }
}

function removeMenuBox(e) {
    const removeBtn = e.target.parentElement;
    const parentElement = removeBtn.parentElement;
    parentElement.remove();
}

function addMenuBox(e) {
    e.preventDefault();
    const parentElement = e.target.parentElement;
    const menuBox = createMenuBox();
    parentElement.insertBefore(menuBox, addFoodBtn);
    const imageElement = menuBox.querySelector(`#image-input-${counter - 1}`);
    const removeBtn = menuBox.querySelector(`.remove-btn`);
    imageElement.onchange = getPreviewImage;
    removeBtn.onclick = removeMenuBox;
}

addFoodBtn.onclick = addMenuBox;


menuForm.onclick = (e) => {
    e.stopPropagation();
    const parentElement = e.target.parentElement;
    if (parentElement.tagName.toLowerCase() === 'label')
        console.log();
}

function createMenuBox() {
    const menuBox = document.createElement('div');
    menuBox.classList.add('menu-box');
    menuBox.innerHTML = `
        <label for="image-input-${counter}">
            <i class="fa-solid fa-plus"></i>
            <img src="" alt="" class="d-none">
        </label>
        <input id="image-input-${counter}" class="image-input" type="file" accept=".png, .jpeg, .jpg" id="" hidden>
        <div class="food-info">
            <div class="food-name-box">
                <label for="food-name">Food Name</label>
                <input id="food-name" type="text">
            </div>
            <div class="food-price-box">
                <label for="food-price">Food Price </label>
                <input id="food-price" type="text" placeholder="0 vnd">
            </div>
        </div>
        <div class="remove-btn">
            <i class="fa-solid fa-minus"></i>
        </div>`
    
    counter++;
    
    return menuBox;
}