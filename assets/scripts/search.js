let search = document.getElementById('search');
let search_icon = document.getElementById('search_icon');

search_icon.addEventListener('click', () => {
    search.classList.toggle('search_input');
})

// Restaurant Box Set

const movies = [{

        img: "../images/f1.jpg",
        name: "The Americano",
        address: "43, Dong Da, Ha Noi",
        url: "login.html",
    },
    {

        img: "../images/f2.jpg",
        name: "Coneko",
        address: "37, Bach Dang, Ha Noi",
        url: "login.html",
    },
    {

        img: "../images/f3.jpg",
        name: "Capuchinoo",
        address: "22, An Giang, Nghe An",
        url: "login.html",
    },
    {

        img: "../images/f4.jpg",
        name: "Beach Soda",
        address: "29, An Giang, Nghe An",
        url: "login.html",
    },

    {

        img: "../images/f3.jpg",
        name: "Take Pitches",
        address: "12, An Giang, Nghe An",
    },
    {
        img: "../images/f5.jpg",
        name: "Biz Drown",
        address: "37, Bach Dang, Ha Noi",
    },
    {
        img: "../images/f6.jpg",
        name: "Bagikito",
        address: "37, Bach Dang, Ha Noi",
    },
    {
        img: "../images/f5.jpg",
        name: "Ymlkw",
        address: "17, Bach Dang, Ha Noi",
    },
    {
        img: "../images/f6.jpg",
        name: "Atasasushi",
        address: "75, Bach Dang, Ha Noi",
    },
    {
        img: "../images/f2.jpg",
        name: "Fishaly",
        address: "222, Bach Dang, Ha Noi",
    },
    {
        img: "../images/f1.jpg",
        name: "xseashorep",
        address: "37, Bach Dang, Ha Noi",
    },

    {
        img: "../images/f2.jpg",
        name: "Irrris",
        address: "37, Bach Dang, Ha Noi",
    },
    {
        img: "../images/f3.jpg",
        name: "Shanro",
        address: "37, Bach Dang, Ha Noi",
    },
    {
        img: "../images/f2.jpg",
        name: "Mnop",
        address: "22, An Giang, Nghe An",
    },
    {
        img: "../images/f6.jpg",
        name: "Vhcotira",
        address: "22, An Giang, Nghe An",
    },
    {
        img: "../images/f5.jpg",
        name: "Hoazx",
        address: "22, An Giang, Nghe An",
    },
    {
        img: "../images/f3.jpg",
        name: "Qery",
        address: "22, An Giang, Nghe An",
    },


]

let search_bx2 = document.getElementsByClassName('search_bx2')[0];
window.addEventListener('load', () => {
    movies.forEach(element => {
        const { img, name, address, url } = element;

        let card = document.createElement('a');
        card.href = url;
        card.innerHTML = ` <img src="${img}" alt="">
        <div class="content3">
            <h6>${name}</h6>
            <p>${address}</p>
        </div>`;
        search_bx2.appendChild(card);
    });
});


search.addEventListener('keyup', () => {
    let filter = search.value.toUpperCase();
    let a = search_bx2.getElementsByTagName('a');
    for (let i = 0; i < a.length; i++) {
        let b = a[i].getElementsByClassName('content3')[0];
        let c = b.getElementsByTagName('h6')[0];

        let TextValue = c.textContent || c.innerText;
        if (TextValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = '';
            search_bx2.style.visibility = "visible";
            search_bx2.style.opacity = 1;
        } else {
            a[i].style.display = 'none';
        }
        if (search.value == 0) {
            search_bx2.style.visibility = "hidden";
            search_bx2.style.opacity = 0;
        }
    }
})