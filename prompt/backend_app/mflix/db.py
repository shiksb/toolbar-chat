from flask import g
from werkzeug.local import LocalProxy
from pymongo import MongoClient


def get_db():
    """
    Configuration method to return db instance
    """
    db = getattr(g, "_database", None)
    client = MongoClient('localhost', 27017)
    db = client.flask_db
    return db

# Use LocalProxy to read the global db instance with just `db`
db = LocalProxy(get_db)

def get_all_prompts():
    prompt_list = list(db.prompts.find({}))
    for prompt in prompt_list:
        prompt.pop('_id', None)
    return prompt_list

def get_prompt_by_name(name):
    prompt = db.prompts.find_one({'name': name})
    if prompt is None:
        raise ValueError("Prompt not found")
    prompt.pop('_id', None)
    return prompt

def add_prompt(name, prompt_template, model, hyperparameters, prompt_type):
    prompt_doc = { 
        'name' : name, 
        'prompt_template' : prompt_template, 
        'model' : model, 
        'hyperparameters' : hyperparameters,
        'prompt_type' : prompt_type
    }
    return db.prompts.insert_one(prompt_doc)

def delete_all_prompts():
    return db.prompts.delete_many({})