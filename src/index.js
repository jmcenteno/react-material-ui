import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'babel-polyfill';

import FirebaseConfig from './config/firebase';
import { configureStore } from './app/store';
import registerServiceWorker from './registerServiceWorker';
import Root from './app';

import '../node_modules/normalize.css/normalize.css';
import '../node_modules/animate.css/animate.css';
import './index.css';

firebase.initializeApp(FirebaseConfig);

injectTapEventPlugin();

const store = configureStore();

render(
  <Root store={ store } />,
  document.getElementById('root')
);

registerServiceWorker();
