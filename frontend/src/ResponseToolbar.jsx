
import React, { useState } from 'react';



function ResponseToolbar({ onUpdate, initialConfigs, toolbarStyle }) {

    const [responseConfigs, setResponseConfigs] = useState(initialConfigs);

    const handleResponseConfigChange = (event, key) => {
        const updatedResponseConfigs = { ...responseConfigs };
        updatedResponseConfigs[key] = event.target.value;
        setResponseConfigs(updatedResponseConfigs);
        onUpdate(updatedResponseConfigs);
    };

    return (
        <div style={{...toolbarStyle, backgroundColor: '#bdffa2'}}>

            <div className="tool">Persuasion </div>
            <div className="tool"><select value={responseConfigs.persuasion}
                onChange={(e) => {
                    handleResponseConfigChange(e, 'persuasion')
                }}>
                <option value="neutral">Neutral</option>
                <option value="Scarcity">Scarcity</option>
                <option value="SocialProof">Social Proof</option>
                <option value="Likability">Likability</option>
                <option value="Authority">Authority</option>
                <option value="EmotionalAppeal">Emotional Appeal</option>
                
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Linguistic Hedging </div>
            <div className="tool"><select value={responseConfigs.ling_hedge}
                onChange={(e) => {
                    handleResponseConfigChange(e, 'ling_hedge')
                }}>
                <option value="lowHedge">Low</option>
                <option value="highHedge">High</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Persona </div>
            <div className="tool"><select value={responseConfigs.persona}
                onChange={(e) => {
                    handleResponseConfigChange(e, 'persona')
                }}>
                <option value="normal">Normal</option>
                <option value="musk">Elon Musk</option>
                <option value="peterson">Jordan Peterson</option>
                <option value="chomsky">Noam Chomsky</option>
                <option value="feynman">Richard Feynman</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Context Window </div>
            <div className="tool"><select value={responseConfigs.ctx_window}
                onChange={(e) => {
                    handleResponseConfigChange(e, 'ctx_window')
                }}>
                <option value="all">all</option>
                <option value="last10">last 10 chats</option>
                <option value="last5">last 5 chats</option>
                <option value="last2">last 2 chats</option>
                <option value="independent">independent</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Augmented </div>
            <div className="tool"><select value={responseConfigs.augmentation}
                onChange={(e) => {
                    handleResponseConfigChange(e, 'augmentation')
                }}> 
                <option value="single">Single</option>
                <option value="simp_elab">Simple|Elaborate</option>
                <option value="eng_fr">English|French</option>
                <option value="conc_exp">Conclusion|Explanation</option>
                <option value="claim_ev">Claim|Evidence</option>
                <option value="text_key">Text|Keywords</option>
            </select></div>
            <div style={{ flex: 1 }}></div>

            <div className="tool">Response Elements </div>
            <div className="tool"><select value={responseConfigs.elements}
                onChange={(e) => {
                    handleResponseConfigChange(e, 'elements')
                }}> 
                <option value="natural">natural</option>
                <option value="story">story</option>
                <option value="jokes">jokes</option>
                <option value="idioms">idioms</option>
                <option value="examples">examples</option>
                <option value="analogy">analogy</option>
                <option value="sarcasm">sarcasm</option>
                <option value="emojis">emojis</option>
                <option value="hints">hints</option>
                <option value="internetSlang">internet slang</option>
            </select></div>
            <div style={{ flex: 1 }}></div>
        </div>
    );
};

export default ResponseToolbar;