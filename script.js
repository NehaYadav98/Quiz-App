const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const celebration = document.getElementById("celebration");
const incorrectMsg = document.getElementById("incorrect");
const scoreContainer = document.getElementById("score-container");
const startButton = document.getElementById("start-btn");
const startContainer = document.getElementById("start-container");
const questionContainer = document.getElementById("question-container");
const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.getElementById("progress-bar-container");

let currentQuestionIndex = 0;
let score = 0;
let autoNextTimeout;

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

startButton.addEventListener("click", () => {
  startContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  startQuiz();
});

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
  celebration.classList.add("hide");
  incorrectMsg.classList.add("hide");
  document.body.style.background = "#1e4d72";
  progressBar.style.width = "0%";
  progressBarContainer.style.visibility = "hidden";
  clearTimeout(autoNextTimeout);
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
    progressBar.style.backgroundColor = "green";
    score++;
  } else {
    document.body.style.background = "red";
    incorrectMsg.classList.remove("hide");
    progressBar.style.backgroundColor = "red";
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });

  progressBarContainer.style.visibility = "visible";
  // Start animating progress bar
  progressBar.style.width = "100%";
  
  // Move to next question after 2s
  autoNextTimeout = setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setNextQuestion();
    } else {
      showScore();
    }
  }, 1000);
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

function showScore() {
  resetState();
  questionElement.innerText = "🎉 Quiz Completed!";
  scoreContainer.innerText = `✅ Your Score: ${score} / ${questions.length}`;
  scoreContainer.classList.remove("hide");
  questionContainer.classList.add("hide");
  startContainer.classList.remove("hide");
  startButton.innerText = "Restart Quiz";
  document.body.style.background = "#1e4d72";
}
