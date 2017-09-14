import React from 'react';
import './login.css';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom'
import Register from './register'

const App = () => (
    <Router>
        <div>
            <Route path="/" exact component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </div>
    </Router>
);



// Modal
class Login extends React.Component {
    state = {
        fields: {
            username: '',
            password: ''
        },
        user: [],
        redirectToReferrer: false
    };

    onFormSubmit = (evt) => {
        const user = [
            ...this.state.user,
            this.state.fields,
        ];
        this.setState({
            user,
            fields: {
                username: '',
                password: ''
            }
        });
        evt.preventDefault();
    };

    onInputChange = (evt)=>{
      const fields = this.state.fields;
      fields[evt.target.name] = evt.target.value;
      this.setState ({fields})
    };

    register = () => {
            this.setState({ redirectToReferrer: true })
    };


    render() {
        const { redirectToReferrer } = this.state;

        // here is the important part
        if (redirectToReferrer) {
            return (
                <Redirect to="/register"/>
            )
        }

        return <div className="container panel panel-default" id="login-box">
            <h1 className="text-center">Login</h1>

            <form className="form-horizontal panel-body" onSubmit= { this.onFormSubmit }>
                <div className="form-group">
                    <input type='text'  name="username" className="form-control" placeholder='username' value={this.state.fields.username} onChange={this.onInputChange} required/>
                </div>
                <div className="form-group">
                    <input type='password' name="password" className="form-control" placeholder='password' value={this.state.fields.password} onChange={this.onInputChange} required/>
                </div>
                <div className="form-group text-center">

                    <input type="submit" className="btn btn-info" />
                    <button type="button" className="btn btn-link" onClick={this.register} >register</button>
                        </div>
            </form>

        </div>
    }
}

export default App;

