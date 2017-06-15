import React from 'react';

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		}
	}
	handleLogout() {
		this.props.userLogout();
	}
	render() {
		return <h1>Hi</h1>
	}
}