from __future__ import print_function
from flask import Flask, render_template
from flask import request, jsonify, Markup
import sqlite3

app = Flask(__name__)
app.debug = True


def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

def get_game(gameid):
    conn = get_db_connection()
    game_records = conn.execute("SELECT * FROM games WHERE gameid = ?", (gameid,)).fetchall()
    if len(game_records) == 0:
        conn.execute("INSERT INTO games (gameid) VALUES (?)", (gameid,))
        conn.commit()
    game_records = conn.execute("SELECT * FROM games WHERE gameid = ?", (gameid,)).fetchall()
    conn.close()
    return game_records

@app.route("/<gameid>", methods=["GET"])
def index(gameid):
    """
    # TODO this has to be queried to the DB
    # if there has been a post request
    mode should be games[-1]['fen'] and if move is there should also pass the move
    
    """

    game_records = get_game(gameid)
    return render_template(
        "index.html",
        mode={
            "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            "move": ["f2", "f4"],
        }, 

    )



@app.route("/gui_response", methods=["POST"])
def get_fen_string():
    if request.method == "POST":
        input_json = request.get_json(force=True)
        print(f"flask fen response{input_json}")
        return jsonify([123])


@app.route("/move", methods=["POST"])
def move():
    # this function with take the content of the post and save into the database
    move_action = request.get_json(force=True)
    fen = move_action["fen"]
    from_square, to_square = move_action["move"]
    print(f"flask move {move_action}")
    return render_template(
        "index.html", mode={"fen": fen, "move": [from_square, to_square]}
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
