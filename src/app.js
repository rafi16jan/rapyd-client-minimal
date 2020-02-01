import React from 'react';
import {
  App,
  //Panel,
  View,
  Statusbar,
  /*Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  Label,
  Input,
  ListButton,
  BlockFooter*/
} from 'framework7-react';

import routes from './routes';

export default function (props) {

  const f7params = {
    id: 'org.rapyd.client', // App bundle ID
    name: 'App', // App name
    theme: 'md', // Automatic theme detection
    // App routes
    routes: routes(),
    panel: {
      swipe: 'left',
      leftBreakpoint: 960,
      swipeThreshold: 230,
    },
  };

  return (
    <App params={f7params} colorTheme={'gray'}>
      {/* Statusbar */}
      <Statusbar />

      {/* Main View */}
      <View id="main-view" url="/" main className="ios-edges" preloadPreviousPage={false} pushState/>

      {/*
      <Popup id="popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</Block>
          </Page>
        </View>
      </Popup>*/}

    </App>
  );
}
