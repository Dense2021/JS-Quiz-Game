const highScoresList = document.querySelector('#high-score-list')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} <span>${score.score}<span></li>`
}).join('')