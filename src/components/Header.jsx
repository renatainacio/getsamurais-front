import { styled } from "styled-components"
import {Link} from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask"; 

export default function Header() {
    const { auth, signOut } = useAuth();
    const navigate = useNavigate();

    return(
        <HeaderSC>
            <TopMenu>
                <LeftOptions>
                    { auth ? <GreenP onClick={signOut}>Seja bem-vindo(a), {auth ? auth.username : ""}!</GreenP> : <GreenP>  </GreenP>}
                </LeftOptions>
                <RightOptions>
                    { auth ? <p><Link to="/">Home</Link></p> : <GreenP><Link to="/signin">Entrar</Link></GreenP>}
                    { auth ? <p><Link to="/samurais">Samurais</Link></p> : <p><Link to="/signup">Cadastrar-se</Link></p> }
                    { auth ? <p onClick={() => {signOut(); navigate("/signin")}}>Sair</p> : "" }
                </RightOptions>
            </TopMenu>
            <Logo>
                <img src="samurai_1623791.png"/>
                <h1>Get Samurais</h1>
            </Logo>
        </HeaderSC>
    )
}

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
  img{
    width: 50px;
    padding-right: 25px;
  }  
  h1{
    margin-top: 20px;
  }
`;

const RightOptions = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #474A51;
    p {
        padding: 0 15px;
    }
`;

const LeftOptions = styled.div`
    width: 400px;
`;

const TopMenu = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const GreenP = styled.p`
    color: #D84241;
`


const HeaderSC = styled.div`
    background-color: #FFFFFF;
    font-family: 'Borel', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 100px;
    a:-webkit-any-link {
    text-decoration: none;
    color: inherit;
  }
`;