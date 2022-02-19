let question = document.getElementById("question");
let a_text = document.getElementById("a_text");
let b_text = document.getElementById("b_text");
let c_text = document.getElementById("c_text");
let d_text = document.getElementById("d_text");
let submit = document.getElementById("submit");
let currentQuiz = 0;
let score = 0;
var quizData = [];

// Load API //
loadData('../api/qustions.json');

async function loadData(url) {
    // Gather quiz data from json file //
    {
        const response = await fetch(url);
        var questions = await response.json();
    }

    // Store retrieved data //
    quizData = questions;
    console.log(quizData);

    // Load next quiz //
    loadQuiz();
}

// Load next quiz //
const loadQuiz = () => {
    // Deselect options //
    deselect();

    // Load question and options //
    const currentQuizData = quizData[currentQuiz];

    question.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

// Get selected option ID //
const getSelected = () => {
    const answerElms = document.querySelectorAll(".answer");

    for (let i = 0; i < answerElms.length; i++) {
        const answerElm = answerElms[i];
        if (answerElm.checked) {
            return answerElm.id;
        }
    }
}

// Deselect options //
const deselect = () => {
    const answerElms = document.querySelectorAll(".answer");

    answerElms.forEach((answerElm) => {
        answerElm.checked = false;
    });
}

const retryQuiz = () => {
    location.reload();
}

// Submit button handler //
submit.addEventListener("click", () => {
    const answer = getSelected();

    // Update Score //
    if (answer == quizData[currentQuiz].correct) {
        score++;
    }
    else {
        console.log("wrong answer");
    }

    // Check if an answer is selected //
    if (answer) {
        currentQuiz++;
    }

    // Update quiz //
    if (currentQuiz < quizData.length) {
        loadQuiz();
    }
    else {
        const quiz = document.getElementById("quiz");

        quiz.innerHTML = `
            <div class="quiz-completed-container">
                <h2>
                    Quiz Completed
                </h2>
                <h4>
                    Your Score : ${score}/${quizData.length}
                </h3>
            </div>
            <button onclick="retryQuiz()">
                Retry Quiz
            </button>
        `;
    }
});