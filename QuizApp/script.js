document.addEventListener("DOMContentLoaded", ()=>{
    const questionContainer = document.querySelector("#question-container")
    const questionText = document.querySelector("#question-text")
    const choicesList = document.querySelector("#choices-list")
    const nextBtn = document.querySelector("#next-btn")
    const resultContainer = document.querySelector("#result-container")
    const restartBtn = document.querySelector("#restart-btn")
    const startBtn = document.querySelector("#start-btn")
    const scoreDisplay = document.querySelector("#score")

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "What is the largest planet in our solar system?",
            choices: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            choices: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
            answer: "William Shakespeare"
        },
        {
            question: "What is the chemical symbol for gold?",
            choices: ["Au", "Ag", "Pb", "Fe"],
            answer: "Au"
        },
        {
            question: "What is the speed of light?",
            choices: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
            answer: "300,000 km/s"
        }
    ]

    let currentQuestionIndex = 0
    let score = 0

    startBtn.addEventListener("click", startQuiz)

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion()
        } else {
            showResult()
        }
    })

    restartBtn.addEventListener('click', () => {
        score = 0;
        currentQuestionIndex = 0
        resultContainer.classList.add('hidden');
        startQuiz();
    })

    function startQuiz() {
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion()
    }

    function showQuestion(){
        nextBtn.classList.add('hidden');
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "" // clear previous question
        questions[currentQuestionIndex].choices.forEach(choice =>{
            const li =  document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => selectAnswer(choice));
            choicesList.appendChild(li);
        })
    }

    function selectAnswer(choice){
        const correctAnswer = questions[currentQuestionIndex].answer;
        if(choice === correctAnswer){
            score++;
        }
        nextBtn.classList.remove('hidden')
    }

    function showResult(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questions.length}`
    }
})