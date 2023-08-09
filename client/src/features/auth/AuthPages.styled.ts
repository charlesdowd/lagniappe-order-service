import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form as BootstrapForm } from 'react-bootstrap';
import Button from '../../components/Button/Button';

export const Form = styled(BootstrapForm)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 60px;
  max-width: 320px;
`;

export const Input = styled(Form.Control)`
  width: 320px;
  height: 48px;
  border: 1px solid #c4c9d9;
  border-radius: 6.4px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;

  color: #767e97;
`;

export const Title = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 24px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }

  margin-top: 100px;
`;

export const FormButton = styled(Button)`
  background-color: #ed2228;
  border: none;
  height: 48px;
  width: 320px;
  margin-top: 75px;
  border: 2px solid #ed2228;

  :hover {
    background-color: #cd1e23;
    border: 2px solid #cd1e23;
  }

  :focus {
    background-color: #f84e54;
    color: white;
    border: 2px solid #ed2228;
  }

  :disabled {
    background-color: #f84e54;
    color: white;
    border: 2px solid #ed2228;
  }
`;

export const InfoText = styled(Form.Text)``;

export const LinkText = styled(Link)`
  color: #ed2228;
  text-decoration: none;
  font-weight: bold;

  :hover {
    color: #f84e54;
  }
`;
