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
let diem_nhanthuong=0;
let check_kho=0;
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
    check_kho=45;
    t_time=120;
    diem_nhanthuong=50;
    cd = "Dễ (120s)";
    break;
  case 2:
    t_time=90;
    check_kho=27;
    diem_nhanthuong=30;
    cd = "Vừa (90s)";
    break;
  case 3:
    diem_nhanthuong=15;
    check_kho=13;
    t_time=45;
    cd = "Khó (45s)";
    break;
  default:
    t_time=120;
    check_kho=45;
    diem_nhanthuong=50;
    cd = "Dễ (120s)";
    break;
}
document.getElementById("diem_nt").innerHTML = diem_nhanthuong;
localStorage.diem_nhanthuong = diem_nhanthuong;
document.getElementById("capdo").innerHTML = cd;
document.getElementById("acd").innerHTML = cd;
document.getElementById("kho").innerHTML = diem_nhanthuong-check_kho;
let ds = 0;
let time = t_time;
let run;
let fullTime = t_time;
let widthTime = 0;
//Random Value Generator 2 phép tính
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

let num1,num2, num3, randomOperator,randomOperator2="";
let max = (kl>3)?999:99;
function random_so(){
  randomOperator = operators[Math.floor(Math.random() * operators.length)];
  randomOperator2 = operators[Math.floor(Math.random() * operators.length)];
  if(randomOperator=="*" && randomOperator2=="*" ){
    
     randomOperator2 = operators[randomValue(1,2)];
  }
  
     [num1, num2,num3] = [randomValue(1, max_random), randomValue(1, max_random),randomValue(1, max_random)];
    console.log(num1 + randomOperator +num2+randomOperator2+num3)
   
      switch (randomOperator){
        case "-":
         if(num1<num2) {
            [num1, num2] = [num2, num1];
          }
          break;
        case "+":
          if(eval(`${num1}${randomOperator}${num2}`)>max_random){
            [num1, num2] = [randomValue(1, max_random/2), randomValue(1, max_random/2)];
          }
        break;
        case "*":
          if(num2>10){
             num2 =randomValue(1,10);
          } 
          if(num1>10){
            num1 =randomValue(1,10);
          }         
        break;
        default:
          break;
      }
      switch (randomOperator2){
        case "-":
         if(eval(`${num1}${randomOperator}${num2}`)<num3) {
           num3 = randomValue(1,eval(`${num1}${randomOperator}${num2}`));
          }
          break;
        case "+":
         if(eval(`${num1}${randomOperator}${num2}${randomOperator2}${num3}`)>max_random){
            num3 = randomValue(1,max_random-eval(`${num1}${randomOperator}${num2}`));
          }
        break;
        case "*":
          if(num3>10){
             num3 =randomValue(1,10);
          }
          if(num2>10) {
            num2 =randomValue(1,10);
          }   
          if(randomOperator=="-" && num1<eval(`${num1}${randomOperator}${num2}`)){
            console.log(num1 + randomOperator +num2+randomOperator2+num3);

            [num1,randomOperator,num2,randomOperator2,num3] = [num2,randomOperator2,num3,randomOperator,num1];
          } 
          if(randomOperator=="+"&& eval(`${num1}${randomOperator}${num2}${randomOperator2}${num3}`)>max_random ){
            num1= randomValue(1,max_random-eval(`${num1}${randomOperator}${num2}`));
          }  
        break;
        default:
          break;
      }
}
const questionGenerator = () => {

  //Two random values between 1 and 20
   [num1, num2] = [randomValue(1, max_random), randomValue(1, max_random)];

  //For getting random operator
   randomOperator = operators[Math.floor(Math.random() * operators.length)];
  if(randomOperator=="+" || operatorQuestion =="*"){
    if(num1==0 && num2==0){
      [num1, num2] = [randomValue(1, max_random), randomValue(1, max_random)];
    }else if(num1==2 && num2==2){
      [num1, num2] = [randomValue(1, max_random), randomValue(1, max_random)];
    }
  }
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
  //Enter to check ket qua
  document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        submitBtn.click();
    }
});
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
        
        da=true;
        let cachediem = localStorage.diemso;
        localStorage.diemso= parseInt(cachediem)+1;
        ds++;
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
const questionGenerator2 = () => {

  //Two random values between 1 and 20
  
        random_so()
  //Solve equation
  let solution = eval(`${num1}${randomOperator}${num2}${randomOperator2}${num3}`);
while(solution<0){random_so()};
  //For placing the input at random position
  //(1 for num1, 2 for num2, 3 for operator, anything else(4) for solution)
  let randomVar = randomValue(1, 7);

  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2}${randomOperator2} ${num3} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> ${randomOperator2} ${num3}= ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} ${randomOperator2} ${num3}= ${solution}`;
  } else if (randomVar == 4) {
    answerValue = randomOperator2;
    operatorQuestion = true;
    question.innerHTML = `${num1}  ${randomOperator} ${num2}<input type="text" id="inputValue" placeholder="?"\> ${num3}= ${solution}`;
  } else if (randomVar == 5) {
    answerValue = num3;
    question.innerHTML = `${num1}  ${randomOperator} ${num2} ${randomOperator2}<input type="text" id="inputValue" placeholder="?"\> = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} ${randomOperator2} ${num3} = <input type="number" id="inputValue" placeholder="?"\>`;
  }
  console.log("answer="+randomVar)
  console.log(num1 + randomOperator +num2+randomOperator2+num3+"="+solution)

  //Enter to check ket qua
  document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        submitBtn.click();
    }
});
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
        
        da=true;
        let cachediem = localStorage.diemso;
        localStorage.diemso= parseInt(cachediem)+1;
        ds++;
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

//check phan thuong
let checkpt = setInterval(function () {
  ds = localStorage.diemso;
  diemso.innerHTML=ds;
 var sopt = localStorage.sophanthuong;
 
 if(sopt>0){
  const txt_phanthuong = document.getElementById("phanthuong");
  var txt = localStorage.phanthuong1;
  for (let i = 1; i < sopt; i++) {
    var a = i+1;
    txt+=","+localStorage.getItem("phanthuong"+a);
  }
  txt_phanthuong.style.display ="block";
  txt_phanthuong.innerHTML = "Phần thưởng là: "+ txt;
 }
},100);

//Start Game
startBtn.addEventListener("click",func);
function func(){
  document.querySelectorAll('h4')[0].style.display="none";
  document.querySelectorAll('h4')[1].style.display="none";
    clearInterval(run);
  time = fullTime;
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  //Controls and buttons visibility
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  if(ds>check_kho){
    questionGenerator2();
  }else{
    questionGenerator();
  }
  
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
    result.innerHTML = resultText+ "</br>Điểm số của bạn hiện tại là: "+localStorage.diemso;
    clearInterval(run);
    startBtn.innerText = "Tiếp tục";
    controls.classList.remove("hide");
    startBtn.classList.remove("hide");
    let cachediem = localStorage.diemso;
    if(parseInt(cachediem)==diem_nhanthuong) { 
      localStorage.diemso=diem_nhanthuong;
      alert("Bạn đã đủ "+diem_nhanthuong+" điểm, bạn có thể đổi "+diem_nhanthuong+" điểm này thành 1 vòng quay may mắn. Bạn có 1phút để quay nhận thưởng và quay lại chơi game nhé.","Chúc mừng");
      
      popupWindow = window.open('vongquay/index.html', 'name', 'width=300,height=350');
      popupWindow.focus();
    }
    

  }else{
    let cachediem = localStorage.diemso;
    if(capdo==3){
      localStorage.diemso= parseInt(cachediem)-1;
      ds = ds-1;
    }else{
      localStorage.diemso= parseInt(cachediem)-2;
      ds = ds-2;
    }
    document.getElementById("wrong").play();
    result.innerHTML = resultText+ "</br>Trò chơi kết thúc với điểm số: "+ds;
    startBtn.innerText = "Chơi lại.";
    controls.classList.remove("hide");
    startBtn.classList.remove("hide");
    da=false
    //alert("Trò chơi kết thúc với điểm số: "+ds + ". Chơi lại?");
   
   
  }
  
 
};
