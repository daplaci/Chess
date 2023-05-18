DROP TABLE IF EXISTS games;

CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER FOREIGN KEY REFERENCES results(id) NOT NULL,
    move_id INTEGER NOT NULL,
    color_turn TEXT NOT NULL,
    fen TEXT NOT NULL,
    from_square TEXT NOT NULL,
    to_square TEXT NOT NULL
);

CREATE TABLE results(
    game_id INTEGER PRIMARY KEY,
    winner TEXT NOT NULL,
    total_moves TEXT NOT NULL
);