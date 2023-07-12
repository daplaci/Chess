# series of test for the chess engine app
import pytest
import requests
import json


def test_index():
    r = requests.get("http://0.0.0.0:8000/")
    assert r.status_code == 200


def test_pawn_movement():
    """
    This is an example on how to test a move. The post requests gets an initial fen string and
    a move string. The response is the new fen string after the move is made.
    """

    r = requests.post(
        "http://0.0.0.0:8000/test",
        json={
            "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            "move": ["e2", "e4"],
        },
    )
    assert r.response == "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1"
