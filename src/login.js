import React from 'react';
import {
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  //ListButton,
  Button,
} from 'framework7-react';
import api from 'api';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  async componentDidMount() {
    for (let input of document.querySelectorAll('input[type=text], input[type=password]')) {
      input.addEventListener('keyup', this.clickEvent.bind(this));
    }
    const load = api.preload();
    if (window.rapyd_config.choose_database) this.setState({databases: await api.ajax('get', 'json', window.localStorage.rapyd_server_url + '/api/databases')});
    load.done();
  }

  render() {
    return (
      <Page noToolbar noNavbar noSwipeback loginScreen>
        <LoginScreenTitle>Welcome</LoginScreenTitle>
        <List form>
          {this.state.databases &&
          <ListInput
            required
            id="login-page-database"
            label="Database"
            type="select"
            onInput={(e) => {
              this.setState({ database: e.target.value});
            }}
          >
            <option disabled selected value=''>Choose</option>
            {this.state.databases && this.state.databases.map((database) =>
            <option style={{color: '#212121'}} value={database}>{database}</option>
            )}
          </ListInput>
          }
          <ListInput
            label="Username"
            type="text"
            placeholder="Your username"
            value={this.state.username}
            onInput={(e) => {
              this.setState({ username: e.target.value});
            }}
            autofocus
          />
          <ListInput
            label="Password"
            type="password"
            placeholder="Your password"
            value={this.state.password}
            onInput={(e) => {
              this.setState({ password: e.target.value});
            }}
          />
          <Button onClick={this.signIn.bind(this)} style={{float: 'left', marginLeft: '10px'}}>Login</Button>
          <Button onClick={this.setUrl.bind(this)} style={{float: 'right', marginRight: '10px'}}>Settings</Button>
        </List>
      </Page>
    )
  }
  clickEvent(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.signIn();
    }
  }
  setUrl() {
    const app = this.$f7;
    app.dialog.prompt('', 'Server URL', (url) => localStorage.rapyd_server_url = url);
    const input = document.querySelector('input.dialog-input');
    if (input) {
      input.value = localStorage.rapyd_server_url;
    }
  }
  async signIn() {
    const load = api.preload();
    const self = this;
    const app = self.$f7;
    //const router = self.$f7.router;
    try {
      const success = await api.login({login: self.state.username, password: self.state.password, encrypted: false, ...(this.state.database ? {database: this.state.database} : {})});
      load.done();
      if (!success) {
        return app.dialog.alert('Username/Password wrong, relogin');
      }
      app.dialog.alert('Login Successful!', () => {
        window.location.reload();
      });
    }
    catch(error) {
      load.done();
      app.dialog.alert('Network Error');
      throw error;
    }
  }
}
