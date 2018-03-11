import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom'
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Ui.AppBar
                        title="Book Store"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonTouchTap={this.openNavigationDrawer}
                    />
                    <Ui.Drawer open={this.state.open} docked={false} onRequestChange={(open) =>
                        this.setState({open})}>
                        <Ui.MenuItem primaryText="Authors" leftIcon={<Ui.FontIcon className="material-icons">face</Ui.FontIcon>} containerElement={<Link to="/authors"/>}></Ui.MenuItem>
                        <Ui.MenuItem primaryText="Books" leftIcon={<Ui.FontIcon className="material-icons">book</Ui.FontIcon>} containerElement={<Link to="/books"/>}></Ui.MenuItem>
                        <Ui.MenuItem primaryText="Browser" leftIcon={<Ui.FontIcon className="material-icons">find_in_page</Ui.FontIcon>} containerElement={<Link to="/browser"/>}></Ui.MenuItem>
                    </Ui.Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    openNavigationDrawer = (event) => {
        this.setState({
            open: true,
        });
    };
}
export default Navigation;