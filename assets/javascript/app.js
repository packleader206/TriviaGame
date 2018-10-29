//Javascript for Trivia Game

$(document).ready(function() {

    
    function startScreenSetup() {
        startScreen = "<button type='button' class='btn btn-success start-button'>Click to Start!</button>";
        $(".mainSection").html(startScreen);
    }
    
    startScreenSetup();
    
    $("body").on("click", ".start-button", function(event) {
        //event.preventDefault();
        themeSong.play();
        generateHTML();
        timer();  
    });

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

    $("body").on("click", ".restart-button", function(event) {
        gameReset();
    });

});

    function ifCorrect() {
        correctTotal++;
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>" + countdown + "</p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswerArray[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainSection").html(gameScreen);
        setTimeout(wait, 3000);
    }
    
    function ifIncorrect() {
        incorrectTotal++;
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>" + countdown + "</p>" + "<img src='../images/wrongAnswerGif.gif'>" + "<p class='text-center'>The correct answer is: </p>" + correctAnswerArray[questionCounter];
        $(".mainSection").html(gameScreen);
        setTimeout(wait, 3000);
    }
    
    function ifTimeout() {
        incorrectTotal++;
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>" + countdown + "</p>" + "<img src='../images/timesUpGif.gif'>" + "<p class='text-center'>Time's Up! The correct answer was: </p>" + correctAnswerArray[questionCounter];
        $(".mainSection").html(gameScreen);
        setTimeout(wait, 3000);
    }

    function generateHTML() {
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>15</p><p class='text-center'>" + questionArray[questionCounter] + "<p><p class='answers'>A. " + answerArray[questionCounter][0] + "</p><p class='answers'>B. " + answerArray[questionCounter][1] + "</p><p class='answers'>C. " + answerArray[questionCounter][2] + "</p><p class='answers'>D. " + answerArray[questionCounter][3] + "</p>";
        $(".mainSection").html(gameScreen);
    }

    function wait() {
        if (questionCounter < 8) {
            questionCounter++;
            generateHTML();
            counter = 15;
            timer();
        }
        else {
            gameOverScreen();
        }
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

    function gameOverScreen() {
        gameScreen = "<p class='text-center timerTitle'>Time Remaining: </p><p class='timerSpot'>" + countdown + "</p>" + "<img src='../images/gameOverGif.gif'>" + "<p class='text-center'>Here are your results:</p>" + "<p class='text-center'> Correct Answers: " + correctTotal + "</p>" + "<p class='text-center'>Incorrect Answers: " + incorrectTotal + "</p>" + "<p class='text-center'>Questions Unanswered: " + unansweredTotal + "</p>" + "<p><button type='button' class='btn btn-success restart-button'>Restart the Quiz!</button></p>"; 
        $(".mainSection").html(gameScreen);
    }

    function gameReset() {
        questionCounter = 0;
        correctTotal = 0;
        incorrectTotal = 0;
        unansweredTotal = 0;
        countdown = 15;
        generateHTML();
        timer();
    }
    
    var questionArray = ["Who defeated Prince Oberyn in hand to hand combat?", "Who is the second eldest son belonging to the House of Tarly?", "What is the name of John Snow's Direwolf?", "What nickname was given to Theon Greyjoy by his buddy Ramsay?", "What is The Hound's real name in the show?", "What is the surname given to bastards born in Dorne?", "Who is referred to as 'The King Beyond the Wall'?", "Who delivered the fatal blow that ultimately killed Rob Stark at his wedding?"];
    var answerArray = [["Arya Stark", "The Hound", "Tywin Lannister", "The Mountain"], ["Randall", "Rickon", "Dickon", "Samwell"], ["Ghost", "Grey Wind", "Nymeria", "Shaggy Dog"], ["Reek", "Tigger", "Master Blaster", "Stubby"], ["Jeor Mormont", "Gregor Clegane", "Sandor Clegane", "Renly Baratheon"], ["Sand", "Snow", "Stone", "Wind"], ["The Night King", "Mance Raider", "Benjen Stark", "Rhaegar Targaryan"], ["Walder Frey", "Ramsay Bolton", "Roose Bolton", "Theon Greyjoy"]];
    var correctAnswerArray = ["D. The Mountain", "C. Dickon", "A. Ghost", "A. Reek", "C. Sandor Clegane", "A. Sand", "B. Mance Rayder", "C. Roose Bolton"];
    var imageArray = ["<img class='center-block img-right' src='../images/Q1gif.gif'>", "<img class = 'center-block img-right' src='../images/Q2gif.gif'>", "<img class='center-block img-right' src='../images/Q3gif.gif'>", "<img class='center-block img-right' src='../images/Q4gif.gif'>", "<img class='center-block img-right' src='../images/Q5jpg.jpg'>", "<img class='center-block img-right' src='../images/Q6png.png'>", "<img class='center-block img-right' src='../images/Q7jpg.jpg'>", "<img class='center-block img-right' src='../images/Q8jpg.jpg'>"];
    
    var correctTotal = 0;
    var incorrectTotal = 0;
    var unansweredTotal = 0;
    var countdown = 15;
    var questionCounter = 0;
    
    var clock;
    var startScreen;
    var gameScreen;
    var userSelection;
    
    var themeSong = new Audio("assets/sound/themeSong.mp3");
