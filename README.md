To use create a .env file with variable OPENROUTER_API_KEY.

To run the Flask server, create a virtual environment and install the dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install pymupdf pygame ftfy sentence-transformers numpy openai python-dotenv flask flask-cors supabase
```

Then run the backend server:

```bash
python3 backend.py
```

The server will run on `localhost:5000` by default.
