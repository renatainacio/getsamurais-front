import { styled } from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {CurrencyInput} from 'react-currency-mask'

export default function User() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        categoryId: "",
        photo: "",
        description: "",
        price: "",
        priceUnit: ""
    });
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [update, setUpdate] = useState(0);
    const [userServices, setUserServices] = useState([]);
    let config;

    config = {
        headers: {
          "Authorization": `Bearer ${auth ? auth.token : ""}`
        }
      }

    useEffect(() => {
        if (!auth) 
            navigate("/")
        else {
            const promise = axios.get(`${import.meta.env.VITE_API_URL}/users/me/services`, config);
            const promiseCategory = axios.get(`${import.meta.env.VITE_API_URL}/categories`);
            promise.then((res) => {
                console.log(res.data);
                setUserServices(res.data);
            });
            promise.catch((err) => {
                alert(err.response.data);
            });
            promiseCategory.then((res) => {
                setCategories(res.data);
            });
            promiseCategory.catch(err => {
                alert(err.response.data);
            })
        }
    }, [update]);

    function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
      console.log(formData);
      const service ={...formData, price: formData.price*100};
      const promise = axios.post(`${import.meta.env.VITE_API_URL}/services`, service, config);
      promise.then((res) => {
        setLoading(false);
        console.log(res.data);
        setUpdate(update + 1);
      });
      promise.catch((err) => {
        setLoading(false);
        alert(err.response.data);
      });
      setLoading(false);
      setFormData({
        ...formData,
        photo: "",
        description: "",
        price: "",
      });
    }

    function handleChange(e) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleChangeAmount(e, originalValue, maskedValue) {
        setFormData({ ...formData, price: originalValue });
    } 

    return(
        <UserPage>
            {!auth ? <p>Cadastre-se e tenha acesso aos melhores profissionais do Brasil!</p> :   
            <div>
                <h2>Editar Serviço</h2>
                <form onSubmit={handleSubmit}>
                <select id="categoryId" name="categoryId" onChange={handleChange} disabled={loading} required>
                    <option value="">Selecione a Categoria *</option>
                    {
                        categories.map(category =>
                            <option value={category.id} key={category.id}>
                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                            </option>
                        )
                    }
                </select>
                <input
                placeholder="Nome do Serviço *"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={loading}
                />
                <input
                placeholder="Imagem"
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                disabled={loading}
                />
                <CurrencyInput
                defaultValue="0"
                value={formData.price}
                onChangeValue={handleChangeAmount}
                />
                <select id="priceUnit" name="priceUnit" onChange={handleChange} disabled={loading}>
                    <option value="">Preço por</option>
                    <option value="hour">Hora</option>
                    <option value="m2">m²</option>
                    <option value="daily">Diária</option>
                    <option value="page">Página</option>
                    <option value="project">Projeto</option>
                </select>
                <button disabled={loading || !formData.description }>
                Postar Serviço
                </button>
                </form>
            </div>         
            }
        </UserPage>
    )
}

const UserPage = styled.div`
    background-color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        margin-bottom: 20px;
    }
    li {
        margin: 20px;
        width: 1020px;
        height: 62px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #EEEEEE;
        color: #000000;
        border: 1px solid rgba(120, 177, 89, 0.25);
        border-radius: 5px;
        div{
            display: flex;
        }
        p {
            padding: 0 30px;
        }
        button {
            margin: 0px;
            width: 100px;
            height: 62px;
            background-color: white;
            border-radius: 5px;
            border: 1px solid rgba(120, 177, 89, 0.25);
        }
    }
`;
