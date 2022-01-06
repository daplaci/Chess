
class Cell {
    constructor(index, size){
      this.index = index
      this.x = (this.index%8);
      this.y = floor(this.index/8);
      this.size = size;
      if ((this.x % 2 == 1 & this.y % 2 == 0) | (this.x % 2 == 0 & this.y % 2 == 1) ){
        this.color =  color(237, 244, 245)
      } else{
        this.color = color('rgb(0,0,255)');
      }
    }
    show(){
      push()
      fill(this.color, 250)
      stroke(0)
      rect(this.x*this.size, this.y*this.size, this.size, this.size, 2)
      pop()
    }
}

class Player {
  constructor(color){
    this.color = color
    this.all_pieces = new Array();

    this.pawn = new Array(8);
    for(var i=0; i<8; i++){
      if (this.color == "white"){
        var positions = [48,49,50,51,52,53,54,55]
      }else{
        var positions = [8,9,10,11,12,13,14,15]
      }
      this.pawn[i] = new Pawn(this.color, positions[i])
      this.all_pieces.push(this.pawn[i])
    }
    
    this.rook = new Array(2);
    for(var i=0; i<2; i++){
      if (this.color == "white"){
        var positions = [56,63]
      }else{
        var positions = [0,7]
      }
      this.rook[i] = new Rook(this.color, positions[i])
      this.all_pieces.push(this.rook[i])
    }
    
    this.knight = new Array(2)
    for(var i=0; i<2; i++){
      
      if (this.color == "white"){
        var positions = [57,62]
      }else{
        var positions = [1,6]
      }
    
      this.knight[i] = new Knight(this.color, positions[i])
      this.all_pieces.push(this.knight[i])
    }
    
    this.bishop = new Array(2)
    for(var i=0; i<2; i++){
      
      if (this.color == "white"){
        var positions = [58, 61]
      }else{
        var positions = [2,5]
      }

      this.bishop[i] = new Bishop(this.color, positions[i])
      this.all_pieces.push(this.bishop[i])
    }
    
    
    if (this.color == "white"){
      this.king = new King(this.color, 60);
    }else{
      this.king = new King(this.color, 3);
    }
    
    if (this.color == "white"){
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
    constructor(){
        this.cells = new Array();
        this.size = boardsize /8 
        for (var i = 0; i < 64; i++){
          this.cells[i] = new Cell(i, this.size)
        }
        this.white_pieces = new Player("white")
        this.black_pieces = new Player("black")
        this.hit_piece = 0;
        this.player_turn = 'white';
        this.rows = [8,9,7,6,4,3,2,1];
        this.columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    }
    show(){    
      for (var i = 0; i < 64; i++){
        var piece = this.white_pieces.get_piece_at_index(i)
        if (piece == 0){
          var piece = this.black_pieces.get_piece_at_index(i)
        }
        this.cells[i].show()
        if (piece.display){
          piece.show_piece_at_position()
        }
      }
      
    }
    hit(x,y){
      var index = get_index_from_xy(x,y);
      var white_piece = this.white_pieces.get_piece_at_index(index);
      if (white_piece == 0){
        var black_piece = this.black_pieces.get_piece_at_index(index);
        return black_piece;
      }
      return white_piece;
    }

    is_path_busy(new_location){
      var cells_in_path = this.hit_piece.calculate_path_to(new_location)
      for (let i of cells_in_path){
        if (this.white_pieces.get_piece_at_index(i) != 0 || this.black_pieces.get_piece_at_index(i) != 0)
        return true;
        console.log("path busy")
      }
      return false;
    }    
}