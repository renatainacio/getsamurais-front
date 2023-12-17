import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import api from "../services/Api";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  let config;

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const promise = api.signIn({ ...formData });
    promise.then((res) => {
      setLoading(false);
      getUserDetails(res.data.token);
    });
    promise.catch((err) => {
      setLoading(false);
      if (err.response.status && err.response.status === 401)
        alert("Não autorizado");
      else
        alert("Erro no servidor");
    });
    setLoading(false);
  }

  function getUserDetails(token) {
    config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    const promiseUser = axios.get(`${import.meta.env.VITE_API_URL}/users/me`, config);
    const userData = {};
    promiseUser.then((resp) => {
      userData.username = resp.data.username;
      userData.token = token;
      userData.gender = resp.data.gender;
      signIn(userData);
      navigate("/");
    });
    promiseUser.catch((err) => {
      setLoading(false);
      alert(err.response.data);
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <SignInContainer>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          placeholder="Senha"
          type="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button disabled={loading || !formData.email || !formData.password}>
          Entrar
        </button>
      </form>
      <p>Ainda não é usuário? <Link to="/signup">Cadastre-se</Link></p>
    </SignInContainer>
  );
}

const SignInContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  p {
    margin-top: 10px;
    color: #545454;
  }
  width: 100vw;
  height: calc(100vh - 285px);
  padding: 25px;
`;
