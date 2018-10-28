//Javascript for Trivia Game

$(document).ready(function() {

let questionArray = ["Who defeated Prince Oberyn in hand to hand combat?", "Who is the second eldest son belonging to the House of Tarly?", "What is the name of John Snow's Direwolf?", "What nickname was given to Theon Greyjoy by his buddy Ramsay?", "What is The Hound's real name in the show?", "What is the surname given to bastards born in Dorne?", "Who is referred to as 'The King Beyond the Wall'?", "Who delivered the fatal blow that ultimately killed Rob Stark at his wedding?",];
let answerArray = [["Arya Stark", "The Hound", "Tywin Lannister", "The Mountain"], ["Randall", "Rickon", "Dickon", "Samwell"], ["Ghost", "Grey Wind", "Nymeria", "Shaggy Dog"], ["Reek", "Tigger", "Master Blaster", "Stubby"], ["Jeor Mormont", "Gregor Clegane", "Sandor Clegane", "Renly Baratheon"], ["Sand", "Snow", "Stone", "Wind"], ["The Night King", "Mance Raider", "Benjen Stark", "Rhaegar Targaryan"], ["Walder Frey", "Ramsay Bolton", "Roose Bolton", "Theon Greyjoy"]];
let correctAnswerArray = ["D. The Mountain", "C. Dickon", "A. Ghost", "A. Reek", "C. Sandor Clegane", "A. Sand", "B. Mance Rayder", "C. Roose Bolton"];
let imageArray = ["<img class = 'center-block img-right' src = '../images/Q1jpg.jpg'>", "<img class = 'center-block img-right' src = '../images/Q2jpg.jpg'>", "<img class = 'center-block img-right' src = '../images/Q3png.png'>", "<img class = 'center-block img-right' src = '../images/Q4png.png'>", "<img class = 'center-block img-right' src = '../images/Q5jpg.jpg'>", "<img class = 'center-block img-right' src = '../images/Q6png.png'>", "<img class = 'center-block img-right' src = '../images/Q7jpg.jpg'>", "<img class = 'center-block img-right' src = '../images/Q8jpg.jpg'>"];

let correctTotal = 0;
let incorrectTotal = 0;
let unansweredTotal = 0;
let countdown = 15;
let questionCounter = 0;

var clock;
var startScreen;

var themeSong = new Audio("assets/sound/themeSong.mp3");

function startScreenSetup() {
    startScreen = "<button type='button' class='btn btn-success start-button'>Click to Start!</button>";
    $(".mainSection").html(startScreen);
}

startScreenSetup();

$("body").on("click", ".start-button", function(event) {
    generateHTML();
    timer();
    themeSong.play();
});

function generateHTML() {
    gameScreen = "<p class='text-center timerTitle'>Time Remaining: <span class='timerSpot'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "<p><p class='answers'>A. " + answerArray[questionCounter][0] + "</p><p class='answers'>B. " + answerArray[questionCounter][1] + "</p><p class='answers'>C. " + answerArray[questionCounter][2] + "</p><p class='answers'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainSection").html(gameScreen);
}

function timer() {
    clock = setInterval(countdownTime, 1000);
    function countdownTime() {
        if (countdown === 0) {
            clearInterval(clock);
            ifTimeout();
        }
        if (countdown > 0) {
            countdown--;
        }
        $(".timerSpot").html(countdown);
    }

}

function ifCorrect() {

}

function ifIncorrect() {

}

function ifTimeout() {

}









})