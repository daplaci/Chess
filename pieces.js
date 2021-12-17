class Piece {
    constructor(color, name, position) {
        this.name = name;
        this.color = color;
        this.position = position;
        this.display = true;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
        if (this.constructor == Piece) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    move(){
        throw new Error("Method 'move()' must be implemented.");
    }
    
    show_piece_at_position(){
        let x = (this.position%8);
        let y = floor(this.position/8);
        image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
        }
}
class Pawn extends Piece {
    constructor(color, position){
        super(color, 'pawn', position)
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
}

class Rook extends Piece {
    constructor(color, position){
        super(color, 'rook', position)
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
}

class Knight extends Piece {
    constructor(color, position){
        super(color, 'knight', position)
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
}

class Bishop extends Piece {
    constructor(color, position){
        super(color, 'bishop', position)
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
}


class King extends Piece {
    constructor(color, position){
        super(color, 'king', position)
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
}

class Queen extends Piece {
    constructor(color, position){
        super(color, 'queen', position)
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
}