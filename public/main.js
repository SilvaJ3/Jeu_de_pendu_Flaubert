const pendu = document.querySelector(".pendu");
const header = document.querySelector('.head');
const hands = document.querySelector('.hands');
const legs = document.querySelector('.legs');

const alphabet = document.querySelector(".alphabet");
const alphabetTab = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const mot = document.querySelector(".mot");

const APICALL = "https://random-words-api.vercel.app/word";

let letterTab = [];

let tentative = 5;
let perdu = false;
let find = false;
const info = document.querySelector(".info h1")

const reload = document.querySelector(".reload");
reload.addEventListener("click", () => {
    window.location.reload();
});
    

function lettrage() {

    alphabetTab.forEach(el => {

    let btn = document.createElement("button");
    btn.classList.add("btn");
    let lettre = document.createElement("h1");
    lettre.innerText = el;
    lettre.classList.add("lettre");
    btn.appendChild(lettre);
    alphabet.appendChild(btn);
    
    // EventListener
    btn.addEventListener("click", (e)  => selection(e))

    })

}

lettrage();

/* ----------------------------- Choix de lettre ---------------------------- */

function selection(e) {
    if(perdu === false) {

        console.log(tentative);
        if(tentative === 0) {
            perdu = true;
            btn.removeEventListener("click", selection);
        } 
        else {
            let choixLettre = e.target.innerText;
            console.log(e.target.innerText);
            letterTab.forEach(element => {
            if(element.innerText === choixLettre) {
                console.log(element);
                element.classList.remove("hidden");
                e.target.classList.add("correct");
                find = true;
            }
        });
        }
    
        if(find) {
            checkWord(find);
            return find = false;
        } else if (find === false) {
            if(victoire) {

            } else {
                e.target.parentElement.classList.add("error");
                tentative--;
                info.innerText = `Tentatives restantes : ${tentative} !`;
                checkWord(find);
            }
        }
    }
    else {
        info.innerText = "Vous avez perdu !"
    }
}


/* ------------------------ Function mot à découvrir ------------------------ */

async function NvMot() {

    const appel = await fetch(APICALL);
    const resultats = await appel.json();

    const reponse = resultats[0].word;

    let newWord = (reponse).toUpperCase();
    console.log(newWord);

    newWord = newWord.split("");

    newWord.forEach(el => {
    let word = document.createElement("h1");
    let div = document.createElement("div");
    let barre = document.createElement("div");
    barre.classList.add("barre");
    word.innerText = el;
    word.classList.add("hidden");
    mot.appendChild(div);
    div.appendChild(word);
    div.appendChild(barre);
    letterTab.push(word);
    });
    console.log(letterTab);

}

NvMot();

/* ---------------------- Function Vérification Lettres --------------------- */

let victoire;

function checkWord(find) {
    hanging(find);
    victoire = false;
    let win = 0;

    for(let i = 0; i < letterTab.length; i++) {
        if(letterTab[i].classList.contains("hidden") === false) {
            win += 1;
        }
    }
    if(win === letterTab.length) {
        victoire = true;
        info.innerText = "Vous avez gagné";
    }
}

/* ----------------------------- Function pendu ----------------------------- */

function hanging(find) {

    if(victoire) {

    } else {
        if(find) {
        return;
    } else if (find === false) {
        switch (tentative) {
            case 5:
                
                break;
            case 4:
                let head = document.createElement("img");
                head.classList.add("head");
                head.src = "public/img/head.jpeg";
                header.appendChild(head);
                break;
            case 3:
                let right = document.createElement("img");
                right.classList.add("right");
                right.src = "public/img/right.jpeg";
                hands.appendChild(right);
                break;
            case 2:
                let left = document.createElement("img");
                left.classList.add("left");
                left.src = "public/img/left.jpeg";
                hands.appendChild(left);
                break;
            case 1:
                let right_leg = document.createElement("img");
                right_leg.classList.add("right_leg");
                right_leg.src = "public/img/right_leg.png";
                legs.appendChild(right_leg);
                break;
            case 0:
                let left_leg = document.createElement("img");
                left_leg.classList.add("left_leg");
                left_leg.src = "public/img/left_leg.jpeg";
                legs.appendChild(left_leg);
                break;
            default:
                break;
        }
    }
    }

    

}