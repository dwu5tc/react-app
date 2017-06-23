import React from 'react';

// add catch error
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		if (this.props.currUser) {
			return (
				<div className="logout">
					<div className="wrapper">
						<div className="logout__container">
							<div className="user__image">
								<img src={this.props.currUser.photoURL} alt=""/>
							</div>
							<h3>{this.props.currUser.displayName}</h3>
							<h4>Not you?</h4>
							<button className="btn btn--login" onClick={this.props.handleLogout}><span>Logout</span></button>
						</div>
					</div>
				</div>
			);
		}
		else {
			return (
				<div className="login">
					<div className="wrapper">
						<div className="login__container">
							<h3>Welcome to IDK</h3>
							<h4>IDK is a social media website on which you can write texts posts, upload images, or create polls. 
							These can be stored privately, or can be shared with your followers and the public.</h4>
							<button className="btn btn--logout" onClick={this.props.handleLogin}>Login</button>
						</div>
					</div>
				</div>
			);
		}
	}
	componentWillReceiveProps(nextProps) { // why can't the component be constructed with props?
		this.setState({
			user: nextProps.currUser
		});
	}
}