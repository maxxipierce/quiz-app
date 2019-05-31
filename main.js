

function genLandingPage() {
  return `<div class="landing-page">
<h2 class="text-el minecraft-font">How Much Do You Really <br>Know About Minecraft?</h2>
<form class="continue-form">
  <button type="submit" class="continue-button font-family: 'Notable', sans-serif;">START!</button>
</form>
</div>`
}

function genQuestionPage(index, score) {
  return `<section class="container">
  <header>
    <h2 class="question minecraft-font ">${STORE[index].question}</h2>
  </header>
  <form class="answer-form">
    <ul class="answer-options">
      <li>
        <label>
          <input type="radio" value="0" name="answer" required> ${STORE[index].answers[0]}
        </label>
      </li>
      <li>
        <label>
          <input type="radio" value="1" name="answer" required> ${STORE[index].answers[1]}
        </label>
      </li>
      <li>
        <label>
          <input type="radio" value="2" name="answer" required> ${STORE[index].answers[2]}
        </label>
      </li>
      <li>
        <label>
          <input type="radio" value="3" name="answer" required> ${STORE[index].answers[3]}
        </label>
      </li>
    </ul>
    <button type="submit" class="submit-button">Submit</button>
  </form>
</section>

<footer>
<div class="container">
  <div class="footer-wrapper">
    <div class="q-total bulky-font">
      <p>Question: ${index + 1}/10</p>
    </div>
    <div class="score-total bulky-font">
      <p>Score: ${score}</p>
    </div>
  </div>
</div>
</footer>
</div>`;
}

function genIncorrectPage(actual) {
  return `<div class="incorrect-page">
      <form class="continue-form continue">
        <div class="center">
          <h3 class="in-correct-text minecraft-font">Incorrect!</h3>
          <p class="correct-answer">The Correct Answer Is: ${actual}</p>
          <button type="submit" class="continue-button">Continue</button>
        </div>
      </form>
    </div>`
}

function genCorrectPage() {
  return ` <div class="correct-page">
  <form class="continue-form continue">
    <div class="center">
      <h3 class="in-correct-text minecraft-font">Correct!</h3>
      <button type="submit" class="continue-button">Continue</button>
    </div>
  </form>
</div>`
}

function genCompletePage(score) {
  return `<div class="complete-page">
  <form class="continue-form">
    <div class="center">
      <h3 class="score-complete">Score: ${score}/10</h3>
      <button type="submit" class="continue-button">Try Again?</button>
    </div>
  </form>
</div>
</div>`
}

function render(html) {
  $('#render-target').html(html);
}

function renderLandingPage() {
  let html = $(genLandingPage());
  html.find(".continue-form").on("submit", function (event) {
    event.preventDefault();
    renderQuestionPage(0, 0);
  })
  render(html);
}

function renderQuestionPage(index, score) {
  if (index >= STORE.length) {
    // if (index >= 2) {
    renderCompletePage(score);
    return
  }
  let html = $(genQuestionPage(index, score))
  html.find(".answer-form").on("submit", function (event) {
    event.preventDefault();
    let userAnswer = $(this).find("input:checked").val();
    console.log(userAnswer)
    if (STORE[index].correctAnswer === Number(userAnswer)) {
      renderQuestionPage(index + 1, score + 1);
    } else {
      renderIncorrectPage(index + 1, STORE[index].answers[STORE[index].correctAnswer], score);
    }
  })
  render(html);
}

function renderIncorrectPage(index, actual, score) {
  let html = $(genIncorrectPage(actual))
  html.find(".continue-form").on("submit", function (event) {
    event.preventDefault();
    renderQuestionPage(index, score);
  })
  render(html);
}

// function renderCorrectPage(index, score) {
//   let html = $(genCorrectPage())
//   html.find(".continue-form").on("submit", function (event) {
//     event.preventDefault();
//     renderQuestionPage(index, score);
//   })
//   render(html);
// }

function renderCompletePage(score) {
  let html = $(genCompletePage(score))
  render(html);
}

$(renderLandingPage());
