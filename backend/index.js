import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import generatePrompt from "./PromptGenerator.js";
import tiktoken from 'tiktoken-node';

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const MOCK = {
  role: 'assistant',
  content: "This is a mock response."
}

const API_KEY = "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";
let openai;
let enc = tiktoken.getEncoding("gpt2");

const configuration = new Configuration({
  apiKey: API_KEY,
});
openai = new OpenAIApi(configuration);


function makePrompt(request) {
  let {
    chats,
    modelConfigs,
    semanticConfigs,
    responseConfigs,
    systemPrompt,
    bylawsPrompt,
    custProfilePrompt,
    terminationPrompt,
  } = request.body;

  // BASE PROMPT
  let newSystemPrompt = generatePrompt(systemPrompt, semanticConfigs, responseConfigs);

  // AUGMENTATION
  let augmentation = '';
  if (responseConfigs['augmentation'] !== 'single') {
    augmentation += ' Follow this instruction carefully: Provide 2 responses to each user query as stated below. Start each response with the text "AUGMENTATION". ';
  }
  if (responseConfigs['augmentation'] === 'simp_elab') {
    augmentation += 'First response is simple, second is more elaborate.';
  } else if (responseConfigs['augmentation'] === 'eng_fr') {
    augmentation += 'First response is in English, second response is in French.';
  } else if (responseConfigs['augmentation'] === 'conc_exp') {
    augmentation += 'First response is a simple conclusion, second response is an explanation.';
  } else if (responseConfigs['augmentation'] === 'claim_ev') {
    augmentation += 'First response is a claim, second response is some evidence.';
  } else if (responseConfigs['augmentation'] === 'text_key') {
    augmentation += 'First response is the text, second response is the keywords.';
  }

  // TERMINATION
  terminationPrompt = terminationPrompt.replace('Termination Conditions:', '');
  // if (terminationPrompt !== 'Termination Conditions:') {
  //   terminationPrompt = 'Evaluate the user response against each of the following criteria. If the criteria is met, respond with the single word "TERMINATE":' + terminationPrompt;
  // }


  let combinedPrompt = newSystemPrompt + '\n' + augmentation + '\n' + bylawsPrompt + '\n' + custProfilePrompt + '\n' + terminationPrompt;
  combinedPrompt = combinedPrompt.replace(/{{.*}}/g, '').replace('  ', '');
  console.log(combinedPrompt);

  return {
    combinedPrompt,
    systemPrompt: newSystemPrompt,
    bylawsPrompt,
    custProfilePrompt,
    terminationPrompt,
  };
}

app.post("/", async (request, response) => {

  let {
    chats,
    modelConfigs,
    semanticConfigs,
    responseConfigs,
    systemPrompt,
    bylawsPrompt,
    custProfilePrompt,
    terminationPrompt,
    mock,
  } = request.body;
  let combinedPrompt;

  ({
    combinedPrompt,
    systemPrompt,
    bylawsPrompt,
    custProfilePrompt,
    terminationPrompt,
  } = makePrompt(request));

  // CONTEXT WINDOW
  if (responseConfigs['ctx_window'] === 'last10') {
    chats = chats.slice(-10);
  } else if (responseConfigs['ctx_window'] === 'last5') {
    chats = chats.slice(-5);
  } else if (responseConfigs['ctx_window'] === 'last2') {
    chats = chats.slice(-2);
  } else if (responseConfigs['ctx_window'] === 'independent') {
    chats = chats.slice(-1);;
  }

  const openAIParams = {
    model: modelConfigs['model'],
    messages: [
      {
        role: "system",
        content: combinedPrompt,
      },
      ...chats,
    ],
    temperature: parseFloat(modelConfigs['temperature']),
    max_tokens: parseInt(modelConfigs['max_tokens']),
    top_p: parseFloat(modelConfigs['top_p']),
    // stream: modelConfigs['stream'] === 'on' ? true : false,
    frequency_penalty: parseFloat(modelConfigs['frequency_penalty']),
    presence_penalty: parseFloat(modelConfigs['presence_penalty']),
  };

  try {
    const mock = modelConfigs.mock;
    const result = mock ? '' : await openai.createChatCompletion(openAIParams);
    // console.log(result.data.choices[0]);
    let output = mock ? MOCK : result.data.choices[0].message;
    // console.log(output);
    if (output.content.includes('TERMINATE')) {
      output = { role: 'system', content: 'TERMINATE' };
    }

    // token counter
    let promptTokenCount = enc.encode(combinedPrompt).length;
    let {
      chats,
    } = request.body;
    let chatTokenCount = 0;
    chats.forEach((chat) => {
      chatTokenCount += enc.encode(chat.content).length;
    });
    const tokenCount = promptTokenCount + chatTokenCount; 
    
    response.json({
      systemPrompt,
      bylawsPrompt,
      custProfilePrompt,
      output,
      tokenCount
    });
  } catch (err) {
    console.log('error', JSON.stringify(err.message));
    console.log(openAIParams)
  }
});

app.post("/count", async (request, response) => {
  try {
    response.json({
      tokenCount: enc.encode(response.text).length,
    });
  } catch (err) {
    console.log('error', JSON.stringify(err.message));
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
