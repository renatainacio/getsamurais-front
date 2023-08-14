import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #41d7d8;
        font-family: 'Lexend Deca', sans-serif;
        color: #D84241
    }
    button{
        width: 182px;
        height: 60px;
        border-radius: 12px;
        background-color: #41d842;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: white;
        margin: 25px;
    }
    input{
        width: 600px;
        height: 60px;
        border-radius: 12px;
        border: 1px solid rgba(120, 177, 89, 0.25);
        margin: 12px;
        padding: 0 25px;
        font-size: 16px;
        color: #474A51;
    }
    ::placeholder{
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        color: rgba(156, 156, 156, 1);
        font-size: 16px;
        padding: 0 15px;
    }

    select{
        width: 652px;
        height: 60px;
        border-radius: 12px;
        border: 1px solid rgba(120, 177, 89, 0.25);
        margin: 12px;
        padding: 0 25px;
        font-size: 16px;
        font-family: 'Lexend Deca', sans-serif;
        color: #474A51;
        font-weight: 400;
    }
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export default GlobalStyle;