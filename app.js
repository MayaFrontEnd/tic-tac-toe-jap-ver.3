const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startCells = ["", "", "", "", "", "", "", "", ""]
let go = "山"
infoDisplay.textContent = "山 のターンです"

function createBoard(){
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)
    })
    
}
createBoard()
function addGo(e){
    console.log("clicked" ,e.target)
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "山" ? "海" : "山"
    infoDisplay.textContent = "次は " + go + "のターンです"
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore(){
   const allSquares = document.querySelectorAll(".square") 
   const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
   ]

   winningCombos.forEach(array => {
    const circleWins = array.every(cell =>
         allSquares[cell].firstChild?.classList.contains("山"))
    if (circleWins) {
            infoDisplay.textContent = "【結論】：やっぱり山がいいよね !"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
           }
   })
   
   winningCombos.forEach(array => {
    const crossWins = array.every(cell =>
         allSquares[cell].firstChild?.classList.contains("海"))
    if (crossWins) {
            infoDisplay.textContent = "【結論】：やっぱり海が最高 !"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
           }
   })

}