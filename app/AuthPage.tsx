import React from "react";
import axios from "axios";
interface AuthPageProps {
  onAuth: (user: { username: string; secret: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usernameInput = e.currentTarget.username as HTMLInputElement;
        const username = usernameInput.value;
      
        axios.post('https://localhost:5173/auth', { username })
          .then(response => {
            const userData = { ...response.data, secret: username };
            onAuth(userData);
          })
          .catch((error) => {
            console.error("Error", error);
          });
      };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>

        <div className="form-subtitle">Set a username to get started</div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
