/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, dice, gamePlaying;
var diceDOM = document.querySelector('.dice'); // shortens for future use
init();


// Activates "roll dice" button 
document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying) {

        // 1. random number between 1 & 6
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display result
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score only if rolled number is NOT a 1
        if (dice !== 1) {
            // Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        // Next player
        } else {
            nextPlayer();
        }   
    }

}); 

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying){
        // Add current score to global score
        scores[activePlayer] += roundScore;
        
        // Update the UI
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];

        // Check if player won 
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' +activePlayer).textContent = 'Winner!!';
            diceDOM.style.display = 'none'; 
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');

            gamePlaying = false;
        
        // Next player
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
     // Next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;

     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
     diceDOM.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init); //listener calls init


function init(){
    // Sets variables to initial values
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
  
    // Dice disappears
    diceDOM.style.display = 'none'; 

    // Resets scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Resets Player 1 & 2 visuals
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}





