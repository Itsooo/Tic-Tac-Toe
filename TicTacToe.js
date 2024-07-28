let confirmButton = document.getElementById("confirmButton")
let gameTable = document.getElementById("gameTable")

let totalMoves = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

function changeScreen(switchTo) {
    let gameWindows = document.getElementsByClassName("gameWindow")

    for (let window of gameWindows) {
        console.log(window, window.id)
        window.style.display =  switchTo == window.id ? "inherit" : "none"
    } 

    confirmButton.style.display = switchTo == "inGame" ? "none" : "inherit"
    if (switchTo == "end") {
        // let gameButtons = document.getElementsByClassName("tic")
        // for (let button of gameButtons) {
        //     button.innerHTML = ""
        // }
        // for (let y = 0; totalMoves.length; y++) {
        //     for (let x = 0; totalMoves[y].length; x++) {
        //         totalMoves[y][x] = ""
        //     }
        // }

        document.querySelector("#inGame").style.display =  "inherit"
        confirmButton.innerHTML = "Play Again?"
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

function calculateWinnder() {
    for (lookData of lineLookUp) {
        let symbolFound = getLine(lookData[0], lookData[1], lookData[2])
        
        if (symbolFound) return [symbolFound, lookData];
    }

    return [false, false]
}

function drawLine(lookData) {
    let line = document.querySelector("#line")
console.log(lookData)
    // line.style.transform = `translate(${lookData[0] * 100}px, ${lookData[1] * 100}px)`
    line.style.top = lookData[1] * 100 + "px"
    line.style.left = lookData[0] * 100 + "px"
    line.style.display = "inherit"

    console.log(lookData)
    let x = lookData[2][0]
    let y = lookData[2][1]

    if (x == 0 && y == 1) {
        console.log("bruh")
        line.style.transform = ' rotate("90deg")'
    } else if (x == 1 && y == 1) {
        line.style.transform = ' rotate("45deg")'
    } else if (x == 1 && y == -1) {
        line.style.transform = ' rotate("-45deg")'
    }
}

function change(x, y, text) {
    totalMoves[y][x] = text
    gameTable.children[y].children[x].querySelector("button").innerHTML = text

    let [winner, lookData] = calculateWinnder()
    console.log(winner + " won!")
    if (winner == p1Symbol) {
        drawLine(lookData)
        changeScreen("end")
    } else if (winner == p2Symbol) {
        drawLine(lookData)
        changeScreen("end")
    }
}

let p1Symbol = "X"
let p2Symbol = "O"

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
    change(x, y, p1Symbol)
    doMove()
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