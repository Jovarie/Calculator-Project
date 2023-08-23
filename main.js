const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const backspaceEl = document.querySelector(".backspace");
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num;
    // console.log();
  });
});

operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    
    // Add the "%" operation handling
    if (operationName === '%') {
      result = result / 100; // Calculate the percentage
      dis2Num = result.toString(); // Update display
      display2El.innerText = dis2Num;
      lastOperation = ""; // Reset lastOperation
      return; // Exit the function
    }

    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
  tempResultEl.innerText = result;
}
//operator logic
function mathOperation(){
    if( lastOperation === 'x') {
      result = parseFloat (result) * parseFloat(dis2Num);
    } else if ( lastOperation === '+') {
      result = parseFloat(result) + parseFloat(dis2Num);
    } else if ( lastOperation === '-') {
      result = parseFloat(result) - parseFloat(dis2Num);
    } else if ( lastOperation === '/') {
      result = parseFloat(result) / parseFloat(dis2Num);
    } else if ( lastOperation === '%') {
      result = parseFloat(result) % parseFloat(dis2Num);
    }
}

//equals button
equalEl.addEventListener('click', (e)=> {
  if (dis1Num || dis2Num) result;
  haveDot =false;
  mathOperation()
  clearVar();
  //display results
  display2El.innerText = result;
  tempResultEl.innerHTML = '';
  dis2Num = result;
  dis1Num = '';
})

//clear All button

clearAllEl.addEventListener('click', (e) => {
  display1El.innerText = '0';
  display2El.innerText = '0';
  dis1Num = '';
  dis2Num = '';
  result = '';
  tempResultEl.innerHTML = '0';
})
//clear last entity button
backspaceEl.addEventListener('click', (e) => {
  display2El.innerText = '';
  dis2Num = '';
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    e.preventDefault(); // Prevent the default browser behavior (navigating back)
    backspaceEl.click();
  }
  
  if (
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.' 
  ){
    clickButtonE1(e.key);
  } else if (
    e.key === '/' ||
    e.key === '-' ||
    e.key === '+' ||
    e.key === '%' ||
    e.key === '=' ||
    e.key === 'x'
  ){
    clickOperation(e.key);
  }
})

function clickButtonE1(key) {
  numbersEl.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  })
}

function clickOperation(key) {
  operationEl.forEach(button => {
    if(button.innerText === key){
      button.click();
    }
  })
}

const changeSignEl = document.querySelector(".change-sign");

//change sign button
changeSignEl.addEventListener("click", () => {
  if (dis2Num !== "") {
    dis2Num = (-parseFloat(dis2Num)).toString();
    display2El.innerText = dis2Num;
  }
});
