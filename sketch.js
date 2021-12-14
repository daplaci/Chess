// Chess on p5
// Davide Placido 
class Chessboard{  
  constructor() {
    this.board = new BoardManager;
  }
  show(){ 
    this.board.show()
  }
  
}

function setup() {
  boardsize = 600
  createCanvas(boardsize, boardsize);
  chessboard = new Chessboard(boardsize);
}

function draw() {
  background(0)
  chessboard.show();
}
