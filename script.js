const colorNames = ['Red', 'Blue', 'Green', 'Yellow'];
const colorNameElement = document.getElementById('colorName');
const colorBuckets = document.querySelectorAll('.color-bucket');
const resultElement = document.getElementById('result');

let score = 0;

function generateRandomColor() {
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    return colorNames[randomIndex];
}

function displayRandomColor() {
    const randomColor = generateRandomColor();
    colorNameElement.textContent = randomColor;
}

function checkMatch(colorBucket) {
    const selectedColor = colorBucket.getAttribute('data-color');
    const targetColor = colorNameElement.textContent.toLowerCase();

    if (selectedColor.toLowerCase() === targetColor) {
        score++;
        resultElement.textContent = 'Correct! You matched the colors.';
        resultElement.style.color = '#28a745';
    } else {
        resultElement.textContent = 'Wrong! Try again.';
        resultElement.style.color = '#dc3545';
        hintAnimation();
    }

    displayRandomColor();
}

function hintAnimation() {
    colorNameElement.classList.add('shake');
    setTimeout(() => {
        colorNameElement.classList.remove('shake');
    }, 1000);
}

function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.getAttribute('data-color'));
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const draggedColor = event.dataTransfer.getData('text/plain');
    const colorBucket = document.querySelector(`[data-color="${draggedColor}"]`);
    if (colorBucket) {
        checkMatch(colorBucket);
    }
}

colorBuckets.forEach((bucket) => {
    bucket.addEventListener('dragstart', drag);
});

colorNameElement.addEventListener('dragover', allowDrop);
colorNameElement.addEventListener('drop', drop);

displayRandomColor();
