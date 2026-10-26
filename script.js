// Database of Questions (No backend needed)
const questionsData = [
    {
        question: "What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?",
        options: [
            { text: "O(1)", correct: false },
            { text: "O(n)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(n log n)", correct: false }
        ]
    },
    {
        question: "Which data structure is typically used to implement a Breadth-First Search (BFS) algorithm?",
        options: [
            { text: "Stack", correct: false },
            { text: "Queue", correct: true },
            { text: "Array", correct: false },
            { text: "Linked List", correct: false }
        ]
    },
    {
        question: "In SQL, which command is used to retrieve data from a database?",
        options: [
            { text: "EXTRACT", correct: false },
            { text: "PULL", correct: false },
            { text: "GET", correct: false },
            { text: "SELECT", correct: true }
        ]
    }
];

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionTracker = document.getElementById('question-tracker');
const finalScoreText = document.getElementById('final-score');
const totalQuestionsText = document.getElementById('total-questions');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        showQuestion();
    } else {
        showResult();
    }
});
restartBtn.addEventListener('click', startQuiz);

// Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    welcomeScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    resetState();
    
    let currentQuestion = questionsData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    questionTracker.innerText = `Question ${currentQuestionIndex + 1} of ${questionsData.length}`;

    // Create buttons for options dynamically
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-btn');
        if (option.correct) {
            button.dataset.correct = option.correct; // Tag the correct answer
        }
        button.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add('hide');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    // Disable all buttons after selection and show correct answer
    Array.from(optionsContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextBtn.classList.remove('hide'); // Show next button
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreText.innerText = score;
    totalQuestionsText.innerText = questionsData.length;
}