const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Berlin"],
        correct: "Paris"
    },
    {
        question: "Who is the founder of Microsoft?",
        options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
        correct: "Bill Gates"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Jupiter", "Mars", "Venus"],
        correct: "Mars"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10; // 10 seconds per question

const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const scoreEl = document.querySelector('.score');
const timerEl = document.querySelector('.timer');
const button = document.querySelector('button');

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    updateTimer();

    const currentData = quizData[currentQuestionIndex];
    questionEl.textContent = currentData.question;

    optionsEl.innerHTML = '';
    currentData.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => selectAnswer(option);
        optionsEl.appendChild(btn);
    });

    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function updateTimer() {
    timerEl.textContent = `Time left: ${timeLeft}s`;
}

let selectedAnswer = null;

function selectAnswer(answer) {
    selectedAnswer = answer;
}

function checkAnswer() {
    if (!selectedAnswer) {
        alert("Please select an option!");
        return;
    }

    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
        score++;
    }

    selectedAnswer = null;
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = '';
    timerEl.textContent = '';
    button.style.display = 'none';
    scoreEl.textContent = `Your Score: ${score}/${quizData.length}`;
}

// Start quiz on load
window.onload = () => {
    loadQuestion();
};
