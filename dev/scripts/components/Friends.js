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
			<section className="friends">
				<form onSubmit={this.handleSubmit}>
					<input name="userQuery" value={this.state.currUserQuery} onChange={this.handleChange} type="text" placeholder="Search"/>
				 	
					<input type="submit" value="Search"/>
				</form>
				<QueryResults users={queryResults} />
			</section>
		);
	}
}

/*
class QueryResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currUser: "",
			searchedUsers: ""
		}
	}
	follow(user) { 
		// go into db and add
	}
	unfollow(user) {
		// go into db and remove
	}
	followButton(user) {
		if (currUser.friends.includes(user)) {
			return (
				<button onClick={this.unfollow(user)}>
					<span>Unfollow</span>
				</button>
			);
		}
		else {
			return (
				<button onClick={this.follow(user)}>
					<span>Follow</span>
				</button>
			);
		}
	}
	render() {
		return (
			<ul className="user-list">
				{this.props.searchedUsers.map((user) => {
					return (
						<li className="user">
							<span>{user.name}</span>
							{followButton(user.name)}
						</li>
					)
				});}
			</ul>
		);
	}
}

class TextPost extends Post {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div className="post text-post">
				<div className="author">
					<div className="author__image">
						<image src="" alt=""/>
					</div>
				</div>
				<h3>this.props.</h3>
				<p>this.props.</p>
			</div>
		);
	}
}

class ImagePost extends Post {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div className="post image-post">
				<div className="author">
					<div className="author__image">
						<image src="" alt=""/>
					</div>
				</div>
				<figure className="image_post">
				</figure>
				<figcaption>this.props.</figcaption>
			</div>
		);
	}
}

class PollPost extends Post { //props are question, and 
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div className="post poll-post">
				<div className="author">
					<div className="author__image">
						<image src="" alt=""/>
					</div>
				</div>
				<h3>this.props.</h3>
				{this.props..options.map((options) => {
					return (

					);
				})}
			</div>
		)
	}
}*/