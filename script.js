var board = 
    player = 'O',
    machine= 'X',
    wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        
        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [6,4,2]
    ],
    cells = document.querySelectorAll('.cell');
    startGame();
function startGame() {
    document.querySelector('.endgame').style.display ='none';
    board = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.innerHTML='';
        cell.style.removeProperty("background-color");
        cell.addEventListener("click",turnClick,false);
    }
}
function turnClick(square){
    //typeof board[square.target.id] == 'number'
    if(!isNaN(board[square.target.id])){
        turn(square.target.id, player);
        if(!checkTie())
            turn(bestSpot(), machine);
    }
    
}
function turn(squareId, player){
    board[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    let gameWon = checkWin(board,player);
    if(gameWon)
        gameOver(gameWon)

}
function checkWin(board, player) {
    let plays = board.reduce((a,e,i)=> (e===player)?a.concat(i):a,[])
    gameWon = null;
    for (let [i,win] of wins.entries()) {
        if(win.every(el=>plays.indexOf(el)>-1)){
            gameWon = {index:i,player:player};
            break;
        }
    }
    return gameWon;
}
function gameOver(gameWon){
    for (let i of wins[gameWon.index]) {
        document.getElementById(i).style.backgroundColor  = 
            gameWon.player == player ?"blue":"red";
    }
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.removeEventListener('click',turnClick,false);
    }
    declareWinner(gameWon.player==player?"You Win!":"You Lose!");
}
function emptySquares() {
    return board.filter(s => typeof s === 'number');
}
function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if(emptySquares().length == 0){
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.style.backgroundColor = "green";
            cell.removeEventListener('click',turnClick,false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

function declareWinner(who) {
 document.querySelector('.endgame').style.display = "block";
 document.querySelector('.endgame .text').innerHTML = who;
}