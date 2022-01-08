from __future__ import print_function
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for
import os
import numpy as np

app = Flask(__name__)
app.debug = True

@app.route('/', methods=['GET'])
def index():
    title = 'Chess Board'
    return render_template('index.html',title=title)

@app.route('/train', methods = ['POST'])
def train():
    return

@app.route('/play', methods = ['POST'])
def play():
    return

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)