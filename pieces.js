class Pawn{
    constructor(color, position){
        this.color = color;
        this.position = position;
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
        this.color = color;
        this.position = position;
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
        this.color = color;
        this.position = position;
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
        this.color = color;
        this.position = position;
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
        this.color = color;
        this.position = position;
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
        this.color = color;
        this.position = position;
    }
    move(){
        //here is the only place where the piece is moved
        this.position += 8
    }
    display(){
        return "Q"
    }
}