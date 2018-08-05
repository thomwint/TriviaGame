// Variables
$(document).ready(function() {
  let questionCount = 0;
  let time = 30;
  let countdown;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  // Questions
  const question = [
    "In the Harry Potter series, what is the name of Harry Potters pet owl?",
    "Which of these are not one of the four houses at Hogwarts School of Witchcraft and Wizardry?",
    "Who was the half-blood prince?",
    "What is the symbol for Gryffindor house?"
  ];
  //Answers
  const answer = ["Hedwig", "Dumbledore", "Severus Snape", "A Lion"];
  //Choices
  const firstChoice = ["Hedwig", "Gryffindor", "Moaning Myrtle", "A Badger"];
  const secondChoice = ["Grindelwald", "Slytherin", "Lily Potter", "An Eagle"];
  const thirdChoice = ["Salazar", "Dumbledore", "Severus Snape", "A Lion"];
  const fourthChoice = ["Morfin", "Ravenclaw", "The Fat Lady", "A Snake"];

  //Start Game
  function startGame() {
    $(".start").hide();
    startTime();
    displayQuestion();
  }
  $(".start").on("click", function() {
    startGame();
  });

  //Display the questions based on which question count they are on
  function displayQuestion() {
    hideResults();
    $("#answer").hide();
    $("#time").show();
    showDiv();
    $("#question").html(question[questionCount]);
    $("#choice1").html(firstChoice[questionCount]);
    $("#choice2").html(secondChoice[questionCount]);
    $("#choice3").html(thirdChoice[questionCount]);
    $("#choice4").html(fourthChoice[questionCount]);
  }

  // Display the Timer
  function displayTime() {
    time--;
    $("#time").html("Time remaining: " + time);

    if (time <= 0) {
      hideDiv();
      stopTime();
      $("#answer").show();
      $("#answer").html("Time is up! The answer is: " + answer[questionCount]);
      unanswered++;
      questionCount++;
      endGame();
    }
  }

  //Start the timer
  function startTime() {
    clearInterval(countdown);
    countdown = setInterval(displayTime, 1000);
  }
  //Stop the timer
  function stopTime() {
    clearInterval(countdown);
    resetTime();
    if (questionCount < question.length - 1) {
      setTimeout(startTime, 1000);
      setTimeout(displayQuestion, 2000);
    }
  }

  //Reset timer
  function resetTime() {
    time = 30;
  }

  //Take in users clicked answer and checks it
  $("#choice1").on("click", checkAnswer);
  $("#choice2").on("click", checkAnswer);
  $("#choice3").on("click", checkAnswer);
  $("#choice4").on("click", checkAnswer);

  //Check the answer
  function checkAnswer() {
    hideDiv();
    if ($(this).text() === answer[questionCount]) {
      stopTime();
      $("#answer").show();
      $("#answer").html("Right! The answer is: " + answer[questionCount]);
      correct++;
      questionCount++;
    } else {
      stopTime();
      $("#answer").show();
      $("#answer").html("Wrong! The answer is: " + answer[questionCount]);
      incorrect++;
      questionCount++;
    }
    endGame();
  }

  //End Game
  function endGame() {
    if (questionCount === question.length) {
      $("#time").hide();
      showResults();
      questionCount = 0;
      $(".start").show();
      $(".start").on("click", function() {
        resetResults();
        startGame();
      });
    }
  }

  //Show HTML Divs
  function showDiv() {
    $("#question").show();
    $("#choice1").show();
    $("#choice2").show();
    $("#choice3").show();
    $("#choice4").show();
  }
  //Hide HTML Divs
  function hideDiv() {
    $("#question").hide();
    $("#choice1").hide();
    $("#choice2").hide();
    $("#choice3").hide();
    $("#choice4").hide();
  }
  //Hide results
  function hideResults() {
    $("#correct").hide();
    $("#incorrect").hide();
    $("#unanswered").hide();
    $("#end").hide();
  }

  resetTime();

  //Show Results
  function showResults() {
    $("#correct").show();
    $("#correct").html("Correct: " + correct);
    $("#incorrect").show();
    $("#incorrect").html("Incorrect: " + incorrect);
    $("#unanswered").show();
    $("#unanswered").html("Unanswered: " + unanswered);
    $("#end").show();
    $("#end").html("Click the Start button to play again!");
  }

  //Reset Results
  function resetResults() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
  }
});
