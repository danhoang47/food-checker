const profileBtn = document.querySelector("#header-bar .profile-btn");
const userProfileMenu = document.querySelector("#header-bar .profile-list");

console.log(profileBtn);

profileBtn.onclick = (e) => {
    userProfileMenu.classList.toggle("d-none");
    e.stopPropagation();
}

document.onclick = () => {
    userProfileMenu.classList.add('d-none');
}