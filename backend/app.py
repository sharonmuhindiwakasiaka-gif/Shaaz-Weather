from flask import Flask,jsonify

app = Flask(__name__)

@app.route("/")


def home():

    return "Welcome to shaaz weather Backend!"
@app.route("/api/test")
def test_api():
    return jsonify({"message": "Shaaz Weather API is working!"})

if __name__ == "__main__":
    app.run(debug=True)
