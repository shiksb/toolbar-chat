
## How to set-up

Clone the repository.

Start a python virtual env:
```
# navigate to the backend_app directory
cd backend_app

# create the virtual environment for MFlix
python3 -m venv mflix-venv

# activate the virtual environment
source mflix_venv/bin/activate
```

Install dependencies
```
python3 -m pip install -r requirments.txt
```

## Start the mongo server

```
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

## Create the prompt collection

```
mongosh
> use local
> db.createCollection('prompts')
```

## Start the application

```
python ./run.py
```

Open your browser on http://localhost:8000
