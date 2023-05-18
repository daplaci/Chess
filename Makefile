install:
	pip install --upgrade pip &&\
		pip install -r requirements.txt

format:
	black *.py

lint:
	pylint --disable=R,C app.py
	npx eslint static/*.js

test:
	python -m pytest -vv test_app.py

all: install lint test format