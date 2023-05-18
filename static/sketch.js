// Chess on p5
// Davide Placido
var checkbox;
var show_valid_moves;
var chessboard;

function get_index_from_xy(x, y) {
  x = floor(x / (boardsize / 8));
  y = floor(y / (boardsize / 8));
  return y * 8 + x;
}

function get_classic_coord_from_index(index) {
  r = index % 8;
  c = floor(this.index / 8);
  return r, c;
}

function get_index_from_classic_coord(c, r) {
  var index_c = "abcdefgh".indexOf(c);
  if (checkbox.checked()) {
    return index_c + r * 8;
  } else {
    return index_c + (8 - r) * 8;
  }
}

function cl_move(starting_coord, ending_coord) {
  // command line move passing start and end coordinates
  console.log(
    "js received move from " + starting_coord + " to " + ending_coord
  );
  var starting_index = get_index_from_classic_coord(
    starting_coord[0],
    starting_coord[1]
  );
  var ending_index = get_index_from_classic_coord(
    ending_coord[0],
    ending_coord[1]
  );
  catch_piece(starting_index);
  release_piece(ending_index);
  return 0;
}

function initgame(fen) {
  if (checkbox.checked()) {
    chessboard = new BoardManager(boardsize, "black");
  } else {
    chessboard = new BoardManager(boardsize, "white");
  }
  return chessboard;
}

function myCheckedEvent() {
  initgame();
}

function setup() {
  boardsize = 600;
  createCanvas(boardsize * 2, boardsize);
  button = createButton("Start new game");
  button.position(boardsize / 2 - 100, boardsize + 10);
  button.size(200, 30);
  button.mousePressed(initgame);
  goback_button = createButton("Previous move");
  goback_button.position(boardsize / 2 - 100, boardsize + 50);
  goback_button.size(200, 30);
  goback_button.mousePressed(undo);
  //Checkbox for side starting
  let label = createElement(
    "label",
    `<input id="toggle" type="checkbox" />
     <span class="slider"></span>`
  );
  label.addClass("switch");

  checkbox = select("#toggle");
  checkbox.changed(myCheckedEvent);

  fen = mode["fen"];
  move = mode["move"];
  console.log(move);
  chessboard = initgame(fen);
  chessboard.show();
  if (move != undefined) {
    cl_move(move[0], move[1]);
  }
}

function draw() {
  background(255);
  chessboard.show();
}

function undo() {
  chessboard.undo();
  chessboard.next_player_turn();
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  var new_position = get_index_from_xy(x, y);

  if (chessboard.hit_piece != 0) {
    // a piece was on hold -> release it and exit
    release_piece(new_position);
  } else {
    catch_piece(new_position);
  }
  return 0;
}

function catch_piece(new_position) {
  hit_piece = chessboard.hit(new_position);
  is_correct_turn = hit_piece.color == chessboard.player_turn;

  if ((hit_piece != 0) & is_correct_turn) {
    chessboard.hit_piece = hit_piece;
    chessboard.highlight();
    chessboard.hit_piece.display = false;
    return 0;
  }
  return -1;
}

function release_piece(new_position) {
  path_valid = chessboard.is_path_valid(chessboard.hit_piece, new_position);

  if (path_valid) {
    var legal_move = chessboard.move(new_position);
    if (legal_move) {
      chessboard.next_player_turn();
      chessboard.commit();
    }
  }

  chessboard.hit_piece.display = true;
  chessboard.hit_piece = 0;
  chessboard.highlight();
}
