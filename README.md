# tic_tac_toe

_The following challenge was part of a job interview._

_The initial commit is the submited code._

Coding Challenge for Frontend Developers 


Create a TicTacToe game in Angular 6 or above!


## Game mechanics

2 Player can play on the same computer (in the same application). Both players take turns. 
The app will decide at random which player will go first. In the next game/round, the last rounds loser will go first. If it is a draw, the app decides again. The app should indicate which players turn it is. 

Once a player has 3 in a row he wins. If no player achieved 3 in a row and no more moves are possible, it is a draw. 
The app keeps track of the win count for each player during its life cycle (Once the app reloads it is ok if all the progression is lost).

## Programming

* Create a new Angular project from scratch
* Implement the game mechanics using a reasonable organization of components and/or services
* Write a complete unit test for at least one component or service
* Style the app at your own discretion

## My Approach

The board is modelled as a one dimensional array.
 
For example a classic 3x3 tic-tac-toe game (a draw in this case) would be 

['X','O','X',

 'X','O','X',

 'O','X','O']

The win conditions and board generation support all board sizes greater than 2 by 2 .
