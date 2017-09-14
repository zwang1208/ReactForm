import React  from 'react';
import axios from 'axios';

import './login.css';
import Login from './login'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom'

const App = () => (
    <Router>
        <div>
            <Route path="/" exact component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </div>
    </Router>
);

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
    }
    loadCommentsFromServer() {
        axios.get('http://localhost:4000/api/users')
            .then(res => {
                this.setState({ data: res.data });
            })
    }
    handleCommentSubmit(data) {
        let comments = this.state.data;
        data.id = Date.now();
        let newComments = comments.concat([data]);
        this.setState({ data: newComments });
        axios.post('http://localhost:4000/api/users',data)
            .then(res => {
                // let newState = (... this.state);
                // newState.push({ data: res })
                let newObject = res;
                this.setState({data: this.state.data.concat([newObject])});
                this.loadCommentsFromServer()
            })
            .catch(err => {
                console.error(err);
            });    }
    componentDidMount() {
        this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer,2000);
    }

    handleCommentDelete(id) {
            axios.delete(`${'http://localhost:4000/api/users'}/${id}`)
                .then(res => {
                    console.log('Comment deleted');
                })
                .catch(err => {
                    console.error(err);
                });
        }


    render() {
        return (
            <div className="container">
                <h1 className="text-center">Register</h1>
                <FormBody onCommentSubmit={ this.handleCommentSubmit }/>
                <UserList data={ this.state.data }
                          onCommentDelete={ this.handleCommentDelete }
                />
            </div>
        );
    }
}

class FormBody extends React.Component{
    state = {
            fields: {
                firstname: '',
                lastname: '',
                username: '',
                password: '',
                email: ''
            },
            data: [],
            redirectToReferrer: false
        };


    onInputChange = (evt)=>{
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState ({fields})
    };
    onFormSubmit = (evt) => {
        const data = [
                ...this.state.data,
            this.state.fields,
        ];
        const fields = this.state.fields;

        this.props.onCommentSubmit({
            firstname:fields.firstname,
            lastname:fields.lastname,
            username:fields.username,
            password:fields.password,
            email:fields.email

        });

        this.setState({
            data,
            fields: {
                firstname:'',
                lastname:'',
                username: '',
                password: '',
                email: ''
            }
        });


        evt.preventDefault();
    };


    goBack = () => {
            this.setState({ redirectToReferrer: true })
    };

    render() {
            const { redirectToReferrer } = this.state;

            if (redirectToReferrer) {
                return (
                    <Redirect to="/login"/>
                )
        }
        return (
            <div className="container panel panel-default" id="Form" >
            <form name="userform" id="userform" className="form-horizontal panel-body" onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input className="form-control" name="firstname" value={this.state.fields.firstname} onChange={this.onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input className="form-control" name="lastname" value={this.state.fields.lastname} onChange={this.onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" name="username" value={this.state.fields.username} onChange={this.onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" name="password" value={this.state.fields.password} onChange={this.onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" name="email" value={this.state.fields.email} onChange={this.onInputChange}/>
                </div>
                <div className="form-group text-center">
                    <input className="btn btn-info" type="submit"/>
                    <button className="btn btn-link"  type="button" onClick={this.goBack}>Back</button>
                </div>
            </form>
            </div>
        );
    }
}


class UserList extends React.Component{
    render() {
        return (
            <ul>
            { this.props.data.map(({ firstname,lastname,email }, _id) =>
                <li key={_id}>{firstname} {lastname} ({ email })</li>
            ) }

            </ul>
        )
    }
}


export default App;