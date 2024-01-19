import React, { useEffect, useState } from 'react';

// GameNavbar bileşeni için props'ları tanımladık
interface Props { flipCount: number, gameOver: boolean  };

export function GameNavbar({ flipCount, gameOver }: Props) {
  const [gameHistory, setGameHistory] = useState<{ flipCount: number }[]>([]);
   // Oyun geçmişini saklamak için bir state oluşturudk

  useEffect(() => { // Oyun bittiğinde geçmişi güncellemek için useEffect kullandık
    // gameOver true olduğunda yeni bir nesne ekleyerek gameHistory'yi güncelledik
    if (gameOver) {
      setGameHistory(prevHistory => [...prevHistory, {flipCount}]);
    }
  }, [flipCount, gameOver]);
   // En iyi skoru gameHistory'den almak için fonksiyon yazdık
  console.log(gameHistory)
  const getBestScore = (history: any[]) => {//game history içerisindeki en iyi skoru bulduğumuz kısım
    const bestScore = history.length > 0 ? Math.min(...history.map(item => item.flipCount)) : null;
    return bestScore !== null ? "En iyi skor: ${bestScore} ": 'Henüz skor yok';
  };

  return (

    <div>
      <div className="fixed top-0 left-0 p-4 text-black">
        <p className="font-bold shadow">Son Oyun Skorları:</p>
      <ul>
        {gameHistory.slice(0, 10).map((item, index) => (
          <li key={index}>{item.flipCount}</li>
        ))}
      </ul>
      </div>
      <div className="fixed top-0 left-40 p-4 text-black">
        <p className="font-bold shadow">En İyi Skor:</p>
        <p>{getBestScore(gameHistory)}</p>
      </div>
      <div className="flex justify-between mb-4 text-lg">
        <span>{flipCount}</span>
        <span>
          {gameOver ? (
            <React.Fragment>
              Tebrikler! 🎉{' '}
            </React.Fragment>
          ) : (
            'İyi Şanslar!'
          )}
        </span>
      </div>
    </div>
  );
}