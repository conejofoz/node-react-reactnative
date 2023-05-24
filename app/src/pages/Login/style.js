import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: 'center';
    justify-content: 'center';
    background-color: '#161616';
`;
export const Logo = styled.View`
    paddingBottom: 20;
    marginBottom: 20;
    height: 120;
    width: 120;
`;

export const InputForm = styled.TextInput`
    background-color: '#fff';
    width: '90%';
    margin-bottom: 15;
    color: '#222';
    font-size: 18;
    border-radius: 7;
    padding: 10;
`;

export const BtnSubmitForm = styled.TouchableOpacity`
    background-color: '#ebb105';
    width: '90%';
    height: 45;
    align-items: 'center';
    justify-content: 'center';
    border-radius: 7;
`;
export const TxtSubmitForm = styled.Text`
    color: '#fff';
    font-size: 22;
`;
export const LinkNewUser = styled.Text`
    color: '#fff';
    font-size: 18;
    margin-top:15;
`;





