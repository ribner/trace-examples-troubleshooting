# An example Starlette application

Install and run in venv:

```shell
cd python/starlette
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -e [/FULL PATH TO DD-TRACE-PY FOLDER]
python app.py
```

Open `http://127.0.0.1:8000/` in your browser:

![Homepage](https://raw.githubusercontent.com/encode/starlette-example/master/docs/index.png)

Navigate to path that is not routed, eg `http://127.0.0.1:8000/nope`:

![Homepage](https://raw.githubusercontent.com/encode/starlette-example/master/docs/404.png)

Raise a server error by navigating to `http://127.0.0.1:8000/error`:

![Homepage](https://raw.githubusercontent.com/encode/starlette-example/master/docs/500.png)

Switch the `app = Starlette(debug=True)` line to `app = Starlette()` to see a regular 500 page instead.
