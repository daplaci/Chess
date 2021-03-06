
class Cell {
    constructor(index, size){
      this.index = index
      this.x = (this.index%8);
      this.y = floor(this.index/8);
      this.size = size;
      this.background = loadImage('static/imgs/background.png');
      if ((this.x % 2 == 1 & this.y % 2 == 0) | (this.x % 2 == 0 & this.y % 2 == 1) ){
        this.color =  color(237, 244, 245)
      } else{
        this.color = color('rgb(0,0,255)');
      }
      this.highlight_color = color('rgb(177, 156, 217)');
      this.highlight = false;
    }
    show(){
      push()
      fill(this.color, 250)
      stroke(0)
      rect(this.x*this.size, this.y*this.size, this.size, this.size, 2)
      if (this.highlight){
        image(this.background, this.x*this.size, this.y*this.size, this.size, this.size); 
      }
      pop()
    }
}

class Player {
  constructor(color, starting_player){
    this.color = color
    this.all_pieces = new Array();

    this.pawn = new Array(8);
    for(var i=0; i<8; i++){
      if (this.color == starting_player){
        var positions = [48,49,50,51,52,53,54,55]
      }else{
        var positions = [8,9,10,11,12,13,14,15]
      }
      this.pawn[i] = new Pawn(this.color, positions[i])
      this.all_pieces.push(this.pawn[i])
    }
    
    this.rook = new Array(2);
    for(var i=0; i<2; i++){
      if (this.color == starting_player){
        var positions = [56,63]
      }else{
        var positions = [0,7]
      }
      this.rook[i] = new Rook(this.color, positions[i])
      this.all_pieces.push(this.rook[i])
    }
    
    this.knight = new Array(2)
    for(var i=0; i<2; i++){
      
      if (this.color == starting_player){
        var positions = [57,62]
      }else{
        var positions = [1,6]
      }
    
      this.knight[i] = new Knight(this.color, positions[i])
      this.all_pieces.push(this.knight[i])
    }
    
    this.bishop = new Array(2)
    for(var i=0; i<2; i++){
      
      if (this.color == starting_player){
        var positions = [58, 61]
      }else{
        var positions = [2,5]
      }

      this.bishop[i] = new Bishop(this.color, positions[i])
      this.all_pieces.push(this.bishop[i])
    }
    
    
    if (this.color == starting_player){
      this.king = new King(this.color, 60);
    }else{
      this.king = new King(this.color, 3);
    }
    
    if (this.color == starting_player){
      this.queen = new Queen(this.color, 59);
    }else{
      this.queen = new Queen(this.color, 4);
    }
    
    this.all_pieces.push(this.queen)
    this.all_pieces.push(this.king)
  }
  
  get_piece_at_index(index){
    for(var i=0; i<this.all_pieces.length; i++){
        if (this.all_pieces[i].position == index){
          return this.all_pieces[i]
        }
    }
    return 0
  }
}

class BoardManager{
    constructor(boardsize, starting_player){
        this.cells = new Array();
        this.size = boardsize /8 
        for (var i = 0; i < 64; i++){
          this.cells[i] = new Cell(i, this.size)
        }
        this.white_pieces = new Player("white", starting_player)
        this.black_pieces = new Player("black", starting_player)
        this.hit_piece = 0;
        this.player_turn = 'white';
        this.history = new Array();
    }
    show(){
      for (var i = 0; i < 64; i++){
        this.cells[i].show()
      }
      for (let p of this.white_pieces.all_pieces){
        p.show_piece_at_position()
      }
      for (let p of this.black_pieces.all_pieces){
        p.show_piece_at_position()
      }
    }
    highlight(){
      if (this.hit_piece==0){
        for (var c = 0; c < 64; c++){
          this.cells[c].highlight = false;
        }
      }else{
        for (var c = 0; c < 64; c++){
          if (this.is_path_valid(this.hit_piece, c)){
              this.cells[c].highlight = true;
          }
        }
      }
    }
    
    move(new_position){
      this.history.push([this.hit_piece, this.hit_piece.position])
      this.hit_piece.move(new_position)
    }
    undo(){
      var last_move = this.history.pop()
      last_move[0].move(last_move[1])
    }

    is_king_edible(attacking_color){
      if (attacking_color == 'black'){
        for (let piece of this.black_pieces.all_pieces){
          if (this.is_path_valid(piece, this.white_pieces.king.position)){
            this.white_pieces.king.is_checked = true;
            return false
          }
        }
        for (let piece of this.white_pieces.all_pieces){
          if (this.is_path_valid(piece, this.black_pieces.king.position)){
            console.log("invalid move" +piece.name + piece.color + "attacking black king")
            return true
          }
        }
      }
      if (attacking_color == 'white'){
        for (let piece of this.white_pieces.all_pieces){
          if (this.is_path_valid(piece, this.black_pieces.king.position)){
            this.black_pieces.king.is_checked = true;
            return false
          } 
        }
        for (let piece of this.black_pieces.all_pieces){
          if (this.is_path_valid(piece, this.white_pieces.king.position)){            
            console.log("invalid move" +piece.name + piece.color + "attacking white king")
            console.log("invalid move")
            return true
          }
        }
      }
      if (attacking_color == 'white'){
        this.white_pieces.king.is_checked = false;
      }else{
        this.black_pieces.king.is_checked = false;
      }
      return false
    }

    hit(index){
      var white_piece = this.white_pieces.get_piece_at_index(index);
      if (white_piece == 0){
        var black_piece = this.black_pieces.get_piece_at_index(index);
        return black_piece;
      }
      return white_piece;
    }

    is_path_valid(piece, new_location){
      if (piece.is_eaten){
        // an eaten piece can do anything
        return false
      }
      var destination = this.hit(new_location) 
      var is_eating = destination!=0
      var path = piece.calculate_path_to(new_location, is_eating)
      
      // path is valid if destination is a valid move for the piece
      if (!Array.isArray(path)){
        return false;
      }
      for (let i of path){
        //start point and point are not considered obstruction
        if (i == piece.position || i==new_location){
          continue;
        }
        // to be valid no pieces have to be in the middle of the path
        if (this.white_pieces.get_piece_at_index(i) != 0 || this.black_pieces.get_piece_at_index(i) != 0){
          console.log("path busy")
          return false;
        }
      }
      //the destination of the path has to be an empty square or an opponent piece
      if (destination!=0 & destination.color == piece.color){
        return false
      }
      return true;
    }
    commit() {
      // Do a POST request to the test API
      let api_url = 'train';
     
      // Example POST data
      let postData = { fen:'cdaisugr'};
     
      httpDo(api_url, "POST", "json", postData, function (response) {
        console.log("The next move is: " + response.move, 20, 180);
      });
    }
}