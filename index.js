/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import {name as appName} from './app.json';
import store from './src/redux/store';
import Navigation from './src/navigation';

AppRegistry.registerComponent(appName, () => () => (
	<Provider store={store}>
		<Navigation />
	</Provider>
));
