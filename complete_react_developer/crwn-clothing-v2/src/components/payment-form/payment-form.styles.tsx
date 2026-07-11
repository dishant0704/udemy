import styled from 'styled-components';

import Button from '../button/button.component';
import { ReactNode } from 'react';

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 800px) {   
    width: 100%;
  }  
`;

interface CartIconContainerProps {
  onSubmit: () => void;
  children: ReactNode
}

export const FormContainer = styled.form<CartIconContainerProps>`
  height: 100px;
  min-width: 500px;
  @media only screen and (max-width: 800px) {   
    min-width: 100%;
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
