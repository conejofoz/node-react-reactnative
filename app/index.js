/**
 * @format
 */

//import 'react-native-gesture-handler' //não tem nessa versão

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
