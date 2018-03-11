import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from "./Auth";
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error : '',
            user: {
                _username: '',
                _password: ''
            }
        };
    }
    style = {
        height: 250,
        width: 300,
        margin: '200px auto auto auto',
        display: 'block',
        padding: '20px 20px 20px 20px'
    };
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Ui.Paper zDepth={3} style={this.style}>
                        <div>
                            <Ui.TextField floatingLabelText="Username" onChange={this.onUsernameChange} />
                        </div>
                        <div>
                            <Ui.TextField floatingLabelText="Password" onChange={this.onPasswordChange}
                                          type="password" />
                        </div>
                        <div>
                            <form onSubmit={this.handleLogin}>
                            <Ui.RaisedButton type="submit" label="Login" primary={true} />
                            </form>
                        </div>
                        <div>{this.state.error}</div>
                    </Ui.Paper>
                </div>
            </MuiThemeProvider>
        );
    }

    onUsernameChange = (event) => {
        let user = this.state.user;
        user._username = event.target.value;
        this.setState({
        user: user
    });
    };

    onPasswordChange = (event) => {
        let user = this.state.user;
        user._password = event.target.value;
        this.setState({
        user: user
    });
    };

    handleLogin = (event) => {
        const loginUrl = 'http://restapp.dev/user/login_check';
        const xhr = new XMLHttpRequest();
        xhr.open('post', loginUrl);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // sukces
                // usuwamy bledy
                this.setState({
                    errors: {}
                });
                // zapisujemy token
                Auth.authenticateUser(xhr.response.token);
                // zmieniamy routing
                this.props.history.push('/authors');
            } else {
                // cos poszlo nie tak
                // pobieramy informacje o bledach z
                const error = xhr.response.message ? xhr.response.message : {};
                this.setState({
                    error
                });
            }
        });
        xhr.send(JSON.stringify(this.state.user));
        event.preventDefault()
    };

}
export default Login;