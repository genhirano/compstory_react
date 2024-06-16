import React, { useState } from 'react'

interface TextProps {
    creater: string;
    image?: string;
    text: string[];
}

function Text({ text, image, creater }: TextProps) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div className='text'>
            <div className="accordion">
                <h3 className="accordion-header" onClick={toggleAccordion}>
                    <img className="accorditon-header-icon" src={image} alt="logo" />
                    {isOpen ? creater + ' の作品' : '▼' + creater + ' の作品を読んでみる'}
                </h3>
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