const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const quizQuestions = document.getElementById('quiz-questions');
const quizEnd = document.getElementById('quiz-end');
const finalScore = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.querySelector('form button');
const highScoresElement = document.getElementById('high-scores');

const questions = [
    {
        question: "What is the correct way to create a JavaScript array?",
        answers: [
            { text: "let colors = ['red', 'green', 'blue'];", correct: true },
            { text: "let colors = 'red', 'green', 'blue';", correct: false },
            { text: "let colors = 1 = 'red', 2 = 'green', 3 = 'blue';", correct: false },
            { text: "let colors = (1:'red', 2:'green', 3:'blue');", correct: false }
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
            { text: "*", correct: false },
            { text: "x", correct: false },
            { text: "=", correct: true },
            { text: "==", correct: false }
        ]
    },
    {
        question: "What will the following code output? console.log(3 + '5');",
        answers: [
            { text: "8", correct: false },
            { text: "35", correct: true },
            { text: "NaN", correct: false },
            { text: "TypeError", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a valid JavaScript variable name?",
        answers: [
            { text: "myVar", correct: false },
            { text: "_myVar", correct: false },
            { text: "$myVar", correct: false },
            { text: "1myVar", correct: true }
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Data Object Model", correct: false },
            { text: "Document Object Model", correct: true },
            { text: "Display Object Management", correct: false },
            { text: "Digital Ordinance Model", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: true },
            { text: "variable", correct: false },
            { text: "let", correct: true },
            { text: "const", correct: true }
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "function myFunction() {}", correct: true },
            { text: "func myFunction() {}", correct: false },
            { text: "createFunction myFunction() {}", correct: false },
            { text: "define myFunction() {}", correct: false }
        ]
    },
    {
        question: "What is the correct syntax for a JavaScript 'if' statement?",
        answers: [
            { text: "if x == 5 then {}", correct: false },
            { text: "if x = 5 {}", correct: false },
            { text: "if (x == 5) {}", correct: true },
            { text: "if x: 5 {}", correct: false }
        ]
    },
    {
        question: "Which method is used to remove the last element from an array and return that element?",
        answers: [
            { text: "shift()", correct: false },
            { text: "unshift()", correct: false },
            { text: "splice()", correct: false },
            { text: "pop()", correct: true }
        ]
    },
    {
        question: "What is the default behavior of the 'this' keyword in a JavaScript function?",
        answers: [
            { text: "Refers to the global object", correct: true },
            { text: "Refers to the function itself", correct: false },
            { text: "Refers to the first argument passed to the function", correct: false },
            { text: "Refers to the parent object", correct: false }
        ]
    }
    
];


let currentQuestionIndex = 0;
let timer = 60; // In seconds
let score = 0;
let interval;

startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', saveScore);

function startQuiz() {
    startButton.classList.add('hidden');
    quizQuestions.classList.remove('hidden');
    interval = setInterval(updateTimer, 1000);
    showQuestion();
}

function updateTimer() {
    if (timer <= 0) {
        clearInterval(interval);
        endQuiz();
    } else {
        timer--;
    }
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    answersElement.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('list-group-item', 'list-group-item-action');
        button.textContent = `${index + 1}. ${answer.text}`;
        button.addEventListener('click', () => handleAnswerClick(answer.correct));
        answersElement.appendChild(button);
    });
}

function handleAnswerClick(correct) {
    if (!correct) {
        timer -= 10;
    } else {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        clearInterval(interval);
        endQuiz();
    } else {
        showQuestion();
    }
}

function endQuiz() {
    quizQuestions.classList.add('hidden');
    quizEnd.classList.remove('hidden');
    finalScore.textContent = score;
}

function saveScore() {
    event.preventDefault();
    const initials = initialsInput.value.trim();

    if (initials) {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = { initials, score };

        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('highScores', JSON.stringify(highScores));

        displayHighScores(highScores);
    }
}

function displayHighScores(highScores) {
    highScoresElement.innerHTML = '<h3>High Scores</h3>';

    highScores.forEach((scoreEntry) => {
        const scoreDiv = document.createElement('div');
        scoreDiv.textContent = `${scoreEntry.initials}: ${scoreEntry.score}`;
        highScoresElement.appendChild(scoreDiv);
    });
}

// Display stored high scores on initial page load
const storedHighScores = JSON.parse(localStorage.getItem('highScores'));
if (storedHighScores) {
    displayHighScores(storedHighScores);
}
