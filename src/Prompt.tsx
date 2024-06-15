import React, { useState } from 'react'

interface PromptProps {
    prompt: string[];
}

function Prompt({ prompt }: PromptProps) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='prompt'>
            <div className="accordion">
                <div className="accordion-header" onClick={toggleAccordion}>
                    <h3>{isOpen ? '▲' : '▼'}プロンプトを見る</h3>
                </div>
                {isOpen && <div className="accordion-content">{
                    prompt.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))
                }</div>}
            </div>
        </div>
    )


}

export default Prompt