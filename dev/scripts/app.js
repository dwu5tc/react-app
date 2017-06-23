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
import HomeFeed from "./components/HomeFeed.js";
import Feed from "./components/Feed.js";
import Friends from "./components/Friends.js";

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
			return (
				<div>
					<nav>
						<div className="nav-left">
							<Link to="/"><h1>idk</h1></Link>
						</div>
						<div className="nav-right">
							<Link to="/home"><span>Home</span></Link>
							<Link to="/feed"><span>Feed</span></Link>
							<Link to="/friends"><span>Friends</span></Link>
							<Link to="/" onClick={this.userLogout}><span>Log Out</span></Link>
							{/*<button onClick={this.userLogout}><span>Logout</span></button>*/}
						</div>
					</nav>
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
							currUser={this.state.user} />
						);
					}} /> 
					<Route path="/feed" render={() => { // hacky fix atm
						return (
							<section className="feed">
								<Feed
								currUser={this.state.user} />
							</section>
						);
					}} />
					<Route path="/friends" render={() => {
						return (
							<Friends
							currUser={this.state.user} />
						);
					}} />
					{/*
					<Route path="/settings" render={() => {
						return (
							<Settings
							currUser={this.state.user} />
						);
					}} />
					<Route path ="/post/:userid/:postid" render={Post} />
					*/}
				</div>
			)
		} 
		else {
			return (
				<div>
					<nav>
						<h1>idk</h1>
					</nav>
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
				{this.mainPage()} 
			</Router>
		)
	}
	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				var userId = user.uid;
				var userRef = firebase.database().ref("users/"+userId);
				userRef.once("value").then((snapshot) => {
					var userExists = snapshot.exists(); // is it even necessary to check? always just call update?
					if (!userExists) { 
						userRef.set({
							uid: user.uid,
							name: user.displayName,
							pic: user.photoURL,
							following: []
						});
					}
					this.setState({
						user: user
					});
				});
				
			}
		});
		// add error handler
	}
}

ReactDOM.render(<App />, document.getElementsByClassName("idk-idk")[0]);

