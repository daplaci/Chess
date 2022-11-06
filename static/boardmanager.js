
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
    this.starting_player = starting_player;

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
        this.rook[i] = new Rook(this.color, positions[i])
        if (i == 0){
          this.rook[i].set_long_castling(59)
        }else{
          this.rook[i].set_short_castling(61)
        }
      }else{
        var positions = [0,7]
        this.rook[i] = new Rook(this.color, positions[i])
        if (i == 0){
          this.rook[i].set_short_castling(2)
        }else{
          this.rook[i].set_long_castling(4)
        }
      }
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
      this.king.short_castle_positions = [60, 61, 62];
      this.king.long_castle_positions = [58, 59, 60];
      this.king.set_short_castling(62)
      this.king.set_long_castling(58)
    }else{
      this.king = new King(this.color, 3);
      this.king.short_castle_positions = [1,2,3];
      this.king.long_castle_positions = [3,4,5];
      this.king.set_short_castling(1)
      this.king.set_long_castling(5)
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
  get_short_castle_rook(){
    for (var i=0; i<this.rook.length; i++){
      if (this.rook[i].castling_type == 'short'){
        return this.rook[i]
      }
    }
  }
  get_long_castle_rook(){
    for (var i=0; i<this.rook.length; i++){
      if (this.rook[i].castling_type == 'long'){
        return this.rook[i]
      }
    }
  }

  has_short_castling(pieces_checking_path){
    var castling_rook = this.get_short_castle_rook()
    var king_unmoved = this.king.default_position == this.king.position;
    var rook_unmoved = castling_rook.default_position == castling_rook.position
    if (rook_unmoved & king_unmoved & !pieces_checking_path){
          return true
    }else{
      return false
    } 
  }
  has_long_castling(pieces_checking_path){
    var castling_rook = this.get_long_castle_rook()
    var king_unmoved = this.king.default_position == this.king.position;
    var rook_unmoved = castling_rook.default_position == castling_rook.position
    if (rook_unmoved & king_unmoved & !pieces_checking_path){
      return true
    }else{
      return false
    } 
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
        this.player_turn = 'white'; //TOdo this can be moved to alternate between this.white_pieces and this.black_pieces
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
      var destination = this.hit(new_position) //this line is redundant (alreadu in .is_path_valid)

      if (this.hit_piece.name=='king' & this.hit_piece.is_short_castling){
        if (this.hit_piece.color == 'white'){

          for (let enemy_piece of this.black_pieces.all_pieces){ //if short castling is checked exit
            for (let pos of this.hit_piece.short_castle_positions){
              if (this.is_path_valid(enemy_piece, pos)){
                console.log('castling is not valid because passing a check')
                return 0
              }
            }
          }

          var rook = this.white_pieces.get_short_castle_rook()
          this.history.push([this.hit_piece, this.hit_piece.position, rook, rook.position, destination, destination.position])
          rook.short_castle()
          this.hit_piece.short_castle()
        }else{

          for (let enemy_piece of this.white_pieces.all_pieces){ //if short castling is checked exit
            for (let pos of this.hit_piece.short_castle_positions){
              if (this.is_path_valid(enemy_piece, pos)){
                return 0
              }
            }
          }

          var rook = this.black_pieces.get_short_castle_rook()
          this.history.push([this.hit_piece, this.hit_piece.position, rook, rook.position, destination, destination.position])
          rook.short_castle()
          this.hit_piece.short_castle()
        }
      }else if (this.hit_piece.name=='king' & this.hit_piece.is_long_castling){
        if (this.hit_piece.color == 'white'){

          for (let enemy_piece of this.black_pieces.all_pieces){ //if long castling is checked exit
            for (let pos of this.hit_piece.long_castle_positions){
              if (this.is_path_valid(enemy_piece, pos)){
                return 0
              }
            }
          }

          var rook = this.white_pieces.get_long_castle_rook()
          this.history.push([this.hit_piece, this.hit_piece.position, rook, rook.position, destination, destination.position])
          rook.long_castle()
          this.hit_piece.long_castle()
        }else{

          for (let enemy_piece of this.white_pieces.all_pieces){ //if long castling is checked exit
            for (let pos of this.hit_piece.long_castle_positions){
              if (this.is_path_valid(enemy_piece, pos)){
                return 0
              }
            }
          }

          var rook = this.black_pieces.get_long_castle_rook()
          this.history.push([this.hit_piece, this.hit_piece.position, rook, rook.position, destination, destination.position])
          rook.long_castle()
          this.hit_piece.long_castle()
        }
      }else{
        this.history.push([this.hit_piece, this.hit_piece.position, destination, destination.position])
        this.hit_piece.move(new_position)
      }
      if (destination!=0){
        destination.is_eaten = true;//it means we are eating a piece
        destination.position += 63;//piece must be moved outside the board
      }

      if (!this.is_king_legal(this.player_turn)){
        console.log("King not legal after move")
        this.undo()
        return 0
      }else{
        return 1
      }
    }

    undo(){
      var last_move = this.history.pop()
      
      if (last_move.length == 4){
        last_move[0].move(last_move[1])
        if (last_move[2]!=0){
          last_move[2].move(last_move[3])
          last_move[2].is_eaten = false;
        }
      }else{
        last_move[0].move(last_move[1])
        last_move[2].move(last_move[3])
        if (last_move[4]!=0){
          last_move[4].move(last_move[5])
          last_move[4].is_eaten = false;
        }
      }
    }

    next_player_turn(){
      //update new player turn
      if (this.player_turn == 'white'){
          this.player_turn = 'black';
      }else if (this.player_turn == 'black'){
          this.player_turn = 'white';
      }
    }
    is_king_legal(attacking_color){
      if (attacking_color == 'black'){ 
        for (let piece of this.white_pieces.all_pieces){// black cannot do a move that puts himself in check
          if (this.is_path_valid(piece, this.black_pieces.king.position)){
            console.log("invalid move " +piece.name + piece.color + " attacking black king")
            return false
          }
        }
        this.black_pieces.king.is_checked = false
        for (let piece of this.black_pieces.all_pieces){ // black is checking white king
          if (this.is_path_valid(piece, this.white_pieces.king.position)){
            this.white_pieces.king.is_checked = true;
            return true
          }
        }
        this.white_pieces.king.is_checked = false;
      }
      if (attacking_color == 'white'){
        for (let piece of this.black_pieces.all_pieces){// white cannot do a move that puts himself in check
          if (this.is_path_valid(piece, this.white_pieces.king.position)){            
            console.log("invalid move" +piece.name + piece.color + "attacking white king")
            return false
          }
        }
        this.white_pieces.king.is_checked = false
        for (let piece of this.white_pieces.all_pieces){ // black is checking white king
          if (this.is_path_valid(piece, this.black_pieces.king.position)){
            this.black_pieces.king.is_checked = true;
            return true
          }
        }
        this.black_pieces.king.is_checked = false;
      }
      return true
    }

    is_enpassant_valid(piece, destination){
    }

    hit(index){
      var white_piece = this.white_pieces.get_piece_at_index(index);
      if (white_piece == 0){
        var black_piece = this.black_pieces.get_piece_at_index(index);
        return black_piece;
      }
      return white_piece;
    }

    is_path_valid(piece, new_location){//check if path for a piece is valid
      if (piece.is_eaten){
        // an eaten piece cannot do anything
        return false
      }
      var destination = this.hit(new_location) 
      var is_eating = destination!=0

      if (piece.color == 'black'){
        var enemy = this.white_pieces
        var player = this.black_pieces 
      }else{
        var enemy = this.black_pieces
        var player = this.white_pieces
      }

      if (piece.name == 'king'){
        var path = piece.calculate_path_to(new_location, is_eating, 
                                          player.has_short_castling(false), 
                                          player.has_long_castling(false))
      }else{
        var path = piece.calculate_path_to(new_location, is_eating)
      }
      
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
        if (player.get_piece_at_index(i) != 0 || enemy.get_piece_at_index(i) != 0){
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