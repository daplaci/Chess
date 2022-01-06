// Chess on p5
// Davide Placido

function get_index_from_xy(x, y){
  x = floor(x/(boardsize/8));
  y = floor(y/(boardsize/8));
  return y*8+x
}

let startgame;

function initgame(){
  chessboard = new BoardManager(boardsize);
  return chessboard
}

function setup() {
  boardsize = 600
  createCanvas(boardsize, boardsize);
  chessboard = initgame()
  button = createButton('Start new game');
  button.position(boardsize + 100, 100);
  button.mousePressed(initgame);
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
    is_destination_empty = chessboard.hit(x, y)==0;
    
    if (is_destination_empty){
      chessboard.hit_piece.move(new_location);
      //update new player turn
      if (chessboard.hit_piece.color == 'white'){
        chessboard.player_turn = 'black';
      }else{
        chessboard.player_turn = 'white';
      }
    
    }
    chessboard.hit_piece.display = true;
    chessboard.hit_piece = 0;
    return 0
  }

  hit_piece = chessboard.hit(x, y);    
  console.log(hit_piece.color)
  is_correct_turn = hit_piece.color == chessboard.player_turn
  
  if (hit_piece != 0 & is_correct_turn){
    chessboard.hit_piece = hit_piece;
    chessboard.hit_piece.display = false;
  }
}