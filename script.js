const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const celebration = document.getElementById("celebration");
const incorrectMsg = document.getElementById("incorrect");
const scoreContainer = document.getElementById("score-container");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "Which one of these is a JavaScript framework?",
    answers: [
      { text: "Python", correct: false },
      { text: "Django", correct: false },
      { text: "React", correct: true },
      { text: "Eclipse", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "Which one is a backend language?",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "Python", correct: true },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false }
    ]
  }
];

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  celebration.classList.add("hide");
  incorrectMsg.classList.add("hide");
  document.body.style.background = "#1e4d72"; // reset background to blue
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  setStatusClass(selectedButton, correct);
  if (correct) {
    document.body.style.background = "green";
    celebration.classList.remove("hide");
    score++; // increase score for correct answer
  } else {
    document.body.style.background = "red";
    incorrectMsg.classList.remove("hide");
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true; // disable after one selection
  });
  nextButton.classList.remove("hide");
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = "🎉 Quiz Completed!";
  scoreContainer.innerText = `✅ Your Score: ${score} / ${questions.length}`;
  scoreContainer.classList.remove("hide");
  nextButton.classList.add("hide");
  celebration.classList.add("hide");
  incorrectMsg.classList.add("hide");
  document.body.style.background = "#1e4d72";
}
