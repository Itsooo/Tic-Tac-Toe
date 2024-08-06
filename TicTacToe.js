let confirmButton = document.getElementById("confirmButton")
let gameTable = document.getElementById("gameTable")

let totalMoves = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
let moveCount = 0
let currentScreen = ""

let p1Symbol = "X"
let p2Symbol = "O"

function changeScreen(switchTo) {
    let gameWindows = document.getElementsByClassName("gameWindow")

    for (let window of gameWindows) {
        console.log(window, window.id)
        window.style.display =  switchTo == window.id ? "inherit" : "none"
    } 

    confirmButton.style.display = switchTo == "inGame" ? "none" : "inherit"

    currentScreen = switchTo
    switch (switchTo) {
        case "inGame":
            let gameButtons = document.getElementsByClassName("tic")
            for (let button of gameButtons) {
                button.innerHTML = ""
            }
            for (let y = 0; y < totalMoves.length; y++) {
                for (let x = 0; x < totalMoves[y].length; x++) {
                    totalMoves[y][x] = ""
                }
            }
            moveCount = 0

            document.querySelector("#line").style.display = "none";
        case "end":
            document.querySelector("#inGame").style.display =  "inherit"
            confirmButton.innerHTML = "Play Again?"
            break
    }
}

function getLine(x, y, direction) {
    let startSymbol = totalMoves[y][x]
    let startPos = [x, y]

    if (startSymbol == "") return false

    for (let i = 0; i < 2; i++) {
        startPos[0] += direction[0]
        startPos[1] += direction[1]

        if (startSymbol != totalMoves[startPos[1]][startPos[0]]) {
            return false;
        }
    }

    return startSymbol
}

const lineLookUp = [
    [0, 0, [1, 0]],
    [0, 1, [1, 0]],
    [0, 2, [1, 0]],
    [0, 0, [0, 1]],
    [1, 0, [0, 1]],
    [2, 0, [0, 1]],
    [0, 0, [1, 1]],
    [0, 2, [1, -1]],
]

function 

function calculateWinner() {
    for (lookData of lineLookUp) {
        let symbolFound = getLine(lookData[0], lookData[1], lookData[2])
        
        if (symbolFound) return [symbolFound, lookData];
    }

    return [moveCount == 9 ? "Draw" : false, false]
}

function drawLine(lookData) {
    let line = document.querySelector("#line")
console.log(lookData)
    // line.style.transform = `translate(${lookData[0] * 100}px, ${lookData[1] * 100}px)`
    line.style.display = "inherit"

    console.log(lookData)
    let x = lookData[2][0]
    let y = lookData[2][1]

    // TODO: switch case

    if (x == 0 && y == 1) {
        line.style.transform = `translate(${lookData[0] * 100 + 50}px, 0px) rotate(90deg)`
        line.style.width = 300 + "px"
        console.log(line.style.transform)
    } else if (x == 1 && y == 1) {
        line.style.transform = `translate(0px, 0px) rotate(45deg)`
        line.style.width = 300 * Math.sqrt(2) + "px"
    } else if (x == 1 && y == -1) {
        line.style.transform = `translate(0px, 300px) rotate(-45deg)`
        line.style.width = 300 * Math.sqrt(2) + "px"
    } else {
        line.style.transform = `translate(0px, ${lookData[1] * 100 + 50}px)`
        line.style.width = 300 + "px"
    }
}

function change(x, y, text) {
    if (totalMoves[y][x] || currentScreen == "end") return false;
    moveCount += 1

    totalMoves[y][x] = text
    gameTable.children[y].children[x].querySelector("button").innerHTML = text

    let [winner, lookData] = calculateWinner()
    console.log(winner + " won!")
    if (winner == p1Symbol) {
        drawLine(lookData)
        changeScreen("end")

        return false
    } else if (winner == p2Symbol) {
        drawLine(lookData)
        changeScreen("end")

        return false
    } else if (winner == "Draw") {
        changeScreen("end")
        return false
    }

    return true
}


function doMove() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (totalMoves[y][x] == "") {
                return change(x, y, p2Symbol)
            }
        }
    }
}

function handleInput(x, y) {
    if (change(x, y, p1Symbol)) {
        doMove()
    }
}

function init() {
    let whole = ""

    for (let y = 0; y < 3; y++) {
        whole += "<tr>\n"
        for (let x = 0; x < 3; x++) {
            whole += " <td><button class=\"tic\"></button></td>\n"
        }
        whole += "</tr>\n"
    }

    gameTable.innerHTML = whole

    let y = 0;
    for (let tr of gameTable.children) {
        let x = 0;
        for (let td of tr.children) {
            let button = td.querySelector("button");
            
            const buttonX = x;
            const buttonY = y
            button.addEventListener("click", () => {
                handleInput(buttonX, buttonY)
            });
            
             x++
        }

        y++
    }
    
}

init()

function confirm() {
    changeScreen("inGame")
}

confirmButton.onclick = confirm