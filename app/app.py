from flask import Flask, render_template
import os
import socket

# Determine environment (blue or green)
ENVIRONMENT = os.environ.get('DEPLOY_ENV', 'blue')

app = Flask(__name__)

@app.route('/')
def home():
    hostname = socket.gethostname()
    return render_template('index.html', 
                          environment=ENVIRONMENT, 
                          hostname=hostname)

@app.route('/health')
def health():
    return {'status': 'healthy', 'environment': ENVIRONMENT}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)