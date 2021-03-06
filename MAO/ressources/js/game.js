const question = document.querySelector('#question');
const audio = document.querySelector('#wav');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const btn = document.querySelector('#next');
if(document.querySelector('#mode')){
    let input = document.querySelector('#mode');
    let mode = input.value;
    let next = document.querySelector('.next');
}

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'En MAO comment appelle-t-on ce son ?',
        song: 'media/mp3/KICK_HARD.mp3',
        choice1: 'Kick',
        choice2: 'Snare',
        choice3: 'HiHat',
        choice4: 'Clap',
        answer: 1,
    },
    {
        question: 'En MAO comment appelle-t-on ce son ?',
        song: 'media/mp3/HH_-_Dro.mp3',
        choice1: 'Kick',
        choice2: 'Snare',
        choice3: 'HiHat',
        choice4: 'Clap',
        answer: 3,
    },
    {
        question: 'En MAO comment appelle-t-on ce son ?',
        song: 'media/mp3/Snare_-_Coke.mp3',
        choice1: 'Kick',
        choice2: 'Snare',
        choice3: 'HiHat',
        choice4: 'Clap',
        answer: 2,
    },
    {
        question: 'En MAO comment appelle-t-on ce son ?',
        song: 'media/mp3/CLAP_RAP.mp3',
        choice1: 'Kick',
        choice2: 'Snare',
        choice3: 'HiHat',
        choice4: 'Clap',
        answer: 4,
    },
    {
        question: 'Quelle est le nom de cet instrument ?',
        song: 'media/mp3/piano.mp3',
        choice1: 'Guitare',
        choice2: 'Flûte',
        choice3: 'Clavecin',
        choice4: 'Piano',
        answer: 4,
    },
    {
        question: 'Que signifie le sigle MAO ?',
        song: 'none',
        choice1: 'Maître Artiste Original',
        choice2: 'Musique Assistée par Orditeur',
        choice3: 'Mon Animal Optimal',
        choice4: 'Maison A Occuper',
        answer: 2,
    },
    {
        question: 'Quel instrument reconnaissez vous ?',
        song: 'media/mp3/flute.mp3',
        choice1: 'Piano',
        choice2: 'Violon',
        choice3: 'Flûte',
        choice4: 'Harmonica',
        answer: 3,
    },
    {
        question: 'Qu\'est-ce qu\'un DAW ?',
        song: 'none',
        choice1: 'Drive Allegro Workout',
        choice2: 'Digital Audio Workstation',
        choice3: 'Driver Audiotechnical Work',
        choice4: 'Un zèbre',
        answer: 2,
    },
    {
        question: 'Quel artiste chante cette chanson ?',
        song: 'media/mp3/gims.mp3',
        choice1: 'Maître Gym',
        choice2: 'Maître Gims',
        choice3: 'Maître Yoda',
        choice4: 'Maître Capello',
        answer: 2,
    },
    {
        question: 'Quel groupe chante cette chanson ?',
        song: 'media/mp3/imagine.mp3',
        choice1: 'Imagine Dragon',
        choice2: 'Imagine Licorne',
        choice3: 'Imagine Cerbère',
        choice4: 'Imagine All The People',
        answer: 1,
    },
    {
        question: 'Quel groupe chante cette chanson ?',
        song: 'media/mp3/muse.mp3',
        choice1: 'Fuse',
        choice2: 'Buse',
        choice3: 'Muse',
        choice4: 'Beattles',
        answer: 3,
    },
    {
        question: 'Quel artiste chante cette chanson ?',
        song: 'media/mp3/naza.mp3',
        choice1: 'Soprano',
        choice2: 'Lacrim',
        choice3: 'Naps',
        choice4: 'Nasa',
        answer: 3,
    },
    {
        question: 'De quel anime vient cet opening ?',
        song: 'media/mp3/snk.mp3',
        choice1: 'Naruto',
        choice2: 'Demon Slayer',
        choice3: 'SNK (Attaque des titans)',
        choice4: 'Death Notes',
        answer: 3,
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 12

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} sur ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    audio.src = currentQuestion.song;

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

        if(document.querySelector('#mode')){
            document.querySelector('.next').style.display = "block"; 
        }else{
            
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 1000)
        }
        
    })

    
    
})

    
if(document.querySelector('#mode')){
    if(mode.value === 'anim'){
    btn.addEventListener('click', e => {
        const choice = document.querySelector('.correct') || document.querySelector('.incorrect')

        choice.classList.remove('correct')
        choice.classList.remove('incorrect')
        document.querySelector('.next').style.display = 'none'
        getNewQuestion()
        
    });
}
}
    incrementScore = num => {
    score+=num
    scoreText.innerText = score
}



startGame()