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

export const CenterView = styled.View`
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
