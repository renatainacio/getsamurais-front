import { styled } from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
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
      const service ={...formData, price: formData.price*100};
      const promise = axios.post(`${import.meta.env.VITE_API_URL}/services`, service, config);
      promise.then(() => {
        setUpdate(update + 1);
      });
      promise.catch((err) => {
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

    function deleteService(id, description){
        if(window.confirm(`Tem certeza que deseja excluir o serviço ${description}?`)){
            const promise = axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`, config);
            promise.then(() => {
                setUpdate(update + 1);
              });
              promise.catch((err) => {
                alert(err.response.data);
              });
        }
    }

    function toggleService(item){
        let service = {
            categoryId: item.categoryId,
            photo: item.photo,
            description: item.description,
            price: item.price,
            priceUnit: item.priceUnit,
            status: false
        }
        item.status === false ? service.status = true : service.status = false;
        const promise = axios.put(`${import.meta.env.VITE_API_URL}/services/${item.id}`, service, config);
        promise.then(() => {
          setLoading(false);
          setUpdate(update + 1);
        });
        promise.catch((err) => {
          setLoading(false);
          alert(err.response.data);
        });
    }

    function editService(id){
        navigate(`/services/${id}`)
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
                <h2>Meus Serviços</h2> 
                { userServices.length ? 
                    <ul>
                    {userServices.map((item) => 
                        <li key={item.id}>
                            <div>
                                <p>{item.description}</p>
                                <p>R$ {item.price/100} per {item.priceUnit}</p>
                            </div>
                            <div>
                                <button onClick={() => toggleService(item)}><p>{item.status ? "Desativar" : "Ativar"}</p></button>
                                <button onClick={() => editService(item.id, item.description)}><FaPencilAlt color="rgba(234, 79, 79, 1)" size="30"/></button>
                                <button onClick={() => deleteService(item.id, item.description)}><FaTrash color="rgba(234, 79, 79, 1)" size="30"/></button>
                            </div>
                        </li>)}
                    </ul>
                : <p>Você ainda não possui nenhum serviço cadastrado</p>}

                <h2>Novo Serviço</h2>
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
        color:#417cd8;
        font-weight:700;
        font-size: 24px;
        margin-top: 50px;
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
            p{
                color: #545454;
                font-size: 12px;
                text-align: center;
                margin: 0;
                padding: 0;
            }
        }
    }
`;
