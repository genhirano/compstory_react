import React from 'react'

interface TextProps {
    creater: string;
    text: string[];
}

function Text({ text, creater }: TextProps) {

    return (
        <div className='text'>
            <h2>{creater}</h2>
            {text.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    )
}

export default Text