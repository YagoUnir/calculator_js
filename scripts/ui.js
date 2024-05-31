import Calculator from './calculator';

// ============ Constants ============
const CALCULATOR = new Calculator()
const PREVIOUS = "previous"
const RESULT = "result"


// ============ Variables ============
let operation = []
let availableOperations = '='
let previousDisplay = document.getElementById(PREVIOUS)
let resultDisplay = document.getElementById(RESULT)


// ============ Functions ============
function setBasicOperationsListener() {
    document.getElementById("=").addEventListener("click", () => {
        let result = previousDisplay.value
        if (!Array.from(result).some((letter) => letter === '=')) {
            operation.push(resultDisplay.value)
            let num1 = parseFloat(operation[0])
            let operationSymbol = operation[1]
            let num2 = parseFloat(operation[2])
            let result;
            switch (operationSymbol) {
                case "+":
                    result = CALCULATOR.aggregation(num1, num2)
                    previousDisplay.value = num1 + '+' + num2 + " ="
                    resultDisplay.value = result
                    operation = [result]
                    break
                case "-":
                    result = CALCULATOR.subtraction(num1, num2)
                    previousDisplay.value = num1 + '-' + num2 + " ="
                    resultDisplay.value = result
                    operation = [result]
                    break
                case "*":
                    result = CALCULATOR.multiplication(num1, num2)
                    previousDisplay.value = num1 + '*' + num2 + " ="
                    resultDisplay.value = result
                    operation = [result]
                    break
                case "/":
                    result = CALCULATOR.division(num1, num2)
                   previousDisplay.value = num1 + '/' + num2 + " ="
                    resultDisplay.value = result
                    operation = [result]
                    break
            }
        }
    })

}

function setRemoveListener() {
    document.getElementById("⌫").addEventListener("click", () => {
        let result = resultDisplay.value
        if (result.length === 1) {
            resultDisplay.value = 0
        } else {
            resultDisplay.value = result.slice(0, result.length - 1)
        }
    })
}

function setClearListener() {
    document.getElementById("clear").addEventListener("click", () => {
       previousDisplay.value = ''
        resultDisplay.value = '0'
        operation = []
    })
}



function setOperationListeners() {
    Array.from(document.getElementsByClassName("operation")).forEach((element) => {

        element.addEventListener("click", (e) => {

                if (!operation[0]) {
                    operation.push(resultDisplay.value)
                }

                let num1 = parseFloat(operation[0])
                let result
                switch (e.target.id) {
                    case "√":
                        result = CALCULATOR.squareRoot(num1)
                       previousDisplay.value = "√" + num1 + " ="
                        resultDisplay.value = result
                        operation = [result]
                        break

                    case "e":
                        result = CALCULATOR.exponential(num1)
                       previousDisplay.value = "e^" + num1 + " ="
                        resultDisplay.value = result
                        operation = [result]
                        break

                    default:
                        replaceResultField(e)
                        break
                }

            }
        )
    })
}

function replaceResultField(e) {
   previousDisplay.value = parseFloat(operation[0]) + e.target.id
    resultDisplay.value = 0
    operation.push(e.target.id)
}

function setChangeSymbolListener() {
    document.getElementById("+/-").addEventListener("click", () => {
        removePrevious()

        let result = resultDisplay.value

        if (result.charAt(0) !== '-') {
            resultDisplay.value = '-' + result
        } else {
            resultDisplay.value = result.slice(1, result.length)
        }
    })

}

function setNumbersListeners() {
    Array.from(document.getElementsByClassName("number")).forEach((element) => {
        element.addEventListener("click", (e) => {
            removePrevious()

            let temp = resultDisplay.value

            if ((temp === '0' || temp === '-0') && e.target.id !== '.') {
                resultDisplay.value = temp.replaceAll('0', e.target.id)
            } else {
                resultDisplay.value += e.target.id
            }
        })
    })
}

function removePrevious() {
    let result = previousDisplay.value
    if (Array.from(result).some((letter) => Array.from(availableOperations).some((symbol) => symbol === letter))) {
       previousDisplay.value = ''
        operation = []
        resultDisplay.value = '0'
    }
}

// ============ Listeners ============
setBasicOperationsListener()
setOperationListeners()
setRemoveListener()
setChangeSymbolListener()
setClearListener()
setNumbersListeners()
