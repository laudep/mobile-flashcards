import Colors from "../constants/Colors";
import { PrimaryText } from "./styled";
import React from "react";
import styled from "styled-components/native";

export default function TextButton({
  children = {},
  onPress = () => {},
  disabled = false
}) {
  return (
    <Button onPress={onPress} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  background-color: ${Colors.primary};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  min-width: 200px;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
`;

const ButtonText = styled(PrimaryText)`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
