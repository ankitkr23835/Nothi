from flask import Flask, render_template, request, send_from_directory
import os
import zipfile

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        zip_file = request.files['zip_file']
        zip_filename = zip_file.filename
        upload_folder = 'uploads'
        os.makedirs(upload_folder, exist_ok=True)
        zip_filepath = os.path.join(upload_folder, zip_filename)
        zip_file.save(zip_filepath)

        with zipfile.ZipFile(zip_filepath, 'r') as zip_ref:
            zip_ref.extractall(upload_folder)

        extracted_folder = os.path.splitext(zip_filename)[0]
        return render_template('extracted.html', extracted_folder=extracted_folder)

@app.route('/download/<path:filename>', methods=['GET'])
def download(filename):
    download_folder = 'uploads'
    return send_from_directory(download_folder, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
