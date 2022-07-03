const editBtn = document.querySelector(".res__main-btn__edit");
const albumBtn = document.querySelector(".res__main-btn__albums");
const albumsPanel = document.getElementById('albums-panel');
const albumsList = document.querySelector('.res__main-albums-list');
const albumListHidden = document.querySelector('.res__main-albums-image-hidden');
const addMenuBtn = document.getElementById('add-menu-btn');
const mainMenu = document.getElementById('main-menu');
const menuList = document.getElementById('main-menu-list');
const cancelEditBtn = document.getElementById('cancel-btn');
const albumContainer = document.querySelector('.res__main-albums-container');
const currentMenuItems = menuList.innerHTML;
const currentListImage = albumsList.innerHTML;
const inputAlbumList = albumListHidden.querySelectorAll
('input');
const restaurantName = document.querySelector('.res__main-intro--about-name');
const currentName = restaurantName.textContent;
const openingTimeTag = document.getElementById('opening-time');
const closingTimeTag = document.getElementById('closing-time');
const currentOpeningTime = openingTimeTag.textContent;
const currentClosingTime = closingTimeTag.textContent;
const mainContainer = document.querySelector('.res__main-container');
const listLabelIndex = getListLabelIndex();
let listRemoveBtn = null;
let currentLenght = null;
let inputLabel = null;
let count = parseInt(listLabelIndex[listLabelIndex.length - 1]);

function getListLabelIndex() {
    const listLabelMenu = document.querySelectorAll('.res__main-menu-item label');
    const listIndex = Array.prototype.map.call(listLabelMenu, (label) => index = label.htmlFor.split("-")[2])

    return listIndex;
}

albumBtn.onclick = () => {
    showAlbums();
};

menuList.onclick = (e) => {
    if (e.target.tagName.toLowerCase() == 'i' 
    && !e.target.classList.contains('fa-plus')) {
        const albumItem = e.target.parentElement.parentElement;
        albumItem.remove();
    }
}

albumContainer.onclick = (e) => {
    if (e.target.tagName.toLowerCase() == 'i' 
    && !e.target.classList.contains('fa-plus') 
    && e.target.parentElement.classList.contains('remove-album-image-btn')) {
        const albumItem = e.target.parentElement.parentElement;
        const imageIndex = albumItem.dataset.imageIndex;
        const inputFile = document.getElementById(`album-image-${imageIndex}`);
        albumItem.remove();
        inputFile.remove();
    }
}

addMenuBtn.onclick = (e) => {
    console.log(menuList);
    const inputMenuElement = getInputMenu();
    inputMenuElement.appendChild(getRemoveMenuBtn());
    menuList.appendChild(inputMenuElement);
    count++;
}

cancelEditBtn.onclick = (e) => {
    editBtn.textContent = 'Edit';
    cancelEditBtn.classList.toggle('d-none');
    addMenuBtn.classList.toggle('d-none');
    cancelMenuModified();
    cancelAlbumModified();
    cancelInfoModified();
    count = parseInt(listLabelIndex[listLabelIndex.length - 1]);
}

editBtn.onclick = () => {
    cancelEditBtn.classList.toggle('d-none');
    addMenuBtn.classList.toggle('d-none');
    const listImage = document.getElementsByClassName('res__main-albums-item');
    const menuItems =  document.getElementsByClassName('res__main-menu-item');
    Array.prototype.forEach.call(listImage, (element) => {
        element.appendChild(getRemoveAlbumBtn());
    });

    Array.prototype.forEach.call(menuItems, (element) => {
        replaceElement(element);
        addInputFile(element);
        element.appendChild(getRemoveMenuBtn())
        count++;
    });
    changeInputTag();
    
    listRemoveBtn = getListRemoveAlbumBtn();
    // remember to re-asign when remove
    currentLenght = listRemoveBtn.length + 1;
    const inputTypeFile = createFileInput();
    albumListHidden.appendChild(inputTypeFile);

    inputLabel = createLabelInput();
    albumsList.appendChild(inputLabel);
    
    inputLabel.onclick = addImage;
    
    editBtn.textContent = 'Save';
}

function cancelInfoModified() {
    const openingInputElement = document.getElementById('opening-time-edit');
    const closinggInputElement = document.getElementById('closing-time-edit');
    const restaurantInputElement = document.getElementById('restaurant-name-edit');
    openingInputElement.replaceWith(openingTimeTag);
    closinggInputElement.replaceWith(closingTimeTag);
    restaurantInputElement.replaceWith(restaurantName);
}

function changeInputTag() {
    const openingInputElement = createElement('input', 'res__main-intro--about-time' ,'res__main-intro--about-time-to-edit');
    openingInputElement.name = 'opening-time';
    openingInputElement.value = currentOpeningTime.trim();
    openingInputElement.id ='opening-time-edit';
    const closingInputElement = createElement('input', 'res__main-intro--about-time' ,'res__main-intro--about-time-to-edit');
    closingInputElement.name = 'closing-time';
    closingInputElement.value = currentClosingTime.trim();
    closingInputElement.id ='closing-time-edit';
    const restaurantNameInput = createElement('input', 'res__main-intro--about-name');
    restaurantNameInput.name = 'restaurant-name';
    restaurantNameInput.value = currentName;
    restaurantNameInput.id = 'restaurant-name-edit';
    const formElement = createElement('form', 'res__main-container');
    openingTimeTag.replaceWith(openingInputElement);
    closingTimeTag.replaceWith(closingInputElement);
    restaurantName.replaceWith(restaurantNameInput);
}

function cancelMenuModified() {
    menuList.innerHTML = currentMenuItems;
}

function cancelAlbumModified() {
    albumListHidden.innerHTML = '';
    Array.prototype.forEach.call(inputAlbumList, (input) => {
        albumListHidden.appendChild(input);
    });

    albumsList.innerHTML = currentListImage;
}

function addInputFile(element) {
    const imageContainer = element.querySelector('.res__main-menu-item-img');
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.id = `menu-image-${count}`;
    inputFile.name = `menu-image-${count}`;
    inputFile.hidden = 'true';

    inputFile.onchange = (e) => {
        const imgElement = imageContainer.querySelector('img');
        imgElement.src = URL.createObjectURL(e.target.files[0]);

        inputFile.onload = (e) => {
            URL.revokeObjectURL(imgElement.src);
        }
    }

    imageContainer.appendChild(inputFile); 
}

function replaceElement(element) {
    const inputNameElement = createElement('input', 'res__main-menu-item--name');
    const inputPriceElement = createElement('input', 'res__main-menu-item--price');
    const menuItemName = element.querySelector('.res__main-menu-item--name');
    const menuItemPrice = element.querySelector('.res__main-menu-item--price');
    const name = menuItemName.textContent;
    const price = menuItemPrice.textContent;
    inputNameElement.name = 'food-name';
    inputNameElement.value = name;
    inputNameElement.placeholder = `Name...`;
    inputPriceElement.name = 'food-price';
    inputPriceElement.value = price;
    inputPriceElement.placeholder = `Price...`;
    menuItemName.replaceWith(inputNameElement);
    menuItemPrice.replaceWith(inputPriceElement);
}

function getRemoveMenuBtn() {
    const removeElement = createElement('div', 'remove-menu-item-btn');
    const iconElement = createElement('i', 'fa-solid', 'fa-xmark');
    removeElement.appendChild(iconElement);
    return removeElement;
}

function getInputMenu() {
    const menuItem = createElement('div', 'res__main-menu-item');
    const menuItemImage = createElement('div', 'res__main-menu-item-img');
    const menuItemInfoInput = createElement('div', 'res__main-menu-item-content');
    menuItemInfoInput.innerHTML = 
    `    <input class="res__main-menu-item--name"   name="food-name" placeholder="Food's name..."
        required>
        <input class="res__main-menu-item--price" name="food-price"
        placeholder="Price..."
        required>`
    menuItemImage.innerHTML = 
    `   <label for="menu-image-${count}" class="label-input-menu">
            <i class="fa-solid fa-plus"></i>
        </label>
        <input type="file" name="menu-image" id="menu-image-${count}" hidden>`

    const inputImage = menuItemImage.querySelector(`#menu-image-${count}`);
    const labelInput = menuItemImage.querySelector('label');
    const imageDisplay = document.createElement('img');
    labelInput.appendChild(imageDisplay);

    inputImage.onchange = (e) => {
        imageDisplay.src = URL.createObjectURL(e.target.files[0]);
        Object.assign(labelInput.style, {
            opacity: 1,
            border: 'none'
        })

        imageDisplay.onload = (e) => {
            URL.revokeObjectURL(imageDisplay.src);
        }
    }
    menuItem.appendChild(menuItemImage);
    menuItem.appendChild(menuItemInfoInput);
    return menuItem;
}

function removeImage() {

}

function addImage(e) {
    const element = e.currentTarget;
    const imageInput = document.getElementById(element.htmlFor);

    imageInput.onchange = (e) => {
        const albumItem = createElement('div', 'res__main-albums-item');
        albumItem.dataset.imageIndex = currentLenght;
        const imgElement = document.createElement('img');
        
        imgElement.src = URL.createObjectURL(e.target.files[0]);
        albumItem.appendChild(imgElement);
        albumItem.appendChild(getRemoveAlbumBtn());
        albumsList.insertBefore(albumItem, inputLabel);
        currentLenght++;
        inputLabel.htmlFor = `album-image-${currentLenght}`;
        const inputTypeFile = createFileInput();
        albumListHidden.appendChild(inputTypeFile);

        imgElement.onload = (e) => {
            URL.revokeObjectURL(imgElement.src);
        } 
    }
}

function createFileInput() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.name = `image-${currentLenght}`;
    inputElement.id = `album-image-${currentLenght}`
    return inputElement;
}

function showAlbums() {
    const closeBtn = document.querySelector(".res__main-albums-close-btn");
    albumsPanel.style.display = "block";

    closeBtn.addEventListener("click", () => {
        albumsPanel.style.display = "none";
    });
}

function getListRemoveAlbumBtn() {
    const listRemoveBtn = document.getElementsByClassName('remove-album-image-btn');
    return listRemoveBtn;
}

function createLabelInput() {
    const labelInput = document.createElement('label');
    labelInput.title = "Add new image" ;
    labelInput.htmlFor = `album-image-${currentLenght}`;
    labelInput.id = 'res__main-albums-add-image';
    labelInput.appendChild(createElement('i', 'fa-solid', 'fa-plus'));
    return labelInput;
}

function getRemoveAlbumBtn() {          
    const removeAlbumBtn = createElement('div', 'remove-album-image-btn');
    const iconElement = createElement('i', 'fa-solid', 'fa-xmark');
    removeAlbumBtn.appendChild(iconElement);
    return removeAlbumBtn;
}

function createElement(type, ...classes) {
    const element = document.createElement(type);
    element.classList.add(...classes);
    return element
} 
