import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

//How to use
//AsyncStorage.setItem('fb_token',token);
//AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if(token) {
        dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token})
    } else {
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    let {type, token} = await Facebook.logInWithReadPermissionsAsync('105814419986371', {
        permissions: ['public_profile']
    });
    if(type === 'cancel') {
        return dispatch({type: FACEBOOK_LOGIN_FAIL});
    }
    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
