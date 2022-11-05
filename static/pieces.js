class Piece {
    constructor(color, name, position) {
        this.name = name;
        this.color = color;
        this.position = position;
        this.default_position = position;
        this.display = true;
        this.is_eaten = false;
        this.path_length = Infinity;
        this.img = loadImage('static/imgs/'+this.name + '_' + this.color + '.png');
        if (this.constructor == Piece) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }

    move(position){
        this.move(position);
    }
    eat(){
        throw new Error("Method 'eat()' must be implemented.");
    }
    calculate_path_to(){
        return []
    }
    show_piece_at_position(){
        if (this.display){
            if (this.is_eaten){
                // show piece outside the board
                let x = (this.default_position%8);
                let y = floor(this.default_position/8);
                image(this.img, x*boardsize/8 + boardsize, y*boardsize/8, boardsize/8, boardsize/8);
            }else{
                let x = (this.position%8);
                let y = floor(this.position/8);
                image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
            }
        }
    }

    diagonal_path(position){
        let path = [];
        let is_destination_in_diagonal = false;
        let start = min(position, this.position)
        let end = max(position, this.position)
        if (start%8 > end%8){
            //diagonal is like this '/'
            for (var i = 0; i <=8; i++){
                if ((start + 8*i-i) > end){
                    break
                }
                p = start + 8*i-i
                path.push(p)
            }
            if (path.includes(position) & path.includes(this.position)){
                    is_destination_in_diagonal = true;
                }
            if (path.length>this.path_length){
                return false
            }
            if (is_destination_in_diagonal){
                return path;
            }else{
                return false;
            }          
        }else if (start%8 < end%8){
            //diagonal is like this '\'
            for (var i = 0; i <=8; i++){
                if ((start + 8*i+i) > end){
                    break
                }
                var p = start + 8*i+i
                path.push(p)
            }
            if (path.includes(position) & path.includes(this.position)){
                    is_destination_in_diagonal = true;
                }
            if (path.length>this.path_length){
                return false
            }
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
    square_path(position){
        //here is the only place where the piece is moved
        let path = [];
        let start = min(position, this.position);
        let end = max(position, this.position);
        if ((position - this.position)%8 == 0)  {
            // moving vertically
            for (var i = start; i <end+1; i+=8){
                path.push(i)
            }
            if (path.length>this.path_length){
                return false
            }
            return path
        }
        if (floor(start/8)!=floor(end/8)){
            return false;
        }
        for (var i = start; i < end+1; i++){
            path.push(i)
        }
        if (path.length>this.path_length){
            return false
        }
        return path
    }
    check_all_valid_destinations(){
        var all_paths = []
        for (var i = 0; i < 64;i++){
            var path = this.calculate_path_to(i)
            if (Array.isArray(path)){
                for(let el of path){
                    all_paths.push(el)  
                }
            }
        }
        return new Set(all_paths)
    }
}
class Pawn extends Piece {
    constructor(color, position){
        super(color, 'pawn', position)
    }
    calculate_path_to(position, eating=false){
        //here is the only place where the piece is moved
        if (position == this.position){
            return false;
        }
        let path = []
        if (this.position == this.default_position){
            if (floor(this.position /8) ==1 
                & [8,16].includes(position-this.position)){
                for (let el of [8,16]){
                    if ((this.position+el)<=position){
                        path.push(this.position+el)
                    }
                }
                return path
            }
            if (floor(this.position /8) ==6 & 
                [-16,-8].includes(position-this.position)){
                for (let el of [-16,-8]){
                    if (this.position+el>=position){
                        path.push(this.position+el)
                    }
                }
            return path
            }
        }
        if (eating==true){
            var black_range =  [7, 9]
            var white_range = [-9, -7]
        }else{
            var black_range =  [8]
            var white_range = [-8]
        }
        if (this.color == 'black'){
            if (black_range.includes(position- this.position)){
                path.push(position)
                return path
            }
        }else{
            if (white_range.includes(position-this.position)){
                path.push(position)
                return path
            }
        }
        return false
    }
    move(position){
        this.position = position
    }
}

class Rook extends Piece {
    constructor(color, position){
        super(color, 'rook', position)
        this.castling_type = 'none'
    }

    set_short_castling(position){
        this.short_castle_position = position 
        this.castling_type = 'short'
    }
    set_long_castling(position){
        this.long_castle_position = position 
        this.castling_type = 'long'
    }
    calculate_path_to(position){
        if (position == this.position){
            return false;
        }
        let path = this.square_path(position)
        return path
    }
    short_castle(){
        this.position = this.short_castle_position
    }
    long_castle(){
        this.position = this.long_castle_position
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
    calculate_path_to(position){
        let path = [];
        if (position == this.position){
            return false;
        }
        if (position % 8 > this.position %8){
            var side = 'right';
        }else{
            var side = 'left';
        }
        if ((position == this.position - 6 & side == 'right') ||
        (position == this.position - 15 & side == 'right') ||
        (position == this.position - 10 & side == 'left') ||
        (position == this.position - 17 & side == 'left') ||
        (position == this.position + 6 & side == 'left') ||
        (position == this.position + 15 & side == 'left') ||
        (position == this.position + 10 & side == 'right') ||
        (position == this.position + 17 & side == 'right')){
            path.push(position)
            return path;
        }
        else{
            return false;
        }
    }
    move(position){
        this.position = position
    }
}

class Bishop extends Piece {
    constructor(color, position){
        super(color, 'bishop', position)
    }
    calculate_path_to(position){
        if (position == this.position){
            return false;
        }
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
        this.path_length = 2;
        this.is_checked = false;
        this.checked_img = loadImage('static/imgs/'+this.name + '_' + this.color + '.checked.png');
        this.is_short_castling = false;
        this.is_long_castling = false;
    }
    set_short_castling(position){
        this.short_castle_position = position 
    }
    set_long_castling(position){
        this.long_castle_position = position 
    }
    calculate_path_to(position, is_eating, short_castle_right=true, long_caste_right=true){

        if (position==this.short_castle_position & short_castle_right & !is_eating){
            var start = min(this.position, position)
            var end = max(this.position, position)
            this.is_short_castling = true;
            return [start, start+1, end]
        } else if (position==this.long_castle_position & long_caste_right & !is_eating){
            var start = min(this.position, position)
            var end = max(this.position, position)
            this.is_long_castling = true;
            return [start, start+1, end]
        }else{
            this.is_short_castling = false;
            this.is_long_castling = false;
        }

        if (position == this.position){
            return false;
        }
        let d_path = this.diagonal_path(position)
        let s_path = this.square_path(position)
        if (Array.isArray(d_path)){
            return d_path
        }else{
            return s_path
        }
    }
    move(position){
        //here is the only place where the piece is moved
        this.position = position
    }
    short_castle(){
        this.position = this.short_castle_position
    }
    long_castle(){
        this.position = this.long_castle_position
    }
    show_piece_at_position(){
        if (this.display){
            if (this.is_checked){
                // show piece outside the board
                let x = (this.position%8);
                let y = floor(this.position/8);
                image(this.checked_img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
            }else{
                let x = (this.position%8);
                let y = floor(this.position/8);
                image(this.img, x*boardsize/8, y*boardsize/8, boardsize/8, boardsize/8);
            }
        }
    }
}

class Queen extends Piece {
    constructor(color, position){
        super(color, 'queen', position)
    }
    calculate_path_to(position){
        if (position == this.position){
            return false;
        }
        let d_path = this.diagonal_path(position)
        let s_path = this.square_path(position)
        if (!Array.isArray(d_path)){
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