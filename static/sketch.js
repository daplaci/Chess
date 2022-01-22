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

function initgame(){
  if (checkbox.checked()){
    chessboard = new BoardManager(boardsize, 'black');
  }else{
    chessboard = new BoardManager(boardsize, 'white');
  }
  return chessboard
}

function myCheckedEvent() {
  initgame()
}

var checkbox;
var show_valid_moves;
var chessboard;

function setup() {
  console.log("Starting chess in mode:" + mode)
  boardsize = 600
  createCanvas(boardsize*2, boardsize);
  
  //Checkbox for side starting
  let label = createElement(
    'label',
    `<input id="toggle" type="checkbox" />
     <span class="slider"></span>`
  );
  label.addClass('switch');

  checkbox = select('#toggle');
  checkbox.changed(myCheckedEvent);
    
  chessboard = initgame()
  button = createButton('Start new game');
  button.position(boardsize/2 -100, boardsize + 10);
  button.size(200,30);
  button.mousePressed(initgame);
  goback_button = createButton('Previous move');
  goback_button.position(boardsize/2 -100, boardsize + 50);
  goback_button.size(200,30);
  goback_button.mousePressed(undo);
}


function draw() {
  background(255)
  chessboard.show();
}

function undo() {
  chessboard.undo();
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  var new_location = get_index_from_xy(x, y)
  
  if (chessboard.hit_piece != 0){
    path_valid = chessboard.is_path_valid(chessboard.hit_piece, new_location)
    
    if (path_valid){
      var destination = chessboard.hit(new_location) //this line is redundant (alreadu in .is_path_valid)
      destination.is_eaten = true;//it means we are eating a piece
      destination.position += 63;//piece must be moved outside the board
    
      chessboard.move(new_location);
      if (chessboard.is_king_edible(chessboard.player_turn)){
        //It means it is not a legal move
        chessboard.undo()
        destination.is_eaten = false;//it means we are eating a piece
        destination.position -= 63;//piece must be moved outside the board
      }else{
        chessboard.commit()
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
    chessboard.highlight()
    return 0
  }

  hit_piece = chessboard.hit(new_location); 
  is_correct_turn = hit_piece.color == chessboard.player_turn
  
  if (hit_piece != 0 & is_correct_turn){
    chessboard.hit_piece = hit_piece;
    chessboard.highlight()
    chessboard.hit_piece.display = false;
  }
}