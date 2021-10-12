import re
import os
import pickle
from flask import Flask,render_template,redirect,request , url_for

app = Flask(__name__)

def predictText(file):
    # wave to vec code
    # loaded_model = pickle.load(open("/model/data.pkl", 'rb'))
    # loaded_model.predict(file)
    return "predicted text"

@app.route("/", methods=["GET","POST"])
def index():
    output = "hii"
    save_path = ''
    if request.method == "POST":
        dirname = "Audios"
        save_path = os.path.join(dirname, "temp.wav")
        file = request.files['file']
        file.save(save_path)
        output = predictText(file)
    return render_template('index.html',output=output, audio_path = save_path)

if __name__=='__main__':
    app.run(debug=True,port=8000)