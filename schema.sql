DROP TABLE IF EXISTS games;

-- #TODO maybe this could be state action response structure

CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER, 
    move_id INTEGER NOT NULL,
    color_turn TEXT NOT NULL,
    fen TEXT NOT NULL,
    from_square TEXT,
    to_square TEXT,
    valid_move BOOLEAN,
    fen_response TEXT,
    FOREIGN KEY (game_id) REFERENCES results(game_id)
);

CREATE TABLE results(
    game_id INTEGER PRIMARY KEY,
    winner TEXT NOT NULL,
    total_moves TEXT NOT NULL
);