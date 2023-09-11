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
let fname = localStorage.name;
let khoilop = localStorage.khoilop;
let capdo = localStorage.capdo;
let t_time=0;
let da = true;
let check1=true;
let kl = 0;
let max_random=0;
const ten = document.getElementById("fname");
ten.innerHTML = fname;
document.getElementById("aname").innerHTML=fname;
switch (parseInt(khoilop)){
  case 1:
    kl=2;
    max_random = 9;
    break;
  case 2:
   kl=3;
   max_random = 99;
    break;
  case 3:
    max_random = 999;
    kl=4;
    break;
  default:
    max_random = 9;
    kl=2;
    break;
}
document.getElementById("khoilop").innerHTML = kl;
document.getElementById("akl").innerHTML = kl;
let cd = "";
switch (parseInt(capdo)){
  case 1:
    t_time=90;
    cd = "Dễ (90s)";
    break;
  case 2:
    t_time=60;
    cd = "Vừa (60s)";
    break;
  case 3:
    t_time=30;
    cd = "Khó (30s)";
    break;
  default:
    t_time=90;
    cd = "Dễ (90s)";
    break;
}
document.getElementById("capdo").innerHTML = cd;
document.getElementById("acd").innerHTML = cd;
let ds = 0;
let time = t_time;
let run;
let fullTime = t_time;
let widthTime = 0;
//Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {

  //Two random values between 1 and 20
  let [num1, num2] = [randomValue(1, max_random), randomValue(1, max_random)];

  //For getting random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  if(khoilop<3){
    while(randomOperator == "*" && (num2>10 || num1 >10)){
      [num1, num2] =[randomValue(1,10), randomValue(1, 10)];
    }
  }else{
    while(randomOperator == "*" && (num2>10 && num1 >10)){
      [num1, num2] =[randomValue(1,10), randomValue(1, 10)];
    }
  }
  while(randomOperator == "+" && (num2+num1) >=100){
    [num1, num2] = [randomValue(1, max_random), randomValue(1, max_random)];
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
    if(!check1) return;
     errorMessage.classList.add("hide");
    console.log("lda"+ds)
    let userInput = document.getElementById("inputValue").value;
    //If user input is not empty
    if (userInput) {
      //If the user guessed correct answer
      if (userInput == answerValue) {
        console.log("la"+ds)
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
  document.querySelectorAll('h4')[0].style.display="none";
  document.querySelectorAll('h4')[1].style.display="none";
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
  check1=true;
  document.getElementById("inputValue").focus();
  countDown();

}
function countDown() {
  time = fullTime;
  let timeDiv = document.getElementById("thoigian");
  run = setInterval(function () {
      time-=0.1;
      timeDiv.innerHTML = parseInt(time);
      //console.log("time="+ time+" va width="+ timeDiv);
      if(time <= 0){
          clearInterval(run);
          da=false;
          stopGame(`Ui!! <span>Quá thời gian rồi</span>`);;
      }
  },100);
}
//Stop Game
const stopGame = (resultText) => {
 check1 = false;
  
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
