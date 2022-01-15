from __future__ import print_function
from flask import Flask, render_template
from flask import request, jsonify

app = Flask(__name__)
app.debug = True

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', mode='')

@app.route('/computer', methods=['GET'])
def computer():
    return render_template('index.html', mode='computer')

@app.route('/train', methods = ['GET', 'POST'])
def get_fen_string():
    if request.method == 'POST':
        input_json = request.get_json(force=True)
        print (f"flask received {input_json}")
        return jsonify([123])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)