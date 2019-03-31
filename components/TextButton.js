import Colors from "../constants/Colors";
import { PrimaryText } from "./styled";
import React from "react";
import { getScreenWidth } from "../utils/helpers";
import styled from "styled-components/native";

export default function TextButton({
  children = {},
  onPress = () => {},
  disabled = false,
  color = null
}) {
  return (
    <Button onPress={onPress} disabled={disabled} color={color}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  background-color: ${props => (props.color ? props.color : Colors.primary)};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  min-width: ${getScreenWidth(0.9)};
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
