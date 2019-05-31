$(function() {
  let renderTarget = $("#render-target");
  let landingPage = $(".landing-page").remove();
  let questionPage = $(".question-page").remove();
  let correctPage = $(".correct-page").remove();
  let incorrectPage = $(".incorrect-page").remove();
  let completePage = $(".complete-page").remove();

  function renderQuiz(el) {
    renderTarget.html(el);
  }

  renderQuiz(landingPage);

  $(landingPage)
    .find(".continue-form")
    .on("submit", function(event) {
      event.preventDefault();
      renderQuiz(questionPage);
    });

  function renderQuestion(index) {
    $(questionPage)
      .find(".answer-form")
      .on("submit", function(event) {
        event.preventDefault();
        let userAnswer = questionPage.find("input:checked").val();
        if (STORE[index].correctAnswer === Number(userAnswer)) {
          renderQuiz(correctPage);
        } else {
          renderQuiz(
            incorrectPage
            //   // .find(".correct-answer")
            //   // .html(
            //   //   "The correct answer is " +
            //   //     STORE[0].answers[STORE[0].correctAnswer]
            //   // )
          );
        }
      });

    $(correctPage).on("submit", nextQueryOrStop);
    $(incorrectPage).on("submit", nextQueryOrStop);
  }

  function nextQueryOrStop(event) {
    event.preventDefault();
    console.log("do stuff");
  }

  renderQuestion(0);
});
