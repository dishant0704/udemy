import styled from 'styled-components';
import { ReactNode } from 'react';

interface CartIconContainerProps {
  onClick: () => void;
  children: ReactNode
}

export const CartIconContainer = styled.div<CartIconContainerProps>`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;
