// Chess on p5
// Davide Placido

function get_index_from_xy(x, y){
  x = floor(x/(boardsize/8));
  y = floor(y/(boardsize/8));
  return y*8+x
}

function get_classic_coord_from_index(index){
  r = index%8;
  c = floor(this.index/8);
  return r,c
}

let startgame;

function initgame(){
  chessboard = new BoardManager(boardsize);
  return chessboard
}

function setup() {
  boardsize = 600
  createCanvas(boardsize*2, boardsize);
  chessboard = initgame()
  button = createButton('Start new game');
  button.position(boardsize/2 -100, boardsize + 10);
  button.size(200,30);
  button.mousePressed(initgame);
}

function draw() {
  background(255)
  chessboard.show();
}

function mousePressed() {
  x = mouseX;
  y = mouseY;

  if (chessboard.hit_piece != 0){
    var new_location = get_index_from_xy(x, y)
    path_valid = chessboard.is_path_valid(new_location)
    
    if (path_valid){
      //moving the piece to a path that is valid
      destination = chessboard.hit(x, y)
      if (destination!=0 & destination.color != chessboard.hit_piece.color){
        //it means we are eating a piece
        //piece must be moved outside the board
        destination.is_eaten = true;
        console.log("eaten piece is displayed?")
        console.log(destination.display)
      }
      if (destination.is_eaten || destination ==0){
        chessboard.hit_piece.move(new_location);
        //update new player turn
        if (chessboard.hit_piece.color == 'white'){
          chessboard.player_turn = 'black';
        }else{
          chessboard.player_turn = 'white';
        }
      }
    }
    chessboard.hit_piece.display = true;
    chessboard.hit_piece = 0;
    return 0
  }

  hit_piece = chessboard.hit(x, y);    
  is_correct_turn = hit_piece.color == chessboard.player_turn
  
  if (hit_piece != 0 & is_correct_turn){
    chessboard.hit_piece = hit_piece;
    chessboard.hit_piece.display = false;
  }
}