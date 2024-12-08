from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

users_file = 'users.json'
if not os.path.exists(users_file):
    with open(users_file, 'w') as f:
        json.dump({}, f)

def load_users():
    try:
        with open(users_file, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Erro ao carregar os usuários: {e}")
        return {}

def save_users(users):
    try:
        with open(users_file, 'w') as f:
            json.dump(users, f)
    except Exception as e:
        print(f"Erro ao salvar os usuários: {e}")

@app.route('/register', methods=['POST'])
def register():
    # Verifique se o tipo de conteúdo é JSON
    if request.is_json:
        data = request.get_json()  # Isso garante que o corpo seja tratado como JSON
        email = data.get('email')
        password = data.get('password')

        try:
            users = load_users()
            if email in users:
                return jsonify({"message": "Usuário já registrado."}), 400

            users[email] = {"password": password}
            save_users(users)
            return jsonify({"message": "Cadastro realizado com sucesso."}), 201
        except Exception as e:
            print(f"Erro ao registrar usuário: {e}")
            return jsonify({"message": "Erro ao processar a solicitação de cadastro."}), 500
    else:
        return jsonify({"message": "A requisição precisa ser no formato JSON."}), 400

@app.route('/login', methods=['POST'])
def login():
    # Verifique se o tipo de conteúdo é JSON
    if request.is_json:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        try:
            users = load_users()
            if email not in users or users[email]['password'] != password:
                return jsonify({"message": "Credenciais inválidas."}), 401

            return jsonify({"message": "Login bem-sucedido."}), 200
        except Exception as e:
            print(f"Erro ao tentar fazer login: {e}")
            return jsonify({"message": "Erro ao processar a solicitação de login."}), 500
    else:
        return jsonify({"message": "A requisição precisa ser no formato JSON."}), 400

if __name__ == '__main__':
    app.run(debug=True)
