// Chess on p5
// Davide Placido


function get_index_from_xy(x, y){
  x = floor(x/(boardsize/8));
  y = floor(y/(boardsize/8));
  return y*8+x
}
class Chessboard{  
  constructor() {
    this.board = new BoardManager;
    this.hit_piece = 0;
  }
  show(){ 
    this.board.show();
  }
  hit(x,y){
    var index = get_index_from_xy(x,y);
    var white_piece = this.board.white_pieces.get_piece_at_index(index);
    if (white_piece == 0){
      var black_piece = this.board.black_pieces.get_piece_at_index(index);
      return black_piece;
    }
    return white_piece;

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

function mousePressed() {
  x = mouseX;
  y = mouseY;

  if (chessboard.hit_piece != 0){
    var new_location = get_index_from_xy(x, y)
    chessboard.hit_piece.move(new_location);
    chessboard.hit_piece.display = true;
    chessboard.hit_piece = 0;
    return 0
  }

  hit_piece = chessboard.hit(x, y);
  if (hit_piece != 0){
    chessboard.hit_piece = hit_piece;
    chessboard.hit_piece.display = false;
  }
}