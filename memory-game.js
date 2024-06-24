document.addEventListener('DOMContentLoaded', () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const gameBoard = document.getElementById('game-board');
    let cardArray = [...letters, ...letters];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    // Shuffle the cards
    cardArray = cardArray.sort(() => 0.5 - Math.random());

    // Create the cards
    cardArray.forEach(letter => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.textContent = letter;
        card.dataset.letter = letter;
        gameBoard.appendChild(card);
    });

    // Add event listener to the cards
    gameBoard.addEventListener('click', event => {
        const clickedCard = event.target;

        // Ignore clicks on non-cards or already matched cards
        if (!clickedCard.classList.contains('card') || clickedCard.classList.contains('matched') || lockBoard) {
            return;
        }

        clickedCard.classList.remove('hidden');
        clickedCard.classList.add('revealed');

        if (!firstCard) {
            firstCard = clickedCard;
            return;
        }

        secondCard = clickedCard;

        if (firstCard.dataset.letter === secondCard.dataset.letter) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            firstCard.classList.remove('revealed');
            secondCard.classList.remove('revealed');
            firstCard = null;
            secondCard = null;

            // Check if the game is won
            if (document.querySelectorAll('.matched').length === cardArray.length) {
                alert('You win!');
            }
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            }, 1000);
        }
    });
});
