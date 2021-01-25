import { URL } from 'react-native-dotenv'

export const rootUrl = URL;
export const prefix = '/tenant';
//
export default `${rootUrl}${prefix}`;
