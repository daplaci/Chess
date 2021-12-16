class Pawn{
    constructor(color, position){
        this.name = 'pawn';
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
        this.display = true;
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
    show_piece_at_position(){
        let x = (this.position%8);
        let y = floor(this.position/8);
        image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
        }
}

class Rook{
    constructor(color, position){
        this.name = 'rook'
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
        this.display = true;
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
    show_piece_at_position(){
        let x = (this.position%8);
        let y = floor(this.position/8);
        image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
        }
}

class Knight{
    constructor(color, position){
        this.name = 'knight'
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
        this.display = true;
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
    show_piece_at_position(){
        let x = (this.position%8);
        let y = floor(this.position/8);
        image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
        }
}

class Bishop{
    constructor(color, position){
        this.name = 'bishop';
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
        this.display = true;
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
    show_piece_at_position(){
        let x = (this.position%8);
        let y = floor(this.position/8);
        image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
        }
}


class King{
    constructor(color, position){
        this.name = 'king';
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
        this.display = true;
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
    show_piece_at_position(){
        let x = (this.position%8);
        let y = floor(this.position/8);
        image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
        }
}

class Queen{
    constructor(color, position){
        this.name = 'queen';
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
        this.display = true;
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
    show_piece_at_position(){
        let x = (this.position%8);
        let y = floor(this.position/8);
        image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
        }
}