import { styled } from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Samurais() {

    const [list, setList] = useState([]);
    const url = import.meta.env.VITE_API_URL;
    const { auth } = useAuth();

    useEffect(() => {
        // const promise = axios.get(`${url}/list`);
        // promise.then((res) => {
        //     setList(res.data);
        // });
        // promise.catch((err) => alert(err.response.data));
    }, []);



    return(
        <Rank>
            <h2><img src="trophy.png"/> list</h2>
            <Board>
                <ul>
                    { list.length > 0 ?
                        list.map((user, index) =>
                            <li key={user.id}>
                                {index + 1}. {user.name} - {user.linksCount} links - {user.visitCount} visualizações
                            </li>
                        )
                        : ""
                    }
                </ul>
            </Board>
            { auth ? "" : <h2>Crie sua conta para usar nosso serviço!</h2>}
        </Rank>
    )
}

const Rank = styled.div`
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
`;

const Board = styled.div`
    margin-top: 50px;
    margin-bottom: 70px;
    border-radius: 24px 24px 0 0;
    border-width: 1px;
    padding: 25px 20px;
    width: 850px;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px 0px rgba(120, 177, 89, 0.25);
    li {
        margin: 12px;
    }
`;