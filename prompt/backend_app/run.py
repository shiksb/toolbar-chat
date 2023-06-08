
from mflix.factory import create_app
import os

if __name__ == "__main__":
    app = create_app()
    app.config['MONGO_URI'] = 'mongodb://127.0.0.1:27017'
    os.environ['OPENAI_API_KEY'] = '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'
    os.environ['REPLICATE_API_TOKEN'] = 'r8_Otg0u7VDoh8zbztRgMCbXt1eyWQH7b42BrQAL'
    os.environ['COHERE_API_KEY'] = 'aCWoVTmXOnq56ZDtXN3r66VemIfB4oBUuvtA06u2'
    app.run(port=8000, debug=True)
