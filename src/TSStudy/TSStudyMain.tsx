import React, { useState } from 'react'
import Circle from './Circle';
import HandDraw from './HandDraw';
import './TSStudyMain.css';

function TSStudyMain() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="TSStudyMain">
      <div className="TSStudyMainTitle" onClick={toggleAccordion} >▼ Type Script の勉強 </div>
      {isOpen && <div>
        <Circle />
        <HandDraw />
      </div>}
    </div>

  )
}

export default TSStudyMain