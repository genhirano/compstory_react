import React, { useState } from 'react'

interface TextProps {
    creater: string;
    text: string[];
}

function Text({ text, creater }: TextProps) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div className='text'>
            <div className="accordion">
                <div className="accordion-header" onClick={toggleAccordion}>
                    <h3>{isOpen ? creater + ' の作品' : '▼' + creater + ' の作品を読んでみる'}</h3>
                </div>

                {isOpen && <div className="accordion-content, balloon">{
                    text.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))
                }</div>}

            </div>
        </div>

    )
}

export default Text