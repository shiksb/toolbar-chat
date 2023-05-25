import React, { useState } from 'react';

function ModelToolbar({ onUpdate, initialConfigs, toolbarStyle }) {

    const [modelConfigs, setModelConfigs] = useState(initialConfigs);

    const handleModelConfigsChange = (event, key) => {
        const updatedModelConfigs = { ...modelConfigs };
        updatedModelConfigs[key] = event.target.value;
        setModelConfigs(updatedModelConfigs);
        onUpdate(updatedModelConfigs);
    };

    const handleMockChange = (event) => {
        const updatedModelConfigs = { ...modelConfigs };
        updatedModelConfigs['mock'] = event.target.checked;
        setModelConfigs(updatedModelConfigs);
        onUpdate(updatedModelConfigs);
    };

    return (
        <div style={{ ...toolbarStyle, backgroundColor: '#ebb1b1' }}>
            <div className="tool"></div>
            <div className="tool">
                <label>API Key</label>
                <input type="text" style={{ width: 150, height: 5 }} value={modelConfigs.api_key}
                    onChange={(e) => {
                        handleModelConfigsChange(e, 'api_key');
                    }} /></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Model </div>
            <div className="tool"><select value={modelConfigs.model}
                onChange={(e) => {
                    handleModelConfigsChange(e, 'model');
                }}>
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                <option value="gpt-3.5-turbo-0301">gpt-3.5-turbo-0301</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">
                Temperature
            </div>
            <div className="tool"><input
                type="range"
                name="temperature"
                min="0"
                max="1"
                step="0.2"
                style={{ width: 50 }}
                value={modelConfigs.temperature}
                onChange={(e) => {
                    handleModelConfigsChange(e, 'temperature');
                }}
            />
            {modelConfigs.temperature}
            </div>

            <div style={{ flex: 1 }}></div>
            <div className="tool">
                MaxTokens
            </div>
            <div className="tool"><input
                type="range"
                min="0"
                max="2048"
                step="128"
                style={{ width: 50 }}
                value={modelConfigs.max_tokens}
                onChange={(e) => {
                    handleModelConfigsChange(e, 'max_tokens');
                }}
            />
            {modelConfigs.max_tokens}
            </div>
            
            <div style={{ flex: 1 }}></div>

            <div className="tool">
                TopP
            </div>
            <div className="tool"><input
                type="range"
                min="0"
                max="1"
                step="0.1"
                style={{ width: 50 }}
                value={modelConfigs.top_p}
                onChange={(e) => {
                    handleModelConfigsChange(e, 'top_p');
                }}
            />
            {modelConfigs.top_p}
            </div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">
                frequencyPenalty
            </div>
            <div className="tool"><input
                type="range"
                min="0"
                max="2"
                step="0.1"
                style={{ width: 50 }}
                value={modelConfigs.frequency_penalty}
                onChange={(e) => {
                    handleModelConfigsChange(e, 'frequency_penalty');
                }}
            />{modelConfigs.frequency_penalty}</div>

            <div style={{ flex: 1 }}></div>
            <div className="tool">
                Mock {modelConfigs.mock}
            </div>
            <div className="tool">
                <input type="checkbox" onChange={(e) => handleMockChange(e)} />
            </div>
            <div style={{ flex: 1 }}></div>
        </div>
    );
}

export default ModelToolbar;