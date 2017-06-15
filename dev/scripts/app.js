import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from "jquery";
import { 
	BrowserRouter as Router,
	NavLink as Link,
	Route,
	Redirect,
	browserHistory
} from "react-router-dom";

import Login from "./components/Login.js";
import Home from "./components/Home.js";
import CreatePost from "./components/CreatePost.js";

var config = {
	apiKey: "AIzaSyAtes0QKFVr-Fe_G4OHWH0G6N5xsIGGS9g",
	authDomain: "hy-p6-6f8ba.firebaseapp.com",
	databaseURL: "https://hy-p6-6f8ba.firebaseio.com",
	projectId: "hy-p6-6f8ba",
	storageBucket: "hy-p6-6f8ba.appspot.com",
	messagingSenderId: "205958636504"
};

firebase.initializeApp(config);
const auth = firebase.auth();
const dbRef = firebase.database().ref('/');
const provider = new firebase.auth.GoogleAuthProvider();

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

class App extends React.Component {
	constructor() {
		super();
		this.userLogin = this.userLogin.bind(this);
		this.userLogout = this.userLogout.bind(this);
		this.mainPage = this.mainPage.bind(this);
		this.state = {
			user: null,
		}
	}
	userLogin() {
		auth.signInWithPopup(provider)
			.then((result) => {
				const user= result.user;
				this.setState({
					user: user
				});
			});
	}
	userLogout() {
		auth.signOut()
			.then(() => {
				this.setState({
					user: null
				});
			});
	}
	mainPage() {
		if (this.state.user) {
			console.log("hihih", this.state.user);
			return (
				<div>
					<nav>
						<div className="nav-left">
							<Link to="/"><h1>idk-idk</h1></Link>
						</div>
						<div className="nav-right">
							<Link to="/home"><span>Home</span></Link>
							<Link to="/feed"><span>Feed</span></Link>
							<Link to="/friends"><span>Friends</span></Link>
							<Link to="/settings"><span>Settings</span></Link>
						</div>
					</nav>
					{/*
					<Route exact path="/" render={() => {
						<Redirect to="/home" />
					}} /> */}
					<Route exact path="/" render={() => {
						return (
							<Login
							currUser={this.state.user}
							handleLogin={this.userLogin}
							handleLogout={this.userLogout} />
						);
					}} /> 
					<Route path="/home" render={() => {
						return (
							<Home
							currUser={this.state.user}
							handleLogout={this.userLogout} />
						);
					}} /> 
					<Route path="/feed" render={() => {
						return (
							<Feed
							currUser={this.state.user} />
						);
					}} />
					{/*
					<Route path="/friends" render={() => {
						return (
							<Friends
							currUser={this.state.user} />
						);
					}} />
					<Route path="/settings" render={() => {
						return (
							<Settings
							currUser={this.state.user} />
						);
					}} />
					<Route path="/new-post" render={() => {
						return (
						s.postCreate
							currUser={this.state.user} />
						);
					}} />
					<Route path ="/post/:userid/:postid" render={Post} />
					*/}
				</div>
			)
		} 
		else {
			console.log("nononono", this.state.user);
			return (
				<div>
					<nav>
						<h1>idk-idk</h1>
					</nav>
					{/*
					<Route exact path="/" render={() => {
						return <Redirect to="/login" />
					}} />
					*/}
					<Route exact path="/" render={() => {
						return (
							<Login
							currUser={this.state.user}
							handleLogin={this.userLogin}
							handleLogout={this.userLogout} />
						);
					}} /> 
				</div>
			);
			
		}
	}
	render() {
		return (
			<Router>
				{/* <h1>hi</h1> */}
				{this.mainPage()} 
			</Router>
		)
	}
	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				var userId = user.uid;
				console.log(userId);
				var userRef = firebase.database().ref("users/");
				var userExists;
				var userQuery = userRef.orderByChild("uid").equalTo(userId).once("value").then((snapshot) => {
					userExists = snapshot;
					if (!snapshot) {
						console.log("snapshot parent", snapshot.ref(), snapshot.val());
					}
					else {
						console.log("snapshot empty???");
					}
				});
				if (!userExists) {
					var userRef = firebase.database().ref("users/").push();
					var key = userRef.key;
					// var temp;
					// userRef.once("value")
					// 	.then((snapshot) => {
					// 		temp = snapshot.val();
					// 	});
					// if (!temp) {
						userRef.set({
							name: user.displayName,
							uid: user.uid,
							pic: user.photoURL
						});
					// }
				}
				this.setState({
					user: user,
					fbid: key
				});
			}
		});
		// add error handler
	}
}

ReactDOM.render(<App />, document.getElementsByClassName("idk-idk")[0]);

