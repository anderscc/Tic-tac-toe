//Declare variables used for checking who won on page load
winningRows = ["123","147","159","258", "357", "369","456", "789"]
player1Results = []
player2Results = []
resultCheck=false;
player1= true;
player2 = false;

localStorage.setItem('Player 1', '0')
localStorage.setItem('player 2', '0')

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
    scoreExistsAlready = updateScore(position)
    
    if(player1){
        resultCheck = checkWin(player1Results)
        resultCheck ? endGame("Player 1") : null
    }else{
        resultCheck = checkWin(player2Results)
        resultCheck ? endGame("Player 2") : null
    }
    !scoreExistsAlready ? switchTurns(e) : null
}

function switchTurns(e){
    placeMark(e)
    if(player1){
        player2=player1
        player1=!player2

    }else{
        player1=player2
        player2=!player1 

    }
}

function placeMark(e){
    if(player1){
        e.target.innerText = "X"
        e.target.classList.add('x')
    }else{
        e.target.innerText="O"
        e.target.classList.add('circle')
    }
}

function updateScore(score){
    checkIfExists = (player1Results.includes(String(score)) || player2Results.includes(String(score)))
    if(player1){
        checkIfExists ? alert("Select new score") : player1Results.push(String(score)) 
    }else{
        checkIfExists ? alert("Select new score") : player2Results.push(String(score))
    }
    return checkIfExists
}

function checkWin(playerResultsArray){
    var player = []
    playerResultsArray.sort()
    player=playerResultsArray.join("")
    var result;
    var gameOver=false;

    if (player.length>2){
        for(i=0; i < player.length-1;i++){
            winningRows.some(combination => {
                var tempTruth=0
                for(var j=0; j < combination.length;j++){      
                    tempTruth+=player.includes(combination[j])
                    if(tempTruth===3){
                        gameOver=true
                        break
                    }
                }
            })
        }
        if(player.length==5 && gameOver!=true){
            checkDraw()
        }
    }
    return gameOver
}



function checkDraw(){
    for (let cell of allCells) {
        cell.removeEventListener("click", addMove);
    }
    alert("The game ended in a draw")
}

function displayWin(player){
    alert( `${player} has won the game!`)
}

function restartGame(){
    for(let cell of allCells){
        cell.innerText=""
        cell.classList.remove('x')
        cell.classList.remove('circle')
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
    localScoreTrack(playerId)
    displayWin(playerId)
}

function localScoreTrack(playerId){
    total=+localStorage.getItem(playerId) + 1
    localStorage.setItem(playerId, total)

    playerId == "Player 1" ? 
        document.querySelector('#player1-score').innerText=total : document.querySelector('#player1-score').innerText=total
}

function resetGameData(){
    player1Results = []
    player2Results = []
    resultCheck=false;
    player1= true;
    player2 = false;
}



  
