//Getting all elements from the DOM 

const imgContainer = document.querySelector(".showcase > div");
const img = document.querySelector(".showcase img");
const shadow = document.querySelector(".shadow");

const thumb = document.querySelectorAll(".thumbs img");
const titleOverlay = document.querySelector(".titleOverlay");
const title = document.querySelector(".titleText");
const desc = document.querySelector(".description");

const sizes = document.querySelectorAll(".sizes > li");
const stars = document.querySelectorAll(".stars span");
const price = document.querySelector(".price");
const colorBtn = document.querySelectorAll(".color");

const pag = document.querySelectorAll(".pag");
const prev = document.querySelector(".arr-left");
const next = document.querySelector(".arr-right");
const shoeNum = document.querySelector(".shoe-num");
const shoeTotal = document.querySelector(".shoe-total");


//Id variables 
let id = 1;
let colorType = 1;
let shoe = 1;

//Shoe Details / Data

const colors = [

    [
        "#ae001b",
        "#111111"
    ],
    [
        "linear-gradient(0deg, orange, red)",
        "#bda08e"
    ],
    [
        "linear-gradient(0deg, #00b8ea 0%, #e6882d 50%, #e56da6 100%)",
        "linear-gradient(0deg, #dae766, #b2afaa)"
    ],
];

const prices = [ "150", "250", "175"];

const names = [

    [
        "Red Nike Jordan Max Aura 3",
        "Black Nike Jordan Max Aura 3"
    ],
    [
        "Black/Orange Nike Air Max 95",
        "Beige/Grey Nike Air Max 95"
    ],
    [
        "Colorful NIKE Jordan Delta 2 SP",
        "Gray NIKE Jordan Delta 2 SP"
    ],
];

const description = [
    [
        "Whether you're a basketball enthusiast or a fashion-forward individual, the Nike Jordan Max Aura 3 offers a fusion of heritage and innovation, making it a sought-after choice for those who appreciate both classic design and cutting-edge athletic performance.",
    ],
    [
        "Characterized by its distinct wave-like design inspired by the human body's anatomy, the Air Max 95's unique aesthetic has become instantly recognizable. The shoe's multiple Air units provide exceptional cushioning and comfort, making it not only a style statement but also a favorite among athletes and sneaker enthusiasts alike.",
    ],
    [
        "Crafted with a mix of premium materials, the Delta 2 SP showcases a sleek and contemporary silhouette while paying homage to the rich legacy of the Air Jordan line. Its unique design features, such as the layered upper and asymmetrical details, create a visually dynamic look that captures attention.",
    ],
];

const ratings = [4, 5, 3]


/*====== Functions =======*/

//Retriving image from folder path

function getImage(imgType, shoe, colorType, id, extension) {
    return "img/"+
    imgType + "/shoe" + shoe + "-" +
    colorType + "/img" + id + "." + extension;
}


//Reset Active State to buttons 

function resetActive (element, elementClass, i) {
    for (let i = 0; i < element.length; i++) {
        element[i].classList.remove(elementClass + "-active");
    }
    element[i].classList.add(elementClass + "-active");
}

//Fire Animations

function animate(element,time, anim) {
    element.style.animation = anim;

    setTimeout(() => {
        element.style.animation = "none";
    }, time);
}

//Assign colors to colo buttons

function assignColors(i, shoe) {
    colorBtn[i].style.background = colors[shoe -1][i];
}

//Set rating by filling out stars

function resetStars(shoe) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].innerText = "star_outline";
    }

    //Adding the ratings 
    for (let i = 0; i < ratings[shoe]; i++) {
        stars[i].innerText = "star";
    }
}


//Changing shoe size

for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener("click", (e) => {
        resetActive(sizes, "size", i);
    });
}

/* Setting up all of theinitial data 
for the first shoe that loads */

shoeTotal.innerText = "0" + pag.length;
shoeNum.innerText = "0" + shoe;
price.innerText = "$" + prices[0];
resetStars(shoe - 1);
title.innerText = names[0][0];
desc.innerText = description[0];


/* Changing Images */

for (let i = 0; i < thumb.length; i++) {
    thumb[i].addEventListener("click", (e) => {
    
        id = i + 1;

/* Setting the main image to clicked thumbnail image*/ 
        img.src = getImage(
            "showcase", shoe, colorType, id, "png"
        );
/* Adding the active class to the clicked thumbnail */
        resetActive(thumb, "thumb", i);

// Adding the fade in animation on the shoe
        animate(imgContainer, 550, "fade 500ms ease-in-out")
    });
}

for (let i = 0; i < colorBtn.length; i++) {
    //Setting up colors to the color btn
    assignColors(i, shoe);


//Changing Colors

colorBtn[i].addEventListener("click", ()=> {

    colorType = i + 1;

    setTimeout(() => {
        img.src = getImage(
            "showcase", shoe, colorType, id, "png"
        );
    }, 450);

    //Changing Thumbnails

    for (let i = 0; i < thumb.length; i ++) {
        thumb[i].src = getImage(
            "thumbs", shoe, colorType, i + 1, "jpg"
        );
    }

    //Set active class to clicked button
    resetActive(colorBtn, "color", i);

    //Change the shoe title 
    title.innerText = names[shoe - 1][i];

    //Adding all of the animations
    animate(img, 550, "jump 500ms ease-in-out");
    animate(shadow, 550, "shadow 500ms ease-in-out");
    animate(titleOverlay, 850, "title 800ms ease");
});

}

/***  Slider ****/

function slider(shoe) {
    //Change Showcase Image
    setTimeout(() => {
        img.src = getImage (
            "showcase", shoe, colorType, id, "png"
        );
    }, 600);

    //Change Thumbnails
    for (let i = 0; i < thumb.length; i++) {
        thumb[i].src = getImage(
            "thumbs", shoe, colorType, i + 1, "jpg"
        );
    }

    //Changing the colors on the color buttons
    for (let i = 0; i < colorBtn.length; i ++) {
         assignColors(i, shoe);
    }

    //Set active class to clicked button
    resetActive(pag, "pag", shoe - 1);

    //Reassign all of the shoe data 
    desc.innerText = description[shoe - 1];
    title.innerText = names[shoe - 1][colorType - 1];
    price.innerText = "$" + prices[shoe - 1];
    resetStars(shoe - 1);
    shoeNum.innerText = "0" + shoe;

    //Adding all of the animations
    animate(img, 1550, "replace 1.5s ease-in");
    animate(shadow, 1550, "shadow2 1.5s ease-in");
    animate(titleOverlay, 850, "title 800ms ease");
}

//Previous shoe

prev.addEventListener("click", () => {
    //Decrement img id
    shoe--;
    /* Check if slide goes below the first,
    and reset it to the last slide */
    if (shoe < 1) {
        shoe = pag.length;
    }
    //Run the slider function 
    slider(shoe);
});

//Next Shoe

next.addEventListener("click", () => {
    //Increment img id
    shoe++;

    if (shoe > pag.length) {
        shoe = 1;
    }

    //Run the slider function
    slider(shoe);
});

//Pagination 
for (let i = 0; i < pag.length; i++) {
    //Add click event for all pagination
    pag[i].addEventListener("click", () => {

        slider(i + 1);

        shoe = i + 1;
    });
}


