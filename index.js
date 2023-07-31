const btn = document.querySelector("#btn");
const typing_ground = document.querySelector("#textarea");
const show_sentence = document.querySelector("#showSentence");
let startTime, endTime, totalTimeTaken, sentence_to_write;
const score = document.querySelector("#score");
const show_time = document.querySelector("#show-time");

// The array of Random sentence we generate during typing test
const sentencesArr = [
  "The quick brown fox jumps over the lazy dog 1",
  "The quick brown fox jumps over the lazy dog 2",
  "The quick brown fox jumps over the lazy dog 3",
  "The quick brown fox jumps over the lazy dog 4",
  "The quick brown fox jumps over the lazy dog 5",
  "The quick brown fox jumps over the lazy dog 6",
];

// errorChecking Function
const errorChecking = (Words) => {
  let num = 0;
  sentence_to_write = show_sentence.innerHTML;
  sentence_to_write = sentence_to_write.trim().split(" ");

  for (let i = 0; i < Words.length; i++) {
    if (Words[i] === sentence_to_write[i]) {
      num++;
    }
  }
  return num;
};

// Speed Calculation
const calculateTypingSpeed = (Time_Taken) => {
  let totalWords = typing_ground.value.trim();
  let actualWords = totalWords === "" ? 0 : totalWords.split(" ");
  actualWords = errorChecking(actualWords);
  if (actualWords !== 0) {
    let typing_speed = (actualWords / Time_Taken) * 60;
    typing_speed = Math.round(typing_speed);
    score.innerHTML = `Your typing speed is ${typing_speed} words per minutes & you wrote ${actualWords} correct words out of ${sentence_to_write.length} & time taken ${Time_Taken} sec`;
  } else {
    score.innerHTML = `Your typing speed is 0 words per minutes & time taken ${Time_Taken} sec`;
  }
};

// calculate Total Time Taken
const endTypingTest = () => {
  btn.innerText = "Start";
  showTimer();

  let date = new Date();
  endTime = date.getTime();

  totalTimeTaken = (endTime - startTime) / 1000; //divide by 1000 to convert ms to sec.

  calculateTypingSpeed(Math.round(totalTimeTaken));

  show_sentence.innerHTML = "";
  typing_ground.value = "";
};

// Showing remaining Time
let intervalID, elapsedTime;

const showTimer = () => {
  elapsedTime = 20;
  if (btn.innerText === "Done") {
    intervalID = setInterval(() => {
      elapsedTime--;
      show_time.innerHTML = elapsedTime;
      if (elapsedTime === 0) {
        document.getElementById("btn").click();
      }
    }, 1000);
  } else if (btn.innerText === "Start") {
    elapsedTime = 0;
    clearInterval(intervalID);
    show_time.innerHTML = "";
  }
};

//  Picking up a sentence from pool of sentence
const startTyping = () => {
  let randomNumber = Math.floor(Math.random() * sentencesArr.length);
  show_sentence.innerHTML = sentencesArr[randomNumber];

  let date = new Date();
  startTime = date.getTime();

  btn.innerText = "Done";
  showTimer();
  score.innerHTML = "";
};

//  addEventListener to start the typing test
btn.addEventListener("click", () => {
  switch (btn.innerText.toLowerCase()) {
    case "start":
      typing_ground.removeAttribute("disabled");
      startTyping();
      break;

    case "done":
      typing_ground.setAttribute("disabled", "true");
      endTypingTest();
      break;
  }
});
