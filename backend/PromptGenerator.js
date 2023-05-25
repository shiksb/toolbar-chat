

const BASE_PROMPT = 'You are a helpful chatbot.\n';

const TONE = {
    'Natural': '',
    'Empathetic': '{{tone}} Your tone is empathetic towards the user\n',
    'Introspective': '{{tone}} Your tone is introspective towards the user\n',
    'Optimistic': '{{tone}} Your tone is optimistic towards the user\n',
    'Objective': '{{tone}} Your tone is objective towards the user\n',
};

const POLITENESS = {
    'LowPoliteness': '{{politeness}} You are not very polite\n',
    'NormalPoliteness': '',
    'HighPoliteness': '{{politeness}} You are very polite\n',
};

const PRONOUN = {
    'First': '',
    'Second': '{{pronoun}} You use second person pronouns\n',
    'Third': '{{pronoun}} You use third person pronouns\n',
};

const VERBOSITY = {
    'LowVerbosity': '{{verbosity}} Your responses are brief\n',
    'NormalVerbosity': '',
    'HighVerbosity': '{{verbosity}} Your responses are verbose\n',
};

const VOCAB = {
    'child': '{{vocab}} Use simple words in your responses\n',
    'highschool': '',
    'university': '{{vocab}} Use complex words in your responses\n',
    'expert': '{{vocab}} Talk like an expert\n',
};

const LANGUAGE = {
    'english': '',
    'french': '{{language}} Give all your responses in French\n',
    'spanish': '{{language}} Give all your responses in Spanish\n',
    'python': '{{language}} Communicate your responses in basic python\n',
}

const PERSUASION = {
    'neutral': '',
    'Scarcity': '{{persuasion}} Use scarcity in your responses\n',
    'SocialProof': '{{persuasion}} Use social proof in your responses\n',
    'Likability': '{{persuasion}} Use likability in your responses\n',
    'Authority': '{{persuasion}} Use authority in your responses\n',
    'EmotionalAppeal': '{{persuasion}} Use emotional appeal in your responses\n',
}

const LINGUISTIC_HEDGING = {
    'lowHedge': '',
    'highHedge': '{{linguistic_hedging}} Use a lot of linguistic hedging in your responses\n',
}

const PERSONA = {
    'normal': '',
    'musk': '{{persona}} Respond in the style of Elon Musk\n',
    'peterson': '{{persona}} Respond in the style of Jordan Peterson\n',
    'chomsky': '{{persona}} Respond in the style of Noam Chomsky\n',
    'feynman': '{{persona}} Respond in the style of Richard Feynman\n',
}

const ELEMENTS = {
    'natural': '',
    'story': '{{elements}} Respond using a story',
    'jokes': '{{elements}} Respond using a joke',
    'idioms': '{{elements}} Respond using idioms',
    'examples': '{{elements}} Respond using examples',
    'analogy': '{{elements}} Respond using an analogy',
    'sarcasm': '{{elements}} Respond in a sarcastic style',
    'emojis': '{{elements}} Add emojis in each response',
    'hints': '{{elements}} Respond with a hint without revealing the actual answer',
    'internetSlang': '{{elements}} Respond using some internet slang',

}


const swapParam = (prompt, tag, newVal) => {
    const tagIndex = prompt.indexOf(tag);
    if (tagIndex === -1) {
        return prompt + newVal;
    }
    const lineEndIndex = prompt.indexOf('.', tagIndex);
    const line = prompt.substring(tagIndex, lineEndIndex + 1);
    return prompt.replace(line, newVal);
}

const generatePrompt = (systemPrompt, semanticConfigs, responseConfigs) => {

    const {
        tone,
        politeness,
        pronoun,
        verbosity,
        vocab,
        language,
    } = semanticConfigs;

    // semantic
    systemPrompt = swapParam(systemPrompt, '{{tone}}', TONE[tone]);
    systemPrompt = swapParam(systemPrompt, '{{politeness}}', POLITENESS[politeness]);
    systemPrompt = swapParam(systemPrompt, '{{pronoun}}', PRONOUN[pronoun]);
    systemPrompt = swapParam(systemPrompt, '{{verbosity}}', VERBOSITY[verbosity]);
    systemPrompt = swapParam(systemPrompt, '{{vocab}}', VOCAB[vocab]);
    systemPrompt = swapParam(systemPrompt, '{{language}}', LANGUAGE[language]);

    // response
    const {
        persuasion,
        ling_hedge,
        persona,
        ctx_window,
        augmentation,
        elements,
    } = responseConfigs;

    systemPrompt = swapParam(systemPrompt, '{{persuasion}}', PERSUASION[persuasion]);
    systemPrompt = swapParam(systemPrompt, '{{linguistic_hedging}}', LINGUISTIC_HEDGING[ling_hedge]);
    systemPrompt = swapParam(systemPrompt, '{{persona}}', PERSONA[persona]);
    systemPrompt = swapParam(systemPrompt, '{{elements}}', ELEMENTS[elements]);


    return systemPrompt;
}

export default generatePrompt;