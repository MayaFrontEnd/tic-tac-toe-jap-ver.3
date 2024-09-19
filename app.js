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
    infoDisplay.textContent = "次は " + go + " のターンです"

   if (go === "海"){          //if go is 海...
    document.body.style.backgroundImage="url(img/sea.jpg)";  //change background image to "sea"
   } else {                //if not...
    document.body.style.backgroundImage="url(img/mountain.jpg)"; // specify the image path here                   // 
   }                 
   
    e.target.removeEventListener("click", addGo)
    checkScore()
}



/*
if go === 山 {
return console.log(go)}*/

function checkScore(){
   const allSquares = document.querySelectorAll(".square") 
   const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
   ]

   let isGameOver = false;

   winningCombos.forEach(array => {
    const circleWins = array.every(cell =>
         allSquares[cell].firstChild?.classList.contains("山"))
    if (circleWins) {
        infoDisplay.textContent = "【結論】：「山」の勝ち！ やっぱり山がいいですよね !"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        isGameOver = true;
        document.body.style.backgroundImage="url(img/mountain.jpg)";  //change background image to "mountain"
           }
   })
   
   winningCombos.forEach(array => {
    const crossWins = array.every(cell =>
         allSquares[cell].firstChild?.classList.contains("海"))
    if (crossWins) {
            infoDisplay.textContent = "【結論】：「海」の勝ち！やっぱり海が最高です !"
           allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
           isGameOver = true;
           document.body.style.backgroundImage="url(img/sea.jpg)";  //change background image to "sea"
           }
   })

   if(isGameOver){
    return;
   }

   const nodeArray = Array.from(allSquares);
   let isDraw = nodeArray.every(cell => (cell?.firstChild?.classList.contains("海") || cell?.firstChild?.classList?.contains("山")));


   if(isDraw){
    infoDisplay.textContent = "【結論】引き分け！どちらも素晴らしい !";
    document.body.style.backgroundImage="url(img/mountain-sea.jpg)";  //change background image to "mountain-sea"
   }
}

function checkAllSquares(){
    const circleWins = array.every(cell =>
        allSquares[cell].firstChild?.classList.contains("山"))
}