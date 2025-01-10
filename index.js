import { AppRegistry, Platform } from 'react-native';
import App from './App';
import appConfig from './app.json';

const appName = Platform.OS === 'ios' ? appConfig.ios?.name ?? appConfig.name : appConfig.name;

AppRegistry.registerComponent(appName, () => App);