from flask import Blueprint, request, jsonify
from mflix.db import get_all_prompts, add_prompt, delete_all_prompts, get_prompt_by_name

from flask_cors import CORS

from mflix.api.langchain import inference, chat, MODEL_CONFIGS


prompts_api = Blueprint(
    'prompts_api', 'prompts_api', url_prefix='/api/prompts')

CORS(prompts_api)

@prompts_api.route('/', methods=['GET'])
def get_prompts():
    return jsonify(get_all_prompts())

@prompts_api.route('/delete_all_prompts', methods=['GET'])
def delete_prompts():
    delete_all_prompts()
    return jsonify({'success': True})

@prompts_api.route('/create_prompt', methods=['POST'])
def create_prompt():
    body = request.json
    add_prompt(body.get('name'), body.get('prompt_template'), body.get('model'), body.get('hyperparameters'), body.get('prompt_type'))
    return jsonify({'success': True})

@prompts_api.route('/create_completion', methods=['POST'])
def create_completion():
    body = request.json
    name = body.get('prompt_name')
    dynamic_vars = body.get('dynamic_vars')

    try:
        prompt = get_prompt_by_name(name)
    except ValueError:
        return jsonify({'error': 'Prompt by name ' + name + ' not found'})
    prompt_template = prompt.get('prompt_template')

    model = prompt.get('model')

    if model not in MODEL_CONFIGS.keys():
        raise ValueError("Model not supported")
    
    if prompt.get('prompt_type') == 'completion':
        completion = inference(model, prompt_template, prompt.get('hyperparameters'), dynamic_vars)
    elif prompt.get('prompt_type') == 'chat':
        completion = chat(model, prompt_template, prompt.get('hyperparameters'), dynamic_vars)
    else:
        raise ValueError("Prompt type not supported")
    
    return jsonify({prompt.get('prompt_type'): completion, 'prompt_template': prompt_template})
