import React from 'react';

class Settings extends React.Component {
	// pagination vs endless scroll
	// users per page
	// theme
	// unfollow all with a popup modal
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	handleLogout() {
		this.props.userLogout();
	}
	render() {
		return (

		);
	}
}