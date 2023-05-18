from __future__ import print_function
from flask import Flask, render_template
from flask import request, jsonify, Markup

app = Flask(__name__)
app.debug = True


@app.route("/", methods=["GET"])
def index():
    return render_template(
        "index.html",
        mode={"fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
              "move": ['f2', 'f4']},
    )

@app.route("/fen_response", methods=["POST"])
def get_fen_string():
    if request.method == "POST":
        input_json = request.get_json(force=True)
        print(f"flask fen response{input_json}")
        return jsonify([123])


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
