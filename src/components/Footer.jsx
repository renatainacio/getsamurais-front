import { styled } from "styled-components";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <Bottom>
      <div>
        <h2>Get Samurais</h2>
        <h2>Entre em Contato!</h2>
        <p>Whatsapp: +55 (XX) XXXXX-XXXX</p>
        <p>Email: contato@getsamurais.com</p>
      </div>
      <SocialMedia>
        <SocialIcon url="https://instagram.com"></SocialIcon>
        <SocialIcon url="https://facebook.com"></SocialIcon>
        <SocialIcon url="https://twitter.com"></SocialIcon>
        <SocialIcon url="https://tiktok.com"></SocialIcon>
      </SocialMedia>
    </Bottom>
  );
}

const Bottom = styled.footer`
  width: 100%;
  height: 250px;
  background: #f6f6f6;
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  color: #545454;
  font-weight: 400;
  font-size: 14px;
  h2 {
    margin: 20px 0;
    font-size: 16px;
    font-weight: 700;
  }
  p {
    margin-bottom: 5px;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  width: 230px;
  justify-content: space-around;
`;
