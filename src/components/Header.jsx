import { styled } from "styled-components"
import {Link} from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { auth, signOut } = useAuth();
    const navigate = useNavigate();

    return(
        <HeaderSC>
            <TopMenu>
                <LeftOptions>
                    { auth ? <HighlightedText><Link to="/me">
                        Seja bem-vind{auth.gender === "female" ? 'a' : auth.gender === "male" ? 'o' : 'e'}, {auth ? auth.username : ""}!
                    </Link></HighlightedText> : <HighlightedText>  </HighlightedText>}
                </LeftOptions>
                <RightOptions>
                    { auth ? <p><Link to="/">Home</Link></p> : <HighlightedText><Link to="/signin">Entrar</Link></HighlightedText>}
                    { auth ? <p><Link to="/samurais">Samurais</Link></p> : <p><Link to="/signup">Cadastrar-se</Link></p> }
                    { auth ? <p onClick={() => {signOut(); navigate("/")}}>Sair</p> : "" }
                </RightOptions>
            </TopMenu>
            <Logo>
                <img src="/samurai_1623791.png"/>
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
    width: 100px;
    padding-right: 25px;
  }  
  h1{
    margin-top: 20px;
    font-size: 40px;
  }
`;

const RightOptions = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #474A51;
    p {
        padding: 0 15px;
    }
`;

const LeftOptions = styled.div`
    width: 400px;
    font-size: 18px;
`;

const TopMenu = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const HighlightedText = styled.p`
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