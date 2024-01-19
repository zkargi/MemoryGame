import { MouseEventHandler } from 'react';

import './index.css';

interface Props {
  value: string;//kart ikonları
  onCardClick: MouseEventHandler<HTMLDivElement>;//fare tıklamasına yanıt
  isFlipped: boolean;//kartın çevrilme durumu
  isFound: boolean;//kartın bulunup bulunmama durumu
}
export function Card({ value, onCardClick, isFlipped, isFound }: Props) {
  return (
    <div className={`card ${(isFlipped || isFound)? 'card-flipped' : ''}`} onClick={onCardClick}>
      <div className="card-front">{value}</div>
      <div className="card-back"></div>
    </div>
  );
}


