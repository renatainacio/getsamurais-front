import { styled } from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Samurais() {

    const [list, setList] = useState([]);
    const url = import.meta.env.VITE_API_URL;
    const { auth } = useAuth();
    let config;

    config = {
        headers: {
          "Authorization": `Bearer ${auth ? auth.token : ""}`
        }
      }

    useEffect(() => {
        const promise = axios.get(`${url}/services`, config);
        promise.then((res) => {
            setList(res.data);
        });
        promise.catch((err) => alert(err.response.data));
    }, []);



    return(
        <List>
            <h2>Serviços Disponíveis</h2>
            <Board>
                <table>
                    <tr>
                        <th>Serviço</th>
                        <th>Prestador</th>
                        <th>Preço</th>
                        <th>Localidade</th>
                        <th>Contato</th>
                    </tr>
                { list.length > 0 ?
                    list.map((service, index) =>
                        <tr key={service.id}>
                            <td>
                                <div>
                                    <img src={service.photo ? service.photo : "naodisponivel.png"} />
                                    <span>{service.description}</span>
                                </div>
                            </td>
                            <td>{service.username}</td>
                            <td>{service.price/100} {service.priceUnit ? `/ ${service.priceUnit}` : "" }</td>
                            <td>{service.city} - {service.state}</td>
                            <td>{service.email} {service.phone}</td>
                        </tr>
                    )
                    : <p>Ainda não há serviços disponíveis</p>
                }
                </table>
            </Board>
            { auth ? "" : <h2>Crie sua conta para usar nosso serviço!</h2>}
        </List>
    )
}

const List = styled.div`
    background-color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        font-weight: 700;
        font-size: 36px;
        line-height: 45px;
    }
    img {
        width: 35px;
    }
    p{
        text-align: center;
    }
`;

const Board = styled.div`
    margin-top: 50px;
    margin-bottom: 70px;
    border-radius: 24px 24px 0 0;
    border-width: 1px;
    padding: 25px 20px;
    display: flex;
    justify-content: center;
    width: 1300px;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px 0px rgba(120, 177, 89, 0.25);
    table{
        text-align: left;
        line-height: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        table-layout:fixed;
        width: 1250px;
        tr {
            width: 1250px;
        }
        th{
            font-weight: 700;
            padding: 20px;
            width: 250px;
            font-size: 20px;
            border: 1px solid rgba(120, 177, 89, 0.25);
        }
        td {
            margin: 12px;
            color: #545454;
            border: 1px solid rgba(120, 177, 89, 0.25);
            padding: 20px;
            width: 250px;
            text-align: center;
            vertical-align: middle;
            div{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
    }
    img {
        width: 150px;
    }
`;