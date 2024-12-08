import sqlite3

# Conecte-se ao banco de dados ou crie-o caso não exista
conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Crie a tabela de usuários
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
''')

conn.commit()
conn.close()
