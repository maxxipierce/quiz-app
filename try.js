$(function () {
  let renderTarget = $("#render-target");
  let landingPage = $(".landing-page").remove();
  let questionPage = $(".question-page").remove();
  let correctPage = $(".correct-page").remove();
  let incorrectPage = $(".incorrect-page").remove();
  let completePage = $(".complete-page").remove();

  function renderQuiz(el) {
    renderTarget.html(el);
  }


  function renderQuestionPage() {
    $(landingPage).find(".continue-form").on("submit", function (event) {
      event.preventDefault();
      renderQuiz(questionPage);
    });
  }

  function renderQuestion() {
    currentQuestion = 0;
    $(questionPage).find('.question').html(STORE[currentQuestion].question)
    for (let i = 0; i < STORE.length; i++) {

    }
  }

  function renderAnswers() {
    currentAnswers = 0;
    $(questionPage).find('.answers').html(STORE[currentAnswers].answers)
  }

  function answerCheck(index) {
    $(questionPage).find(".answer-form").on("submit", function (event) {
      event.preventDefault();
      let userAnswer = questionPage.find("input:checked").val();
      if (STORE[index].correctAnswer === Number(userAnswer)) {
        renderQuiz(correctPage)
      } else {
        renderQuiz(incorrectPage)
        $(incorrectPage).find(".correct-answer").html("The Correct Answer Is: " + STORE[0].answers[STORE[0].correctAnswer])
      }
    });
    $(correctPage).on("submit", nextQ);
    $(incorrectPage).on("submit", nextQ);
  }

  function nextQ() {
    renderQuestionPage();
    renderQuestion();
  }

  function render() {
    renderQuiz(landingPage);
    renderQuestionPage();
    renderQuestion();
    renderAnswers();
    answerCheck(0)
  }
  render();

});
