import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import api from "../services/Api";
import { IMaskInput } from "react-imask";
import axios from "axios";
import PasswordChecklist from 'react-password-checklist';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    cpf: "",
    gender: "",
    phone: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const promiseUfs = axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    promiseUfs.then((res) => {
      setUfs(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return alert("A senha e a confirmação de senha devem ser iguais!");
    }
    const data = { ...formData };
    delete data.confirmPassword;
    const promise = api.signUp(data);
    promise.then(() => {
      setLoading(false);
      navigate("/signin");
    });
    promise.catch((err) => {
      setLoading(false);
      if(err.response.status === 409)
        alert("Usuário já cadastrado");
      else if(err.response.status === 422)
        alert("Dados inconsistentes");
      else
        alert("Erro interno do servidor");
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleChangeState(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const promiseCities = axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e.target.value}/municipios`);
    promiseCities.then((res) => {
      setCities(res.data);
    })

  }

  return (
    <SignUpContainer>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome Completo *"
          name="fullName"
          type="text"
          autoComplete="name"
          value={formData.fullName}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          placeholder="Como gostaria de ser chamado? *"
          name="username"
          type="text"
          autoComplete="given-name"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          placeholder="E-mail *"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <IMaskInput
          placeholder="CPF *"
          name="cpf"
          type="text" 
          value={formData.cpf}
          onChange={handleChange}
          required
          disabled={loading}
          mask="000.000.000-00"
        />
        <Gender>
          <div>
            <input name="gender" type="radio" id="female" value="female" onClick={handleChange} disabled={loading}/>
            <label htmlFor="female">Feminino</label><br></br>
          </div>
          <div>
            <input name="gender" type="radio" id="male" value="male" onClick={handleChange} disabled={loading}/>
            <label htmlFor="male">Masculino</label><br></br>
          </div>
          <div>
            <input name="gender" type="radio" id="non-binary" value="non-binary" onClick={handleChange} disabled={loading}/>
            <label htmlFor="non-binary">Não Binário</label><br></br>
          </div>
          <div>
            <input name="gender" type="radio" id="agender" value="agender" onClick={handleChange} disabled={loading}/>
            <label htmlFor="agender">Agênero</label><br></br>
          </div>
        </Gender>
        <IMaskInput
          placeholder="Telefone *"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          disabled={loading}
          mask="(00)00000-0000"
        />
        <select id="state" name="state" onChange={handleChangeState} disabled={loading}>
          <option value="">Selecione o Estado *</option>
          {
            ufs.map(uf =>
                <option key={uf.id}>
                   {uf.sigla}
                </option>
            )
          }
        </select>
        <select id="city" name="city" onChange={handleChange} disabled={loading}>
          <option value="">Selecione a Cidade *</option>
          {
            cities.map(city =>
                <option key={city.id}>
                   {city.nome}
                </option>
            )
          }
        </select>
        <input
          placeholder="Escolha uma foto"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          placeholder="Senha *"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          placeholder="Confirmar Senha *"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Checklist>
          <PasswordChecklist
            rules={["minLength","specialChar","number","capital","match"]}
            minLength={6}
            value={formData.password}
            valueAgain={formData.confirmPassword}
            onChange={(isValid) => {}}
          />
        </Checklist>
        <button
          disabled={
            loading ||
            !formData.email ||
            !formData.fullName ||
            !formData.city ||
            !formData.cpf ||
            !formData.phone ||
            !formData.state ||
            !formData.username ||
            !formData.password ||
            !formData.confirmPassword
          }
        >
          Criar Conta
        </button>
      </form>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.main`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100vw;
  height: calc(100vh - 285px);
  padding: 25px;
  color: #474A51;
`;

const Gender = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  width: 769px;
  input {
    width: 150px;
  }
  div{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #474A51;
  }
`;

const Checklist = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  width: 622px;
  margin: 12px;
`;