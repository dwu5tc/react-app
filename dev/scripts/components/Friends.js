import React from 'react';

export default class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
		}
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit() {
		e.preventDefault();
	}
	beginSearch() {
		this.setState({
			searching: true
		});
	}
	followUser() {

	}
	renderFollowButton() {

	}
	controlRenderFollowButton() {

	}
	toggleFollow(user) { // update following in current user, update followers in followed user
		const userRef = firebase.database().ref("users/"+this.props.currUser.uid);
		userRef.child("following").once("value").then((snapshot) => {
			var temp = snapshot.val();
			if (temp == 0) {
				userRef.update({ following: [user] });
			}
			else if (temp.includes(user)) {
				temp.splice(temp.indexOf(user), 1);
				if (temp == 0 ) {
					userRef.update({ following: 0 });
				}
				else {
					userRef.update({ following: temp });
				}
			}
			else {
				temp.push(user);
				userRef.update({ following: temp });
			}
		});
	}
	renderUser(user) {
		console.log("RENDER USER", user);
		return (
			<div className="user">
				<div className="user__image">
					<img src={user.pic} alt={`${user.name}`}/>
				</div>
				<h2>{user.name}</h2>
				<button onClick={() => this.toggleFollow(user.uid)}><span>Follow</span></button>
			</div>
		)
	}
	controlRenderUser(user) {
		if (user.uid == this.props.currUser.uid) {
			console.log("SAME USER LOL");
			return;
		}
		var patt = new RegExp(`^${this.state.query}`, "i");
		if (patt.test(user.name)) {
			if ((this.state.query) && this.state.query != "") {
				return this.renderUser(user);
			}
		}
	}
	renderSearchForm() {
		return (
			<div className="search-container">
				<h2>Search for a User</h2>
				<form onSubmit={this.handleSubmit}>
					<input name="query" value={this.state.query} onChange={this.handleChange} type="text" placeholder="Search for a User" />
				</form>
			</div>
			
		)
	}
	render() {
		if (this.state.searching) { // render search form if user has clicked search button 
			return (
				<section className="friends">
					{this.renderSearchForm()}
					<div className="search-results">
						{this.state.allUsers.map((user) => {
							return this.controlRenderUser(user);
						})}
					</div>
				</section>
			)
		}
		if (this.state.following) { // display all users the currUser is following 
			return (
				<section className="friends">
					<button onClick={() => this.beginSearch()}><span>Search for Users</span></button>
					{this.state.following.map((user) => {
						return this.renderUser(user);
					})}
				</section>
			)
		}
		else { // currUser follows no one; display search form
			return (
				<section className="friends">
					{this.renderSearchForm()}
				</section>
			)
		}
	}
	componentDidMount() {
		var user = this.props.currUser.uid;
		const userRef = firebase.database().ref("users");
		userRef.once("value").then((snapshot) => {
			var temp = snapshot.val();
			var allUsers = [];
			for (var userItem in temp) { // temp is an object of users; must convert to an array
				var userObj = temp[userItem];
				allUsers.push(userObj);
			}
			this.setState({
				allUsers: allUsers,
				following: temp[user].following
			})
		});
	}
}