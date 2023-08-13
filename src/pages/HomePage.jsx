import { styled } from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function HomePage() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ url: ""});
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(0);
    const [userDetails, setUserDetails] = useState({});
    let config;

    config = {
        headers: {
          "Authorization": `Bearer ${auth ? auth.token : ""}`
        }
      }

    useEffect(() => {
        !auth ? navigate("/samurais") : "";
        // const promise = axios.get(`${import.meta.env.VITE_API_URL}/users/me`, config);
        // promise.then((res) => {
        //     console.log(res.data);
        //     setUserDetails(res.data);
        // });
        // promise.catch((err) => {
        //     setLoading(false);
        //     alert(err.response.data);
        // });
    }, [update]);

    function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
    //   const promise = axios.post(`${import.meta.env.VITE_API_URL}/urls/shorten`, formData, config);
    //   promise.then((res) => {
    //     setLoading(false);
    //     console.log(res.data);
    //     setUpdate(update + 1);
    //   });
    //   promise.catch((err) => {
    //     setLoading(false);
    //     alert(err.response.data);
    //   });
      setLoading(false);
      setFormData({url: ""});
    }

    function deleteUrl(id, shortUrl){
        if(window.confirm(`Tem certeza que deseja deletar a url ${shortUrl}?`)){
            // const promise = axios.delete(`${import.meta.env.VITE_API_URL}/urls/${id}`, config);
            // promise.then((res) => {
            //     setUpdate(update + 1);
            //   });
            //   promise.catch((err) => {
            //     alert(err.response.data);
            //   });
        }
    }

    function redirect(shortUrl){
        navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL}/urls/open/${shortUrl}`);
        alert("URl copiada!");
        // axios.get(`${import.meta.env.VITE_API_URL}/urls/open/${shortUrl}`)
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      } 

    return(
        <Home>
            <form onSubmit={handleSubmit}>
                <input
                placeholder="Links que cabem no bolso"
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                disabled={loading}
                />
                <button disabled={loading || !formData.url}>
                Encurtar link
                </button>
            </form>
            <ul>
            {userDetails.shortenedUrls && userDetails.shortenedUrls.length !== 0 ? 
            userDetails.shortenedUrls.map((item) => 
            <li key={item.id}>
                <div onClick={() => redirect(item.shortUrl)}>
                    <p>{item.url}</p>
                    <p>{item.shortUrl}</p>
                    <p>Quantidade de visitantes: {item.visitCount}</p>
                </div>
                <button onClick={() => deleteUrl(item.id, item.shortUrl)}><FaTrash color="rgba(234, 79, 79, 1)" size="30"/></button>
            </li>)
            : ""}
            </ul>
        </Home>
    )
}

const Home = styled.div`
    background-color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
        flex-direction: row;
    }
    li {
        margin: 20px;
        width: 1020px;
        height: 62px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(120, 177, 89);
        color: white;
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
            height: 62px;
            background-color: white;
            border-radius: 5px;
            border: 1px solid rgba(120, 177, 89, 0.25);
        }
    }
`;
