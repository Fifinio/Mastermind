// colors
const colors = Array.from(document.querySelectorAll('.color'));
const colorsArr = ['red', 'green', 'blue', 'pink', 'yellow', 'orange', 'purple', 'aqua'];
// guesses
const guesses = Array.from(document.querySelectorAll('.guess'));

// hits
const hits = Array.from(document.querySelectorAll('.hit'));

// gamestate
var pickedColor = null;
var move = 8;

const submit = document.querySelector('.submit');


// generate random code ex. [0, 1, 2, 3] numbers can be 0-7 and can repeat
var code = [];
for (var i = 0; i < 4; i++) {
    code[i] = Math.floor(Math.random() * 8);
}
console.log(code);

function pick() {
    const color = colorsArr[this.id];
    colors.forEach(color => color.classList.remove('active'));
    this.classList.add('active');
    pickedColor = this.id;
    submit.backgroundColor = pickedColor;
}

function setColor() {
    this.style.backgroundColor = colorsArr[pickedColor]
}

function makeGuess() {
    const guessElements = Array.from(guesses[move].children);
    const guess = guessElements.map(cell => colorsArr.indexOf(cell.style.backgroundColor));

    guessElements.forEach(cell => cell.addEventListener('click', setColor));
    --move;
    matchesCode(guess, guessElements);
}

function matchesCode(guess, elements){
    // hits
    // all elements that match code
    const hit = guess.filter((color, index) => color === code[index]);
    if(hit.length === 4){
        alert('You win!');
    }else{
        guesses[move+1].classList.remove('active');
        Array.from(guesses[move].children).forEach(cell => cell.addEventListener('click', setColor));
        guesses[move].classList.add('active')
        
    }

    elements.forEach(cell => cell.removeEventListener('click', setColor))
}


// event listeners
Array.from(guesses[8].children).forEach(cell => cell.addEventListener('click', setColor));
guesses[8].classList.add('active');
submit.addEventListener('click', makeGuess);
colors.forEach(color => document.getElementById(color.id).style.backgroundColor = colorsArr[color.id]);
colors.forEach(color => color.addEventListener('click', pick));