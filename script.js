//1. Set up my variables
//2. create calculator class to store numbers - put at the top of the doc.
//3. Define functions that calc can do (clear numbers, add, multiply etc)
//4. Now work on the variables above to make them operate in our calculator object 
//5. Create a calculator variable 
//6. To use, create numberButtons and update the functions (test while moving along)



//Calc class
class Calculator {
    //we need to know where to display our text element so add both previous & current
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    //adding functions for calc
    clear() {
        this.currentOperand = '' //default to empty string when cleared
        this.previousOperand = '' //defaulted to an empty string
        this.operation = undefined //no operations are selected if cleared 
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return //We are checking that js only adds 1 . and not continue adding multiple
      this.currentOperand = this.currentOperand.toString() + number.toString()  //we want to make sure that js adds the numbers properly (i.e 1+1=2 and not 1+1=11)
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  //1. Set up my variables
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  //2. create calculator class to store numbers - put at the top of the doc.
  //3. Define functions that calc can do (clear numbers, add, multiply etc)
  //4. Now work on the variables above to make them operate in our calculator object 
  //5. Create a calculator variable 
  //6. To use, create numberButtons

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {//add event listener for each button
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText) //we want to add the number of whatever is in that button
        calculator.updateDisplay() //once done,this function will update the display when we click on a button
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  