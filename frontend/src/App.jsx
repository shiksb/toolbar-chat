import { useState } from "react";

import "./App.css";
import ModelToolbar from "./ModelToolbar";
import SemanticToolbar from "./SemanticToolbar";
import ResponseToolbar from "./ResponseToolbar";
import SystemPrompt from "./SystemPrompt";
import CompletionToolbar from "./CompletionToolbar";


function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [modelConfigs, setModelConfigs] = useState({
    api_key: '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',
    model: 'gpt-3.5-turbo',
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: '',
    mock: true,
  });
  const [semanticConfigs, setSemanticConfigs] = useState({
    tone: 'Natural',
    politeness: 'NormalPoliteness',
    pronoun: 'First',
    verbosity: 'NormalVerbosity',
    form: 'free',
    vocab: 'highschool',
    language: 'english',
  });
  const [responseConfigs, setResponseConfigs] = useState({
    persuasion: 'neutral',
    ling_hedge: 'lowHedge',
    persona: 'normal',
    ctx_window: 'all',
    augmentation: 'single',
    elements: 'natural',
  });

  const [completionConfigs, setCompletionConfigs] = useState({
    quit: 'quit',
    action: 'summary',
    email: 'shikharbakhda@gmail.com',
  });

  const [systemPrompt, setSystemPrompt] = useState("Agent Personality:\nYou are a helpful assistant.\n");
  const [bylawsPrompt, setBylaws] = useState("Bylaws:\nAdhere to the below bylaws in all your responses.\n");
  const [custProfilePrompt, setCustomerProfile] = useState("User Profile:\nUse the below user facts in your responses when appropriate.\n");
  const [terminationPrompt, setTerminationConditions] = useState("Termination Conditions:\n");

  const [tokenCount, setTokenCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;

    setIsTyping(true);
    scrollTo(0, 1e10);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    if (message === completionConfigs['quit']) {
      msgs.push({ role: "system", content: 'terminated' });
      setChats(msgs);
      setIsTyping(false);
      return;
    }

    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
        modelConfigs,
        semanticConfigs,
        responseConfigs,
        systemPrompt,
        bylawsPrompt,
        custProfilePrompt,
        terminationPrompt,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSystemPrompt(data.systemPrompt);
        setBylaws(data.bylawsPrompt);
        setCustomerProfile(data.custProfilePrompt);

        let msgs = chats;
        let output = data.output.content.split('AUGMENTATION');
        if (output.length === 3) {
          msgs.push({ role: "assistant", content: output[1] });
          msgs.push({ role: "assistant", content: output[2] });
        } else {
          msgs.push({ role: "assistant", content: data.output.content });
        }

        setTokenCount(data.tokenCount);
        setChats(msgs);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModelConfigsUpdate = (data) => {
    setModelConfigs(data);
  };

  const handleSemanticConfigsUpdate = (data) => {
    setSemanticConfigs(data);
  };

  const handleResponseConfigUpdate = (data) => {
    setResponseConfigs(data);
  };

  const handleCompletionConfigUpdate = (data) => {
    setCompletionConfigs(data);
  };

  const handleSystemPromptUpdate = (data) => {
    setSystemPrompt(data);
  };

  const handleBylawsUpdate = (data) => {
    setBylaws(data);
  };

  const handleCustomerProfileUpdate = (data) => {
    setCustomerProfile(data);
  };

  const handleTerminationConditionsUpdate = (data) => {
    setTerminationConditions(data);
  };


  const devPanel = {
    position: 'sticky',
    top: '0',
  }

  const toolbarStyle = {
    display: 'flex',
    fontSize: '0.8em',
    lineHeight: '2',
    textAlign: 'center',
  }

  return (
    <main>
      <div className="app-container">

        <div style={devPanel}>
          <div><h1 style={{ textAlign: "center" }}>{tokenCount + chatCount} tokens</h1></div>
          <div style={{ border: '1px solid #000000' }}>
            <ModelToolbar onUpdate={handleModelConfigsUpdate} initialConfigs={modelConfigs} toolbarStyle={toolbarStyle} />
            <SemanticToolbar onUpdate={handleSemanticConfigsUpdate} initialConfigs={semanticConfigs} toolbarStyle={toolbarStyle} />
            <ResponseToolbar onUpdate={handleResponseConfigUpdate} initialConfigs={responseConfigs} toolbarStyle={toolbarStyle} />
            <CompletionToolbar onUpdate={handleCompletionConfigUpdate} initialConfigs={completionConfigs} toolbarStyle={toolbarStyle} />
          </div>
          <div style={{ display: 'flex', flex: '1', displayDirection: 'row' }}>
            <SystemPrompt onUpdate={handleSystemPromptUpdate} systemPrompt={systemPrompt} promptType='Base' />
            <SystemPrompt onUpdate={handleBylawsUpdate} systemPrompt={bylawsPrompt} promptType='Bylaws' />
            <SystemPrompt onUpdate={handleCustomerProfileUpdate} systemPrompt={custProfilePrompt} promptType='Profile' />
            <SystemPrompt onUpdate={handleTerminationConditionsUpdate} systemPrompt={terminationPrompt} promptType='Termination' />
          </div>
        </div>

        <div className="chat-container">
          {/* chat */}
          <div><section>
            {chats && chats.length
              ? chats.map((chat, index) => (
                <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                  <span>
                    <b>{chat.role.toUpperCase()}</b>
                  </span>
                  <span>:</span>
                  <span>{chat.content}</span>
                </p>
              ))
              : ""}
          </section></div>

          {/* typing */}
          <div className={isTyping ? "" : "hide"}>
            <p>
              <i>{isTyping ? "Typing" : ""}</i>
            </p>
          </div>
        </div>

        <div style={{ position: 'sticky', bottom: '0', width: '100%' }}>
          <form action="" onSubmit={(e) => chat(e, message)}>
            <input
              className="chat-input"
              type="text"
              name="message"
              value={message}
              placeholder="Type a message here and hit enter..."
              onChange={async (e) => {
                setMessage(e.target.value);
                setChatCount(parseInt(e.target.value.length / 4));
              }}
            />
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
