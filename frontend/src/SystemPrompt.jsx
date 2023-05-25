import React, { useState } from 'react';

function SystemPrompt({ onUpdate, systemPrompt }) {

    const [prompt, setSystemPrompt] = useState(systemPrompt);

    const handleSystemPromptUpdate = (event) => {
        setSystemPrompt(event.target.value);
        onUpdate(event.target.value);
    };

    const promptStyle = {
        display: 'flex',
        fontSize: '1em',
        lineHeight: '1.1',
        textAlign: 'left',
        height: '100px',
        flex: '1',
    }

    return (
        <div style={promptStyle}>
            <textarea style={{ width: '100%', border: '1px solid #000000'}} value={systemPrompt}
                onChange={(e) => {
                    handleSystemPromptUpdate(e)
                }}/>
        </div>
    );
}

export default SystemPrompt;