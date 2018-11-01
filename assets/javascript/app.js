//Javascript for Trivia Game

//wait for HTML to Load
$(document).ready(function() {

    //Start-screen setup function, generates 'Start' button in HTML
    function startScreenSetup() {
        startScreen = "<button type='button' class='btn btn-success start-button'>Click to Start!</button>" + "<p class='warning-text'>***Warning: Graphic violent images. User discretion advised.***</p>";
        $(".mainSection").html(startScreen);
    }

    //invoke start screen
    startScreenSetup();
    

    //event listener for start button click. Click starts theme song, generates HTML to start game & invokes timer function
    $("body").on("click", ".start-button", function(event) {
        //event.preventDefault();
        themeSong.play();
        generateHTML();
        timer();  
    });

    //event listener for user answer click, determines if answer was correct/incorrect then runs the appropriate functions
    $("body").on("click", ".answers", function(event) {
        userSelection = $(this).text();
        if(userSelection === correctAnswerArray[questionCounter]) {
            clearInterval(clock);
            ifCorrect();
        }
        else {
            clearInterval(clock);
            ifIncorrect();
        }
    });


    //event listener for restart button click, then invokes the gameReset function
    $("body").on("click", ".restart-button", function(event) {
        gameReset();
    });

    //event listener for stop quiz button click, user click invokes the startScreenSetup and pauses the music and resets the themesong to play from the beginning for the next time the game get's started
    $("body").on("click", ".stop-button", function(event) {
        startScreenSetup();
        themeSong.currentTime = 0;
        themeSong.pause();
        questionCounter = 0;
        correctTotal = 0;
        incorrectTotal = 0;
        unansweredTotal = 0;
        countdown = 15;
    })

});

let questionArray = ["Who defeated Prince Oberyn in hand to hand combat?", "Who is the second eldest son belonging to the House of Tarly?", "What is the name of John Snow's Direwolf?", "What nickname was given to Theon Greyjoy by his buddy Ramsay Snow?", "What is The Hound's real name in the show?", "Who is the leader of the White Walkers?", "Who is referred to as 'The King Beyond the Wall'?", "Who delivered the fatal blow that ultimately killed Rob Stark at his wedding?"];
let answerArray = [["Ser Jorah Mormont", "The Hound", "Tywin Lannister", "The Mountain"], ["Randall", "Rickon", "Dickon", "Samwell"], ["Ghost", "Grey Wind", "Nymeria", "Shaggy Dog"], ["Rickon", "Dickon", "Dickoff", "Reek"], ["Balon Greyjoy", "Gregor Clegane", "Sandor Clegane", "Robert Baratheon"], ["Ned Stark", "Prince Oberyn", "The Night King", "Tyrion Lannister"], ["The Night King", "Mance Rayder", "Benjen Stark", "Rhaegar Targaryan"], ["Walder Frey", "Ramsay Bolton", "Roose Bolton", "Theon Greyjoy"]];
let correctAnswerArray = ["D. The Mountain", "C. Dickon", "A. Ghost", "D. Reek", "C. Sandor Clegane", "C. The Night King", "B. Mance Rayder", "C. Roose Bolton"];
let imageArray = ["<img class='center-block img-right images' src='assets/images/Q1gif.gif'>", "<img class='center-block img-right images' src='assets/images/Q2gif.gif'>", "<img class='center-block img-right images' src='assets/images/Q3gif.gif'>", "<img class='center-block img-right images' src='assets/images/reek.gif'>", "<img class='center-block img-right images' src='assets/images/sandorClegane.gif'>", "<img class='center-block img-right images' src='assets/images/theNightKing.gif'>", "<img class='center-block img-right images' src='assets/images/manceRayder.gif'>", "<img class='center-block img-right images' src='assets/images/rooseBolton.gif'>"];

let correctTotal = 0;
let incorrectTotal = 0;
let unansweredTotal = 0;
let countdown = 15;
let questionCounter = 0;

let themeSong = new Audio("assets/sound/themeSong.mp3");
themeSong.loop = true;

var clock;
var startScreen;
var gameScreen;
var userSelection;

    //function to set countdown interval for timer & display in HTML
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

    //function for correct user selection, adds to correct total count, notifies user answer is correct & pulls up associated image, timeout after 5 seconds
    function ifCorrect() {
        correctTotal++;
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>" + countdown + "</p>" + "<p class='text-center'><span class='correct-color'>Correct!</span> The answer is:<br>" + correctAnswerArray[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainSection").html(gameScreen);
        setTimeout(wait, 5000);
    }
    
    //function for incorrect user selection, adds to incorrect total count, notifies user answer is incorrect & pulls up associated image, timeout after 5 seconds
    function ifIncorrect() {
        incorrectTotal++;
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>" + countdown + "</p>" + "<p class='text-center answer-text'><span class='wrong-color'>Wrong!</span> The correct answer is: </p>" + correctAnswerArray[questionCounter] + "<br><img class='images' src='assets/images/shameWrongAnswer1.gif'>";
        $(".mainSection").html(gameScreen);
        setTimeout(wait, 5000);
    }

    //function for unanswered question after 15 second clock expires, notifies user of timeout & pulls up associated image, timeout after 5 seconds 
    function ifTimeout() {
        unansweredTotal++;
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>" + countdown + "</p>" + "<p class='text-center answer-text'><span class='wrong-color'>Time's Up!</span> The correct answer was: </p>" + correctAnswerArray[questionCounter] + "<br><img class='images' src='assets/images/timesUp1.gif'>";
        $(".mainSection").html(gameScreen);
        setTimeout(wait, 5000);
    }

    //function to generate HTML from the question & answer arrays for each corresponding question
    function generateHTML() {
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>15</p><p class='text-center'>" + questionArray[questionCounter] + "<p><p class='answers'>A. " + answerArray[questionCounter][0] + "</p><p class='answers'>B. " + answerArray[questionCounter][1] + "</p><p class='answers'>C. " + answerArray[questionCounter][2] + "</p><p class='answers'>D. " + answerArray[questionCounter][3] + "</p>";
        $(".mainSection").html(gameScreen);
    }

    //function to determine if there are any questions left in the question array,  if so, on to the next question in array, then, generate the HTML, reset the countdown and invoke the timer function for the next question, if no questions left, invokes gameOverScreen() 
    function wait() {
        if (questionCounter < 7) {
            questionCounter++; 
            generateHTML();
                     
            countdown = 15;
            timer();
        }
        else {
            gameOverScreen();
        }
    }

    //function to display game over status, final quiz stats & creates a button to invoke the gameReset function
    function gameOverScreen() {
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>" + countdown + "</p>" + "<img class='images' src='assets/images/gameOverGif.gif'>" + "<p class='text-center results-title'>Here are your results:</p>" + "<p class='text-center results-total'> Correct Answers: " + correctTotal + "</p>" + "<p class='text-center results-total'>Incorrect Answers: " + incorrectTotal + "</p>" + "<p class='text-center results-total'>Questions Unanswered: " + unansweredTotal + "</p>" + "<button type='button' class='btn btn-success restart-button'>Restart Quiz</button>" + "<button type='button' class='btn btn-danger stop-button'>Stop Quiz</button>"; 
        $(".mainSection").html(gameScreen);
    }

    //function to start game over 
    function gameReset() {
        themeSong.currentTime = 0;
        themeSong.play();
        questionCounter = 0;
        correctTotal = 0;
        incorrectTotal = 0;
        unansweredTotal = 0;
        countdown = 15;
        generateHTML();
        timer();
    }
    

    
    
