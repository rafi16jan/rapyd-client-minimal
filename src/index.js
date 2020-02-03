// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle';

// Import Framework7-React plugin
import Framework7React from 'framework7-react';

import * as Framework7Components from 'framework7-react';

// Import main App component
import App from './app.js';

/*import Page from './components/Page.jsx';

import Flatpickr from './components/Flatpickr.jsx';*/

// Framework7 styles
import 'framework7/css/framework7.min.css';

// Icons
import './css/icons.css';

// Custom app styles
import './css/app.css';

import {React as Selectivity, Templates} from 'selectivity/react';
import 'selectivity/styles/selectivity-react.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import csv from 'csv.js';
import FileSaver from 'file-saver';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import api from 'api';

OfflinePluginRuntime.install({onInstalled: () => OfflinePluginRuntime.update(), onUpdateReady: () => api.tools ? api.globals.app.dialog.confirm('Update available, apply it?', () => OfflinePluginRuntime.applyUpdate(() => window.location.reload())) : OfflinePluginRuntime.applyUpdate(() => window.location.reload())});

// Init Framework7-React plugin
Framework7.use(Framework7React);

window.React = React;
window.ReactDOM = ReactDOM;

window.rapydComponents = {...Framework7Components, ...window.rapydComponents};

api.client = {api, components: window.rapydComponents, selectivity: {Selectivity, Templates}, flatpickr, csv, Framework7Components, FileSaver, AgGridReact};

// Mount React App
(async () => {
  const wait_session = api.get_session();
  try {
    window.addEventListener('beforeinstallprompt', async (event) => {
      event.preventDefault();
      await wait_session;
      api.globals.InstallPromp = event;
      await api.wait_exist(() => document.getElementById('pwa_install_button'));
      document.getElementById('pwa_install_button').style.display = 'inline-block';
    });
  }
  catch (error) {
    console.error(error);
  }
  await wait_session;
  const tools = api.tools;
  if (!tools) return ReactDOM.render(React.createElement(App), document.getElementById('app'))
  else return api.client.init()
})();
