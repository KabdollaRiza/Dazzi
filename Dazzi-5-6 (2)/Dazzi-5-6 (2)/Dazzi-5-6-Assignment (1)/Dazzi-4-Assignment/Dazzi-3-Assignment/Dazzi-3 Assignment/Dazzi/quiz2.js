const questions = [
    {
        question: "What is the main premise of *Shop for Killers*?",
        answers: [
            { text: "A store that sells weapons to assassins", correct: true },
            { text: "A competition among assassins to eliminate each other", correct: false },
            { text: "A detective trying to solve a murder mystery", correct: false },
            { text: "A group of friends starting a new business", correct: false },
        ]
    },
    {
        question: "Who is the main protagonist in *Shop for Killers*?",
        answers: [
            { text: "Jinwoo", correct: false },
            { text: "Soo-yeon", correct: true },
            { text: "Minho", correct: false },
            { text: "Hae-jin", correct: false },
        ]
    },
    {
        question: "What unique feature does the shop offer to its clients?",
        answers: [
            { text: "Customizable weapons", correct: false },
            { text: "Psychological evaluations", correct: true },
            { text: "Personalized assassination plans", correct: false },
            { text: "Free trial for first-time users", correct: false },
        ]
    },
    {
        question: "What major conflict does Soo-yeon face in the story?",
        answers: [
            { text: "Her past as a former assassin", correct: true },
            { text: "A rival shop trying to steal her clients", correct: false },
            { text: "Her family disapproving of her career", correct: false },
            { text: "A love interest who is also a killer", correct: false },
        ]
    },
    {
        question: "What does the shop symbolize in the narrative?",
        answers: [
            { text: "The darkness within human nature", correct: true },
            { text: "The pursuit of wealth and power", correct: false },
            { text: "A safe haven for outcasts", correct: false },
            { text: "A business opportunity in a chaotic world", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");

        // Add styles dynamically for spacing and appearance
        button.style.display = "block"; 
        button.style.margin = "10px 0"; 
        button.style.padding = "10px"; 
        button.style.fontSize = "16px"; 
        button.style.borderRadius = "5px"; 
        button.style.border = "1px solid #ddd";
        button.style.cursor = "pointer";

        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.style.backgroundColor = '#9aeabc'; 
        selectedBtn.style.color = 'white';
        score++; // Increment score for correct answer
    } else {
        selectedBtn.style.backgroundColor = '#ff9393'; 
        selectedBtn.style.color = 'white';
    }

    Array.from(answerButton.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = '#9aeabc'; 
        }
    });
    nextButton.style.display = "block"; 
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.style.display = "none"; 

    // Restart button for replaying the quiz
    const restartButton = document.createElement("button");
    restartButton.innerHTML = "Restart Quiz";
    restartButton.classList.add("btn");
    
    // Style the restart button
    restartButton.style.marginTop = "20px";
    restartButton.style.padding = "10px";
    restartButton.style.fontSize = "16px";
    restartButton.style.borderRadius = "5px";
    restartButton.style.border = "1px solid #ddd";
    restartButton.style.cursor = "pointer";
    
    restartButton.addEventListener("click", startQuiz);
    answerButton.appendChild(restartButton);
}

startQuiz();
