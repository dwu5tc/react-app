import React from 'react';

// add catch error

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		if (this.state.user) {
			return (
				<div className="logout">
					<div className="user__image">
						<image src="" alt=""/>
					</div>
					<h3>Not you?</h3>
					<button onClick={this.props.handleLogout}><span>Logout</span></button>
				</div>
			);
		}
		else {
			return (
				<div className="login">
					<div className="login__laksjd">
						<h2>IDK IDK IDK</h2>
						<p>idk idk idk idk idk</p>
					</div>
					<button onClick={this.props.handleLogin}>Login</button>
				</div>
			);
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			user: nextProps.currUser
		});
	}
}