import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import api from "../services/Api";

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
      console.log(res.data);
      getUserDetails(res.data.token);
    });
    promise.catch((err) => {
      setLoading(false);
      alert(err.response.data);
    });
    setLoading(false);
  }

  function getUserDetails(token) {
    config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    console.log(config);
    // const promiseUser = axios.get(`${import.meta.env.VITE_API_URL}/users/me`, config);
    // const userData = {};
    // promiseUser.then((resp) => {
    //   userData.name = resp.data.name;
    //   userData.token = token;
    //   console.log(userData);
    //   signIn(userData);
    //   navigate("/");
    // });
    // promiseUser.catch((err) => {
    //   setLoading(false);
    //   alert(err.response.data);
    // });
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
    </SignInContainer>
  );
}

const SignInContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 15px;
  p {
    margin-top: 10px;
  }
  width: 100vw;
  height: calc(100vh - 285px);
  padding: 25px;
`;
