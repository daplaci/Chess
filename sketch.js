// Chess on p5
// Davide Placido 

class Cell {
  constructor(index, size){
    this.index = index
    this.x = (this.index%8);
    this.y = floor(this.index/8);
    this.size = size;
    if ((this.x % 2 == 1 & this.y % 2 == 0) | (this.x % 2 == 0 & this.y % 2 == 1) ){
      this.color = 0
    } else{
      this.color = 255
    }
  }
  show(){
    fill(this.color)
    stroke(0)
    rect(this.x*this.size, this.y*this.size, this.size, this.size)
  }
}

class Chessboard{  
  constructor() {
    this.cells = new Array();
    for (var i = 0; i < 64; i++){
      this.cells[i] = new Cell(i, boardsize / 8)
    }
  }
  show(){
    for (var i = 0; i < 64; i++){
      this.cells[i].show()
    }    
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
