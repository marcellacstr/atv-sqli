from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Adiciona suporte a CORS

# Função para conectar ao banco de dados
def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row  # Permite acesso por nome das colunas
    return conn

# Rota de registro
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Inserir o novo usuário no banco de dados
        cursor.execute(f"INSERT INTO users (email, password) VALUES ('{email}', '{password}')")
        conn.commit()

        return jsonify({"message": "Usuário registrado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "Usuário já registrado!"}), 400
    finally:
        conn.close()

# Rota de login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Verificar se o usuário e senha existem e são válidos
    cursor.execute(f"SELECT * FROM users WHERE email = '{email}' AND password = '{password}'")
    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({"message": "Login realizado com sucesso!"}), 200
    else:
        return jsonify({"message": "Credenciais inválidas!"}), 401

if __name__ == '__main__':
    app.run(debug=True)
