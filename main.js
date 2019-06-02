

function genLandingPage() {
  return `
    <div class="container">
      <div class="container-inside">
        <h2 class="subheader">How Much Do You Really <br>Know About Minecraft?</h2>
        <form class="continue-form">
          <button type="submit" class="continue-button">START!</button>
        </form>
      </div>
    </div>`
}

function genQuestionPage(index, score) {
  return `
  <section class="question-page">
    <div class="container">
      <div class="container-inside">
        <header>
          <h2 class="question">${STORE[index].question}</h2>
          <hr>
        </header>

        <form class="answer-form">
          <div class="answer-container">
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
          </div>
          <button type="submit" class="submit-button">Submit</button>
        </form>


        <footer>
          <div class="footer-wrapper">
            <div class="q-total bulky-font">
              <p>Question: ${index + 1}/10</p>
            </div>
            <div class="score-total bulky-font">
              <p>Score: ${score}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </section>`;
}

function genIncorrectPage(index, actual, score) {
  return `
  <section class="incorrect-page">
    <div class="container">
      <div class="container-inside">
        <form class="continue-form">
          <h3 class="incorrect-text">Incorrect!</h3>
          <hr>
          <p class="correct-answer">The Correct Answer Is: ${actual}</p>
          <button type="submit" class="continue-button push">Continue</button>
        </form>
        <footer>
        <div class="footer-wrapper">
          <div class="q-total bulky-font">
            <p>Question: ${index + 1}/10</p>
          </div>
          <div class="score-total bulky-font">
            <p>Score: ${score}</p>
          </div>
        </div>
      </footer>
      </div>
    </div>

  </section>`
}

// function genCorrectPage() {
//   return `
//   <div class="correct-page">
//     <form class="continue-form continue">
//       <div class="center">
//         <h3 class="in-correct-text">Correct!</h3>
//         <button type="submit" class="continue-button">Continue</button>
//       </div>
//     </form>
//   </div>`
// }

function genCompletePage(score) {
  return `
  <div class="complete-page">
    <form class="continue-form">
        <h3 class="score-complete">Score: ${score}/10</h3>
        <button type="submit" class="continue-button">Try Again?</button>
    </form>
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
  let html = $(genIncorrectPage(index, actual, score))
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
