// Board/index.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../Card';
import { UNIQUE_CARDS } from '../../../constants';
import './index.css';

// Kart  objemiz için gerekli girdilee sağlandı
interface Card { emoji: string, index: number };
interface Props { setGameOver: Function, setFlipCount: Function };

export function Board({setFlipCount,setGameOver }: Props) {
  const [boardData, setBoardData] = useState<Card[]>([]);//tahta uzerındeki kart bılgısı ıcın state
  const [foundCards, setFoundCards] = useState<Card[]>([]);//bulunan kartlar ıcın state
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);//acılan kartlar için state
  const [gameOver, setGameOverLocal] = useState(false); // Oyun bıtıs kontrolu ıcın bu dosyada kullandıgımız state

  useEffect(() => {// Bileşen oluşturulduğunda oyunu başlatmak için useEffect kullanıyoruz
    initialize();
  
  }, []);

  //cevrilen kartların karşılaştırma yapıldıgı kısım
  useEffect(() => {
    const shouldCompare = flippedCards.length === 2;
    if (shouldCompare) {
      const [firstCard, secondCard] = flippedCards;
      const isFound = firstCard.emoji === secondCard.emoji;

      if (isFound) {
        setFoundCards((foundCards) => [...foundCards, firstCard, secondCard]);
      }

      setTimeout(() => {//acılan kartlar ıcın kapanma suresi
        setFlippedCards([]);
      }, 400);
    }
  }, [flippedCards, setFoundCards, setFlippedCards]);

   // Tüm kartlar bulunduğunda oyunu bitirmek için kullandıgımız yer
  useEffect(() => {
    const areAllCardsFound = boardData.length === foundCards.length;
    console.log(gameOver);
    console.log(setGameOver())
    if (areAllCardsFound) {
      setGameOverLocal(true);
      setGameOver(true);
    }
  }, [boardData.length, foundCards.length,setGameOverLocal]);
// Oyunu başlatan fonksiyon
  function initialize() {
    shuffle();
    setFoundCards([]);
    setFlippedCards([]);
    setGameOverLocal(false);
    setFlipCount(0);
    setGameOver(false);
  }
// Kartları karıştıran fonksiyon
  function shuffle() {
    const duplicateCards = [...UNIQUE_CARDS, ...UNIQUE_CARDS].map((emoji, index) => ({ emoji, index }));
    const shuffledCards = duplicateCards.sort(() => Math.random() - 0.5);
    setBoardData(shuffledCards);
  }
//oyunu sıfırladıgımız kısım
  function resetBoard() {
    initialize();
  }
 // Kart tıklama olayını yaptığımız kısım
  function onCardClick(cardIndex: number) {
    const isFound = Boolean(foundCards.find(({ index }) => index === cardIndex));

    if (!isFound) {
      setFlippedCards([...flippedCards, (boardData.find(({ index }) => index === cardIndex) as Card)]);
      setFlipCount((flipCount: number) => flipCount + 1);
    }
  }

  return (
    <div className="game">
      <div className="board">
        {boardData.map(({ emoji, index }) => (
          <Card
            key={index}
            value={emoji}
            onCardClick={() => onCardClick(index)}
            isFlipped={Boolean(flippedCards.find(({ index: cardIndex }) => cardIndex === index))}
            isFound={Boolean(foundCards.find(({ index: cardIndex }) => cardIndex === index))}
          />
        ))}
      </div>
      {gameOver && (
        <div className="game-over-modal">
          <p>Tebrikler! Kazandiniz!🎉🎉🎉🎉</p>         
          <button onClick={resetBoard}>Tekrar Oyna</button>
        </div>
      )}
    </div>
  );
}