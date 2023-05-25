import React, { useState } from 'react';



function SemanticToolbar({ onUpdate, initialConfigs, toolbarStyle }) {

    const [semanticConfigs, setSemanticConfigs] = useState(initialConfigs);

    const handleSemanticConfigChange = (event, key) => {
        const updatedSemanticConfigs = { ...semanticConfigs };
        updatedSemanticConfigs[key] = event.target.value;
        setSemanticConfigs(updatedSemanticConfigs);
        onUpdate(updatedSemanticConfigs);
    };

    return (
        <div style={{...toolbarStyle, backgroundColor: '#f8e8a3'}}>
            <div className="tool">Tone </div>
            <div className="tool"><select value={semanticConfigs.tone}
                onChange={(e) => {
                    handleSemanticConfigChange(e, 'tone')
                }}>
                <option value="Natural">Natural</option>
                <option value="Empathetic">Empathetic</option>
                <option value="Introspective">Introspective</option>
                <option value="Optimistic">Optimistic</option>
                <option value="Objective">Objective</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Politeness </div>
            <div className="tool"><select value={semanticConfigs.politeness}
                onChange={(e) => {
                    handleSemanticConfigChange(e, 'politeness')
                }}>
                <option value="LowPoliteness">Low</option>
                <option value="NormalPoliteness">Normal</option>
                <option value="HighPoliteness">High</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Pronoun </div>
            <div className="tool"><select value={semanticConfigs.pronoun}
                onChange={(e) => {
                    handleSemanticConfigChange(e, 'pronoun')
                }}>
                <option value="First">First Person</option>
                <option value="Second">Second Person</option>
                <option value="Third">Third Person</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Verbosity </div>
            <div className="tool"><select value={semanticConfigs.verbosity}
                onChange={(e) => {
                    handleSemanticConfigChange(e, 'verbosity')
                }}>
                <option value="LowVerbosity">Low</option>
                <option value="NormalVerbosity">Normal</option>
                <option value="HighVerbosity">High</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Form </div>
            <div className="tool"><select value={semanticConfigs.form}
                onChange={(e) => {
                    handleSemanticConfigChange(e, 'form')
                }}>
                <option value="free">free flow</option>
                <option value="tweet">Tweet</option>
                <option value="linkedin">LinkedIn</option>
                <option value="medium">Medium</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Vocab Level </div>
            <div className="tool"><select value={semanticConfigs.vocab}
                onChange={(e) => {
                    handleSemanticConfigChange(e, 'vocab')
                }}>
                <option value="child">Child</option>
                <option value="highschool">Highschool</option>
                <option value="university">University</option>
                <option value="expert">Expert</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Language </div>
            <div className="tool"><select value={semanticConfigs.language}
                onChange={(e) => {
                    handleSemanticConfigChange(e, 'language')
                }}>
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
                <option value="python">python</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

        </div>
    );
};

export default SemanticToolbar;