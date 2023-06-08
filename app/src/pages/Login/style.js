import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #161616;
`;
export const Logo = styled.View`
    paddingBottom: 20px;
    marginBottom: 20px;
    height: 120px;
    width: 120px;
`;

export const InputForm = styled.TextInput`
    background-color: #fff;
    width: 90%;
    margin-bottom: 15px;
    color: #222;
    font-size: 18px;
    border-radius: 7px;
    padding: 10px;
`;

export const BtnSubmitForm = styled.TouchableOpacity`
    background-color: #ebb105;
    width: 90%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
`;
export const TxtSubmitForm = styled.Text`
    color: #fff;
    font-size: 22px;
`;
export const LinkNewUser = styled.Text`
    color: #fff;
    font-size: 18px;
    margin-top:15px;
`;





