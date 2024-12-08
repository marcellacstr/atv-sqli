// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            setMessage("As senhas não coincidem!");
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', {
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json' // Certifique-se de que o tipo de conteúdo está configurado corretamente
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error); // Imprime o erro para facilitar o diagnóstico
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Ocorreu um erro ao registrar. Tente novamente.");
            }
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h2>Cadastro</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.inputField}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.inputField}
                />
                <input
                    type="password"
                    placeholder="Confirme a Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={styles.inputField}
                />
                <button type="submit" className={styles.registerButton}>Cadastrar</button>
            </form>
        </div>
    );
}

export default Register;
