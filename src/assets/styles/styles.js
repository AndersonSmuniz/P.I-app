import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background-color: #2D343C;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const LogoContainer = styled.View`
    align-items: center;
    margin-bottom: 40px;
`;

export const InputContainer = styled.View`
    width: 80%;
`;

export const Button = styled.TouchableOpacity`
    background-color: #FEC200;
    margin-horizontal: 25px;
    padding: 15px;
    border-radius: 8px;
    align-items: center;
    margin-top: 20px;
`;

export const ButtonText = styled.Text`
    color: #2D343C;
    font-weight: 400;
    font-size: 16px;
`;

export const SearchInput = styled.TextInput`
    height: 40px;

`;
