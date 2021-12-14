class Pawn{
    constructor(color, position){
        this.name = 'pawn';
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
    }
    move(){
        //here is the only place where the piece is moved
        this.position += 8
    }
    display(){
        return "P"
    }
}

class Rook{
    constructor(color, position){
        this.name = 'rook'
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
    }
    move(){
        //here is the only place where the piece is moved
        this.position += 8
    }
    display(){
        return "R"
    }
}

class Knight{
    constructor(color, position){
        this.name = 'knight'
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
    }
    move(){
        //here is the only place where the piece is moved
        this.position += 8
    }
    display(){
        return "Kn"
    }
}

class Bishop{
    constructor(color, position){
        this.name = 'bishop';
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
    }
    move(){
        //here is the only place where the piece is moved
        this.position += 8
    }
    display(){
        return "B"
    }
}

class King{
    constructor(color, position){
        this.name = 'king';
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
    }
    move(){
        //here is the only place where the piece is moved
        this.position += 8
    }
    display(){
        return "K"
    }
}

class Queen{
    constructor(color, position){
        this.name = 'queen';
        this.color = color;
        this.position = position;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
    }
    move(){
        //here is the only place where the piece is moved
        this.position += 8
    }
    display(){
        return "Q"
    }
}