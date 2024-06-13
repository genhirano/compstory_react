import React from 'react'

interface PromptProps {
    prompt: string[];
}

function Prompt({ prompt }: PromptProps) {
    return (

        <div className='text'>
            <h2>Prompt</h2>
            <div>{prompt}</div>
        </div>

    )
}

export default Prompt