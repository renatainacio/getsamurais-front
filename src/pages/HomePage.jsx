import { styled } from "styled-components"
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HomePage() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    let config;

    config = {
        headers: {
          "Authorization": `Bearer ${auth ? auth.token : ""}`
        }
      }

    useEffect(() => {
        auth ? navigate("/me") : "";
    }, []);

    return(
        <Home>
            <h1>Bem-vindo ao Get Samurais!</h1>
            <h2><Link to="/signup">Cadastre-se</Link> ou <Link to="/signin">faça login</Link>  e tenha acesso aos melhores profissionais do Brasil!</h2>
            <div>
                <p>Nossa plataforma foi projetada para conectar pessoas com profissionais talentosos em diversas áreas.</p>
                <p>Com uma comunidade de prestadores de serviços experientes e dedicados, estamos aqui para atender às suas necessidades de maneira eficiente e confiável.</p>
                <p>Junte-se a nós e descubra a conveniência de encontrar os serviços que você procura, tudo em um único lugar.</p>
            </div>
        </Home>
    )
}

const Home = styled.div`
    background-color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 60px;
    margin: 40px 40px;
    border-radius: 15px;
    h1 {
        font-size: 60px;
        margin-top: 20px;
    }
    h2{
        color:#417cd8;
        font-weight:700;
        font-size: 24px;
        margin-top: 50px;
        margin-bottom: 60px;
    }
    a{
        color: #b9d841;
    }
    div{
        display: flex;
        flex-direction: column;
    }
    p{
        color: #545454;
        font-size: 20px;
        line-height: 30px;
    }
`;
