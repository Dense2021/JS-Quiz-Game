const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarfull = document.querySelector('#progress-barfull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'what is 2 + 2',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'who is the lion sin of pride',
        choice1: 'meliodas',
        choice2: 'ban',
        choice3: 'escanor',
        choice4: 'king',
        answer: 3,
    },
    {
        question: 'what do you call a fish with no eye',
        choice1: 'a fsh',
        choice2: 'a blind fish',
        choice3: 'bait',
        choice4: 'a dead fish',
        answer: 1,
    },
    {
        question: 'who is the richest man in the world',
        choice1: 'jeff basos',
        choice2: 'bill gates',
        choice3: 'mark zukaberg',
        choice4: 'elon musk',
        answer: 4,
    },
    {
        question: 'what does the acronymn CSS stand for',
        choice1: 'cascading style sheet',
        choice2: 'computer system style',
        choice3: 'component server style',
        choice4: 'custom style sheet',
        answer: 1,
    },
    {
        question: 'simplify 2 + 2 x 2',
        choice1: '6',
        choice2: '4',
        choice3: '8',
        choice4: '2',
        answer: 1,
    },
    {
        question: 'which of the listed is not a titan',
        choice1: 'amored titan',
        choice2: 'cart titan',
        choice3: 'abnormal titan',
        choice4: 'beast titan',
        answer: 3,
    },
    {
        question: 'what is 15 x 15',
        choice1: '150',
        choice2: '252',
        choice3: '25',
        choice4: '225',
        answer: 4,
    },
    {
        question: 'who is the president of russia',
        choice1: 'jeff basos',
        choice2: 'putin',
        choice3: 'donald trump',
        choice4: 'joe biden',
        answer: 2,
    },
    {
        question: 'on a leap year, how many days are in february',
        choice1: '28',
        choice2: '30',
        choice3: '29',
        choice4: '31',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
