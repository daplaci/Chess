class Piece {
    constructor(color, name, position) {
        this.name = name;
        this.color = color;
        this.position = position;
        this.default_position = position;
        this.display = true;
        this.is_eaten = false;
        this.img = loadImage('imgs/'+this.name + '_' + this.color + '.png');
        if (this.constructor == Piece) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    move(){
        throw new Error("Method 'move()' must be implemented.");
    }
    eat(){
        throw new Error("Method 'eat()' must be implemented.");
    }
    calculate_path_to(){
        return []
    }
    show_piece_at_position(){
        let x = (this.position%8);
        let y = floor(this.position/8);
        image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
        }

    diagonal_path(position, path_length=Infinity){
        let path = [];
        let is_destination_in_diagonal = false;
        let start = min(position, this.position)
        let end = max(position, this.position)
        if (start%8 > end%8){
            //diagonal is like this '/'
            for (var i = 1; i <=8; i++){
                if ((start + 8*i-i) > end){
                    break
                }
                path.push(start + 8*i-i)
    
            }
            if (path.at(-1)==end){
                    is_destination_in_diagonal = true;
                }
            if (path.length>path_length){
                return false
            }
            path.pop()
            if (is_destination_in_diagonal){
                return path;
            }else{
                return false;
            }            
        }else if (start%8 < end%8){
            //diagonal is like this '\'
            for (var i = 1; i <=8; i++){
                if ((start + 8*i+i) > end){
                    break
                }
                path.push(start + 8*i+i)
    
            }
            if (path.at(-1)==end){
                    is_destination_in_diagonal = true;
                }
            if (path.length>path_length){
                return false
            }
            path.pop()
            if (is_destination_in_diagonal){
                return path;
            }else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    square_path(position, path_length=Infinity){
        console.log("square path")
        //here is the only place where the piece is moved
        let path = [];
        let start = min(position, this.position);
        let end = max(position, this.position);
        if ((position - this.position)%8 == 0)  {
            // moving vertically
            for (var i = start+8; i <end; i+=8){
                path.push(i)
            }
            if (path.length>path_length){
                return false
            }
            return path
        }
        for (var i = start+1; i <end+1; i++){
            // moving horizontally 
            if (i%8 ==0){
                return NaN;
            }
        }
        for (var i = start+1; i < end; i++){
            path.push(i)
        }
        if (path.length>path_length){
            return false
        }
        return path
    }
}
class Pawn extends Piece {
    constructor(color, position){
        super(color, 'pawn', position)
    }
    calculate_path_to(position){
        //here is the only place where the piece is moved
        let path = []
        if (this.position == this.default_position){
            if (this.color == 'black'){
                if (position == this.position+16){
                    return path
                }
            }else{
                if (position == this.position - 16){
                    return path
                }
            }
        }
        if (this.color == 'black'){
            if (position >= (this.position+7) && position <= (this.position+9)){
                return path
            }
        }else{
            if (position >= (this.position-9) && position <= (this.position-7)){
                return path
            }
        }
        return NaN
    }
    move(position){
        this.position = position
    }
}

class Rook extends Piece {
    constructor(color, position){
        super(color, 'rook', position)
    }
    calculate_path_to(position){
        let path = this.square_path(position)
        return path
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
    is_checked(){
        //TODO
    }
}

class Bishop extends Piece {
    constructor(color, position){
        super(color, 'bishop', position)
    }
    calculate_path_to(position){
        let path = this.diagonal_path(position)
        return path
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
    calculate_path_to(position){
        let d_path = this.diagonal_path(position, length_path=1)
        let s_path = this.square_path(position, length_path=1)
        if (d_path == false){
            return s_path
        }else{
            return d_path
        }
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
    calculate_path_to(position){
        let d_path = this.diagonal_path(position)
        let s_path = this.square_path(position)
        if (d_path == false){
            return s_path
        }else{
            return d_path
        }
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
}