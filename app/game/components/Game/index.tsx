'use client';

import React, { useState, useEffect } from "react";

import { GameNavbar } from "../GameNavbar";
import { Board } from "../Board";

export function Game() {
  // Oyunun durumunu (bitti mi, devam ediyor mu) ve kaç kere kart çevrildiğini takip etmek için state'leri tanımla
  const [gameOver, setGameOver] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
 // Sayfa yenilendiğinde veya bileşen ilk oluşturulduğunda oyun durumunu ve çevrilen kart sayısını sıfırladığımız yer
  useEffect(() => {
    setGameOver(false);
    setFlipCount(0);
  }, []);


  return (
    <div className="game">

      <GameNavbar flipCount={flipCount} gameOver={gameOver} />
      <Board setGameOver={setGameOver} setFlipCount={setFlipCount} />
    </div>
  );
}