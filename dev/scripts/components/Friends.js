import React from 'react';

export default class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			searching: false
		}
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	beginSearch() {
		this.setState({
			searching: true
		});
	}
	endSearch() {
		console.log("calling this");
		this.setState({
			searching: false,
			query: ""
		});
	}
	renderFollowButton(user) {
		var isFollowing = false;
		if (this.state.following) {
			for (let i = 0; i < this.state.following.length; i++) {
				if (this.state.following[i].uid == user.uid) {
					isFollowing = true;
					break;
				} 
			}
		}
		if (!this.state.following || !isFollowing) {
			return (
				<button className="btn btn--friends" onClick={() => this.toggleFollow(user.uid)}><span>Follow</span></button>
			)
		}
		else {
			return (
				<button className="btn btn--friends" onClick={() => this.toggleFollow(user.uid)}><span>Unfollow</span></button>
			)
		}
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
		console.log("render user", user)
		if (user.photo) { // fix this later
			var photo = user.photo;
		}
		else {
			var photo = user.pic;
		}
		return (
			<div className="user">
				<div className="user__left">
					<div className="user__image">
						<img src={photo} alt={`${user.name}`}/>
					</div>
					<h3>{user.name}</h3>
				</div>
				<div className="user__follow-button">
					{this.renderFollowButton(user)}
				</div>
			</div>
		)
	}
	controlRenderUser(user) {
		if (user.uid == this.props.currUser.uid) {
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
				<h3>Search for a User</h3>
				<input name="query" value={this.state.query} onChange={this.handleChange} type="text" placeholder="Search for a User" />
			</div>
		)
	}
	render() {
		if (this.state.searching) { // render search form if user has clicked search button 
			return (
				<section className="friends">
					<div className="wrapper">
						<button className="btn btn--friends" onClick={() => this.endSearch()}><span>Following</span></button>
						{this.renderSearchForm()}
						<div className="search-results">
							{this.state.allUsers.map((user) => {
								console.log("rendering from render", user);
								return this.controlRenderUser(user);
							})}
						</div>
					</div>
				</section>
			)
		}
		if (this.state.following) { // display all users the currUser is following 
			return (
				<section className="friends">
					<button className="btn btn--friends" onClick={() => this.beginSearch()}><span>Search Users</span></button>
					<div className="wrapper">
						<div className="following">
							{this.state.following.map((user) => {
								return this.renderUser(user);
							})}
						</div>
					</div>
				</section>
			)
		}
		else { // currUser follows no one; display search form
			return (
				<section className="friends">
					<button className="btn btn--friends" onClick={() => this.beginSearch()}><span>Search Users</span></button>
					<div className="wrapper">
					</div>
				</section>
			)
		}
	}
	componentDidMount() {
		var user = this.props.currUser.uid;
		const userRef = firebase.database().ref("users");
		userRef.on("value", (snapshot) => {
			var temp = snapshot.val();
			var allUsers = [];
			var following = [];
			for (var userItem in temp) { // temp is an object of users; must convert to an array
				var userObj = temp[userItem];
				allUsers.push(userObj); // first, update allUsers
				if (temp[user].following == 0) {
					continue;
				}
				if (temp[user].following.indexOf(userItem) >= 0) { // temp.following is an array of uids; must convert to objects of those users
					following.push(userObj); // second, update following
				}
			}
			if (following.length == 0) { following = null; }
			if (temp[user].following) {
				this.setState({
					allUsers: allUsers,
					following: following
				});
				return;
			}
			this.setState({
				allUsers: allUsers,
				following: following,
				searching: true
			});
		});
	}
}