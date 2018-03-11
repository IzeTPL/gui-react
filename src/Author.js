import * as React from 'react'
import * as Ui from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './Auth'
import * as axios from "axios";
class Author extends React.Component {
    instance = null;
    constructor(props) {
        super(props);
        this.state = {
            selectedAuthor: {
                id: '',
                name: ''
            },
            authors: [],
            empty: true,
            init: true,
        };
        this.instance = axios.create({
            baseURL: 'http://restapp.dev/author',
            headers: {'Authorization': 'Bearer ' + Auth.getToken()}
        });
    }
    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <h3>Authors</h3>
                    <Ui.Paper zDepth={1} className="left-column">
                        <this.AuthorList authors={this.state.authors}/>
                    </Ui.Paper>
                    <Ui.Paper zDepth={1} className="right-column">
                        <this.AuthorForm/>
                    </Ui.Paper>
                </div>
            </MuiThemeProvider>
        );
    }

    AuthorList = (props) => {
        const authors = props.authors;
        const listItems = authors.map((author) =>
            <Ui.ListItem key={author.id}
                         primaryText={author.name}
                         onClick={() => this.handleAuthorClick(author)}/>
        );
        return (
            <Ui.List>{listItems} </Ui.List>
        );
    };
    handleAuthorClick = (author) => {
        this.setState({selectedAuthor: author});
    };

    AuthorForm = (props) => {
        let nameInput = <Ui.TextField floatingLabelText="Name" value={this.state.selectedAuthor.name}
                                      onChange={this.onAuthorNameChange}/>;
        return (
            <form>
                <div>
                    {nameInput}
                </div>
                <div>
                    <Ui.FlatButton label="New" secondary={true} onClick={this.handleNew}
                                   disabled={this.state.empty}
                                   icon={<Ui.FontIcon className="material-icons">create</Ui.FontIcon>}/>
                    <Ui.FlatButton disabled={!this.state.selectedAuthor.id || this.state.empty} label="Save" primary={true}
                                   onClick={this.handleSave}
                                   icon={<Ui.FontIcon className="material-icons">save</Ui.FontIcon>}/>
                    <Ui.FlatButton disabled={!this.state.selectedAuthor.id || this.state.empty} label="Remove"
                                   secondary={true}
                                   onClick={this.handleRemove}
                                   icon={<Ui.FontIcon className="material-icons">delete</Ui.FontIcon>}/>
                    <Ui.Snackbar
                        open={this.state.empty && !this.state.init}
                        message="Author cannot be empty"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            </form>
        )
    };

    refreshAuthorsList = function() {
        this.instance.get('/')
            .then(response => {
                let authors = response.data;
                this.setState({
                    authors
                });
            })
            .catch(error => {
                if (error.response.status == 401)
                    this.props.history.push('/login');
            });
    };

    onAuthorNameChange = (event) => {
        let author = this.state.selectedAuthor;
        author.name = event.target.value;
        this.setState({
            selectedAuthor: author,
            empty: false,
            init: false
        });
        if (author.name === "") {
            this.setState({
                empty: true
            });
        }
    };
    handleSave = () => {
        let id = this.state.selectedAuthor.id;
        this.instance.post('/update/' + id, {
            name: this.state.selectedAuthor.name
        }).then(response => {
            this.refreshAuthorsList();
        })
    };
    handleNew = () => {
        this.instance.put('/create', {
            name: this.state.selectedAuthor.name
        }).then(response => {
            this.refreshAuthorsList();
        })
    };
    handleRemove = () => {
        let id = this.state.selectedAuthor.id;
        this.instance.delete(id).then(response => {
            this.refreshAuthorsList();
            // Wyczysc formularz
            this.setState({selectedAuthor : {
                id: '',
                name: ''
            }})
        })
    };

    componentDidMount = () => {
        if(!Auth.isUserAuthenticated())
            this.props.history.push('/login');
        else {
            this.refreshAuthorsList();
        }
    };

}
export default Author;