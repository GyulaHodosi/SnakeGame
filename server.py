from flask import Flask, render_template, request, redirect
import data_manager

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', scores=data_manager.getScores())


@app.route('/game')
def game():
    return render_template('game.html')


@app.route('/addScore', methods=['POST'])
def addScore():
    data_manager.addScore(request.form['name'], request.form['score'])

    return redirect('/')

@app.route('/gameOver', methods=['POST'])
def gameOver():
    return render_template('gameOver.html', score=request.form['score'])

if __name__ == '__main__':
    app.run(debug=True)
