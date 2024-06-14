import React from 'react'

interface PromptProps {
    prompt: string[];
}

function Prompt({ prompt }: PromptProps) {
    return (

        <div className='text'>
            <h2>Prompt</h2>
            {prompt.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>

    )
}

export default Prompt