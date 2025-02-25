import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./App.css"; // Ensure this CSS file is included
import { makeShuffledDeck } from "./utils.jsx";

function App(props) {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);

  // Player scores
  const [Player1Score, setPlayer1Score] = useState(0);
  const [Player2Score, setPlayer2Score] = useState(0);
  // Game over state
  const [gameOver, setGameOver] = useState(false);
  const [isFlipped, setIsFlipped] = useState([false, false]);

  // Deal cards 
  const dealCards = () => {
    if (cardDeck.length < 2) return;


    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      setPlayer1Score(Player1Score + 1);
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      setPlayer2Score(Player2Score + 1);
    }

    if (cardDeck.length === 0) {
      setGameOver(true);
    }

    setIsFlipped([true, true]);

    setTimeout(() => {
      setIsFlipped([false, false]);
    }, 600);
  };

  // Restart the game
  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
  };

  const currCardElems = currCards.map(({ name, suit }, index) => (
    <div key={`${name}${suit}`}>
      {name} of {suit}
    </div>
  ));

  // whos winner !! 
  return (
    <div className="container">
      <h2>React High Card 🚀</h2>
      <div className="player-section">
        <div className="player-card">
          <h3>Player 1</h3>
          <Card className={`flip-card ${isFlipped[0] ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Card.Body>
                  <Card.Title>{currCards[0]&&currCardElems[0]}</Card.Title>
                </Card.Body>
              </div>
              <div className="flip-card-back">
                <Card.Body>
                  <Card.Title>
                  {currCards[0]&&currCardElems[0]}
                  </Card.Title>
                </Card.Body>
              </div>
            </div>
          </Card>
          <h4>Score: {Player1Score}</h4>
        </div>

        <div className="player-card">
          <h3>Player 2</h3>
          <Card className={`flip-card ${isFlipped[1] ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Card.Body>
                  <Card.Title>
                  {currCards[1]&&currCardElems[1]}

                  </Card.Title>
                </Card.Body>
              </div>
              <div className="flip-card-back">
                <Card.Body>
                  <Card.Title>
                  {currCards[1]&&currCardElems[1]}
                  </Card.Title>
                </Card.Body>
              </div>
            </div>
          </Card>
          <h4>Score: {Player2Score}</h4>
        </div>
      </div>
      <div className="button-section">
        {!gameOver ? (
          <Button onClick={dealCards}>Deal</Button>
        ) : (
          <div>
          {Player1Score > Player2Score && <h4>player 1 won this game ! </h4> }
          {Player2Score > Player1Score && <h4>player 2 won this game ! </h4> }
          {Player2Score == Player1Score && <h4>It's a draw ! </h4> }
          <Button onClick={restartGame}>Restart Game</Button>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
