let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;
let diemso=document.getElementById("ds");
let ds = parseInt(diemso.innerHTML);
let time = 30;
let run;
    let fullTime = 30;
    let widthTime = 0;
  let da = true;
//Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
  //Two random values between 1 and 20
  let [num1, num2] = [randomValue(1, 999), randomValue(1, 999)];

  //For getting random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  while(randomOperator == "*" && (num2>10 || num1 >10)){
    [num1, num2] =[randomValue(1,10), randomValue(1, 10)];
  }
  while(randomOperator == "+" && (num2+num1) >=1000){
    [num1, num2] = [randomValue(1, 999), randomValue(1, 999)];
  }

  
        
  //Solve equation
  let solution = eval(`${num1}${randomOperator}${num2}`);

  //For placing the input at random position
  //(1 for num1, 2 for num2, 3 for operator, anything else(4) for solution)
  let randomVar = randomValue(1, 5);

  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }

  //User Input Check
  submitBtn.addEventListener("click", () => {
    errorMessage.classList.add("hide");
    let userInput = document.getElementById("inputValue").value;
    //If user input is not empty
    if (userInput) {
      //If the user guessed correct answer
      if (userInput == answerValue) {
        ds++; 
        da=true;
        stopGame(`Tuyệt!! <span>Đây là đáp án đúng</span>`);
      }
      //If user inputs operator other than +,-,*
      else if (operatorQuestion && !operators.includes(userInput)) {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = "Nhập phép toán + - * thôi";
      }
      //If user guessed wrong answer
      else {
        da=false;
        stopGame(`Ui!! <span>Sai rồi</span>`);
      }
    }
    //If user input is empty
    else {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Phải điền đáp án vào đã chứ";
    }
  });
};

//Start Game
startBtn.addEventListener("click",func);
function func(){
 
    clearInterval(run);
  diemso.innerHTML=ds;
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  //Controls and buttons visibility
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();
  time = fullTime;
  document.getElementById("inputValue").focus();
  countDown();

}
function countDown() {
  time = fullTime;
  let timeDiv = document.getElementById("thoigian");
  run = setInterval(function () {
      time-=0.1;
      timeDiv.innerHTML = parseInt(time);
      console.log("time="+ time+" va width="+ timeDiv);
      if(time <= 0){
          clearInterval(run);
          da=false;
          stopGame(`Ui!! <span>Quá thời gian rồi</span>`);;
      }
  },100);
}
//Stop Game
const stopGame = (resultText) => {
 
  
  if(da){
    document.getElementById("correct").play();
    result.innerHTML = resultText+ "</br>Điểm số của bạn hiện tại là: "+ds;
    var delayInMilliseconds = 1000; //1 second
    startBtn.innerText = "Tiếp tục";
    controls.classList.remove("hide");
    startBtn.classList.remove("hide");
    time = fullTime;
setTimeout(function() {
 
  func();
  //your code to be executed after 1 second
}, delayInMilliseconds);
  }else{
    document.getElementById("wrong").play();
    result.innerHTML = resultText+ "</br>Trò chơi kết thúc với điểm số: "+ds;
    startBtn.innerText = "Chơi lại.";
    controls.classList.remove("hide");
    startBtn.classList.remove("hide");
    da=false
    //alert("Trò chơi kết thúc với điểm số: "+ds + ". Chơi lại?");
    var delayInMilliseconds = 1500; //1 second
    setTimeout(function() {
 
      location.reload();
      //your code to be executed after 1 second
    }, delayInMilliseconds)
   
  }
  
 
};
