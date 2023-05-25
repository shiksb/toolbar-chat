
import React, { useState } from 'react';

function CompletionToolbar({ onUpdate, initialConfigs, toolbarStyle }) {

    const [completionConfigs, setCompletionConfigs] = useState(initialConfigs);

    const handleCompletionConfigChange = (event, key) => {
        const updatedCompletionConfigs = { ...completionConfigs };
        updatedCompletionConfigs[key] = event.target.value;
        setCompletionConfigs(updatedCompletionConfigs);
        onUpdate(updatedCompletionConfigs);
    };

    return (
        <div style={{...toolbarStyle, backgroundColor: '#77bbef'}}>

            <div className="tool">Quit Signal </div>
            <div className="tool"><input type="text" style={{ width: 150, height: 5 }} value={completionConfigs.quit}
                onChange={(e) => {
                    handleCompletionConfigsChange(e, 'quit');
                }}/></div>
            <div style={{ flex: 1 }}></div>


            <div className="tool">Email </div>
            <div className="tool"><input type="text" style={{ width: 150, height: 5 }} value={completionConfigs.email}
                onChange={(e) => {
                    handleCompletionConfigsChange(e, 'email');
                }}/></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Upon Completion </div>
            <div className="tool"><select value={completionConfigs.action}
                onChange={(e) => {
                    handleCompletionConfigChange(e, 'action')
                }}>
                <option value="summary">Summary</option>
                <option value="selfEvaluation">Self-Evaluation</option>
                <option value="custEval">Customer Profile</option>
                <option value="custFacts">Customer Facts</option>
            </select></div>
            <div style={{ flex: 1 }}></div>
        </div>
    );
};

export default CompletionToolbar;