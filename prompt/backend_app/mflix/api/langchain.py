from langchain.llms import OpenAI, Replicate, Cohere
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

MODEL_CONFIGS = {
    'openai/gpt-3.5-turbo': OpenAI,
    'replicate/vicuna-13b': Replicate,
    'cohere': Cohere,
}

def get_dynamic_vars_from_prompt(template):
    var_list = []
    for var in template.split('{'):
        if '}' in var:
            var_list.append(var.split('}')[0])
    return var_list

def validate_template_string(template, dynamic_vars):

    var_list = get_dynamic_vars_from_prompt(template)

    missing_vars = []
    for var in var_list:
        if var not in dynamic_vars.keys():
            missing_vars.append(var)
    if len(missing_vars) > 0:
        raise ValueError("Please insert missing dynamic variables: " + ', '.join(missing_vars))

def validate_dynamic_vars(template, dynamic_vars):
    if isinstance(template, str):
        validate_template_string(template, dynamic_vars)
    elif isinstance(template, list):
        for t in template:
            validate_template_string(t, dynamic_vars)

def inference(model, template, hyperparameters, dynamic_vars):
    validate_dynamic_vars(template, dynamic_vars)
    prompt = PromptTemplate(
        input_variables=list(dynamic_vars.keys()), 
        template=template
    )
    llm_chain = LLMChain(prompt=prompt, llm=MODEL_CONFIGS[model](**hyperparameters))
    return llm_chain.predict(**dynamic_vars) 

def chat(model, prompt_template, hyperparameters, dynamic_vars):
    for template in prompt_template:
        # get the first key in dict
        validate_dynamic_vars(list(template.values())[0], dynamic_vars)

    prompts = []
    for p in prompt_template:
        p_val = list(p.values())[0]

        var_list = get_dynamic_vars_from_prompt(p_val)

        prompt = PromptTemplate(
            template=p_val,
            input_variables=[v for v in list(dynamic_vars.keys()) if v in var_list],
        )
        if p.get('system'):
            typed_prompt = SystemMessagePromptTemplate(prompt=prompt)
        elif p.get('ai'):
            typed_prompt = AIMessagePromptTemplate(prompt=prompt)
        elif p.get('human'):
            typed_prompt = HumanMessagePromptTemplate(prompt=prompt)
        prompts.append(typed_prompt)

    chat_prompt = ChatPromptTemplate.from_messages(prompts)

    llm_chain = LLMChain(prompt=chat_prompt, llm=MODEL_CONFIGS[model](**hyperparameters))
    return llm_chain.run(**dynamic_vars)