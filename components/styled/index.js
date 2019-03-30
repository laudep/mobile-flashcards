import Colors from "../../constants/Colors";
import { Constants } from "expo";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.primaryBackground};
  color: white;
  padding-top: ${Constants.statusBarHeight};
  align-items: center;
  justify-content: center;
`;

export const CenterView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${Colors.primaryBackground};
  align-items: center;
  justify-content: center;
  font-size: 75px;
  padding-top: ${Constants.statusBarHeight};
`;

export const PrimaryText = styled.Text`
  color: ${props => (props.color ? props.color : Colors.primary)};
  text-align: center;
`;

export const TitleText = styled(PrimaryText)`
  font-size: 30px;
  font-weight: bold;
  margin: 10px;
`;

export const DescriptionText = styled(PrimaryText)`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const TextInput = styled.TextInput`
  font-size: 30px;
  min-width: 200px;
  border: 0;
  padding: 10px;
  background: transparent;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.primary};
`;
