//Declare variables used for checking who won on page load
winningRows = ["123","147","159","258", "357", "369","456", "789"]
player1Results = []
player2Results = []
resultCheck=false;
player1= true;
player2 = false;

//get all Cells
const allCells = document.getElementsByClassName("cell");

for (let cell of allCells) {
    cell.addEventListener("click", addMove);
  }

//button to restart game with event listener to restart game
restartButton = document.querySelector('button');
restartButton.addEventListener("click", restartGame)

//adds a move selected by player
//needs to be revised to prevent duplicate plays
function addMove(e){
    position = e.target.dataset.value
    switchTurns(e);
    switchTurn = updateScore(position)
    !switchTurn ? switchTurns(e) : null
    if(this.player1){
        this.resultCheck = checkWin(player1Results)
        this.resultCheck ? endGame("Player 1") : null
    }else{
        this.resultCheck = checkWin(player2Results)
        this.resultCheck ? endGame("Player 2") : null
    }
}

function switchTurns(e){
    if(this.player1){
        this.player2=this.player1
        this.player1=!this.player2
        e.target.innerText = "X"
    }else{
        this.player1=this.player2
        this.player2=!this.player1 
        e.target.innerText="O"
    }
}

function updateScore(score){
    checkIfExists = (player1Results.includes(String(score)) || player2Results.includes(String(score)))
    if(this.player1){
        checkIfExists ? alert("Select new score") : player1Results.push(String(score)) 
    }else{
        checkIfExists ? alert("Select new score") : player2Results.push(String(score))
    }
    return checkIfExists
}

function checkWin(playerResultsArray){
    playerResultsArray.sort()
    player=playerResultsArray.join("")
    var result;
    tempMap = {}
    if (player.length>2){
        for(i=0; i < player.length-1;i++){
            result = winningRows.includes(player.substr(i,i+3))
            if(result==true){
                return result
            }
        }
    }
    return result
}

function displayWin(player){
    alert( `${player} has won the game!`)
}

function restartGame(){
    for(let cell of allCells){
        cell.innerText=""
    }
    for (let cell of allCells) {
        cell.addEventListener("click", addMove);
      }
      resetGameData()
}

function endGame(playerId){
    for (let cell of allCells) {
        cell.removeEventListener("click", addMove);
    }
    displayWin(playerId)
    
}

function resetGameData(){
    player1Results = []
    player2Results = []
    resultCheck=false;
    player1= true;
    player2 = false;
}



  
