import React from 'react';

class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			currUserQuery: ""
		}
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit() {
		e.preventDefault();
		// const userId = this.state.user.uid;
		// const userRef = firebase.database().ref(userId);
		// userRef.push(this.state.currentTodo);
		// this.setState({
		// 	currentTodo: '',
		// });
	}
	handleLogout() {
		this.props.userLogout();
	}
	getUsers() {
		ajax({
			// search fb for specific user
		});
	}
	followUser() {

	}
	queryResults() {

	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input name="userQuery" value={this.state.currUserQuery} onChange={this.handleChange} type="text" placeholder="Search"/>
			 	
				<input type="submit" value="Search"/>
			</form>
			<QueryResults users={queryResults} />
		);
	}
}