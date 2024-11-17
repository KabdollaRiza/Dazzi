const questions = [
    {
        question: "What new challenges do the survivors face in Season 3 of Sweet Home?",
        answers: [
            { text: "A new group of hostile humans", correct: false },
            { text: "Mutated monsters with new abilities", correct: true },
            { text: "A spreading infection that turns humans into monsters faster", correct: false },
            { text: "A lack of resources, such as food and water", correct: false },
        ]
    },
    {
        question: "Which character undergoes significant development in their struggle between their human and monster sides in Season 3?",
        answers: [
            { text: "Cha Hyun-soo", correct: true },
            { text: "Lee Eun-hyuk", correct: false },
            { text: "Yoon Ji-su", correct: false },
            { text: "Seo Yi-kyeong", correct: false },
        ]
    },
    {
        question: "In Sweet Home Season 3, what is revealed about the origins of the monster plague?",
        answers: [
            { text: "It originated from a scientific experiment gone wrong", correct: false },
            { text: "It was caused by a virus from outer space", correct: false },
            { text: "It is the result of suppressed human desires manifesting", correct: true },
            { text: "It started with a cult performing forbidden rituals", correct: false },
        ]
    },
    {
        question: "What key location do the survivors attempt to reach for safety in Season 3?",
        answers: [
            { text: "A military base", correct: false },
            { text: "An underground bunker", correct: true },
            { text: "A secluded island", correct: false },
            { text: "A fortified high-rise building", correct: false },
        ]
    },
    {
        question: "Which character sacrifices themselves in Season 3 to save the rest of the group?",
        answers: [
            { text: "Park Yu-ri", correct: false },
            { text: "Jung Jae-heon", correct: true },
            { text: "Lee Eun-yu", correct: false },
            { text: "Han Du-sik", correct: false },
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
