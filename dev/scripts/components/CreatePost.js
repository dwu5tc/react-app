import React from 'react';

export default class CreatePost extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.renderForm = this.renderForm.bind(this);
		this.addOption = this.addOption.bind(this);
		// this.renderPoll = this.renderPoll.bind(this);
		this.state = {
			type: "text",
			privacy: "public",
			options: 2,
			textTitle: "",
			textContent: "",
			imageText: "",
			pollQuestion: "",
			pollOptions: [null, null, null, null],
			text: {
				title: "sss",
				content: "aaa"
			}
		}
		this.baseState = this.state;
	}
	resetState() {
		this.setState(this.baseState);
	}
	handleChange(e) {
		// console.log(e.target);
		// console.log(e.target.name);
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		var userId = this.props.currUser.uid;
		// const userRef = firebase.database().ref(users+"/"+userId+"/"posts);
		var postsRef = firebase.database().ref("posts/").push();
		var key = postsRef.key;
		var date = new Date();
		var timestamp = date.getTime();
		var date = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear();
		var obj = {
			uid: this.props.currUser.uid,
			timestamp: timestamp,
			date: date,
			privacy: this.state.privacy,
			likes: 0
			// comments: []
		}
		switch(this.state.type) {
			case "text":
				obj.type = "text",
				obj.title = this.state.textTitle,
				obj.content = this.state.textContent
				break;
			case "image":
				obj.type = "image",
				obj.image = null,
				obj.caption = this.state.imageText
				break;
			case "poll":
				obj.type = "poll",
				obj.question = this.state.pollQuestion
				break;
		}
		// userRef.push(obj);
		postsRef.set(obj);
		console.log(key);
		this.props.handleSubmitPost();
	}
	renderForm() {
		switch(this.state.type) {
			case "text":
				return (
					<div className="post-content">
						<input name="textTitle" type="text" placeholder="Post title" value={this.state.textTitle} onChange={this.handleChange}/>
						<input name="textContent" type="textarea" placeholder="Write here" value={this.state.textContent} onChange={this.handleChange}/>
						<input name="text.title" type="textarea" placeholder="Write here" value={this.state.text.title} onChange={this.handleChange}/>
						<input name="text.content" type="textarea" placeholder="Write here" value={this.state.text.content} onChange={this.handleChange}/>
					</div>
				);
			case "image":
				return (
					<div className="post-content">
						<input name="imageText" type="text" placeholder="Image caption" value={this.state.imageText} onChange={this.handleChange}/>
					</div>
				);
			case "poll":
				return (
					<div className="post-content">
						<input name="pollQuestion" type="text" placeholder="Ask a question" value={this.state.pollQuestion} onChange={this.handleChange}/>
						{this.renderPoll()}
						<button onClick={this.addOption}>+ Option</button>
					</div>
				);
		}
	}
	setType(newType) {
		this.resetState();
		if (newType != "poll") {
			this.setState({
				type: newType,
				options: 2,
			})
		}
		else {
			this.setState({
				type: newType
			});
		}
	}
	setPrivacy(newPrivacy) {
		this.setState({
			privacy: newPrivacy
		});
	}
	addOption(e) {
		e.preventDefault();
		if (this.state.options < 4) {
			var temp = this.state.options+1;
			this.setState({
				options: temp
			})
		} 
	}
	renderPoll() {
		var options = [<input name="pollOption1" type="text" placeholder="Option 1" value={this.state.pollOption1} onChange={this.handleChange}/>,
		<input name="pollOption2" type="text" placeholder="Option 2" value={this.state.pollOption2} onChange={this.handleChange}/>,
		<input name="pollOption3" type="text" placeholder="Option 3" value={this.state.pollOption3} onChange={this.handleChange}/>,
		<input name="pollOption4" type="text" placeholder="Option 4" value={this.state.pollOption4} onChange={this.handleChange}/>];
		return options.slice(0, this.state.options);
	}
	render() {
		var textButton;
		var imageButton;
		var pollButton;
		var publicButton;
		var friendsButton;
		var privateButton;
		switch(this.state.type) {
			case "text":
				textButton = <span>Text</span>
				imageButton = <button className="" onClick={() => {this.setType("image")}}>Image</button>
				pollButton = <button className="" onClick={() => {this.setType("poll")}}>Poll</button>
				break;
			case "image":
				textButton = <button className="" onClick={() => {this.setType("text")}}>Text</button>
				imageButton = <span>Image</span>
				pollButton = <button className="" onClick={() => {this.setType("poll")}}>Poll</button>
				break;
			case "poll":
				textButton = <button className="" onClick={() => {this.setType("text")}}>Text</button>
				imageButton = <button className="" onClick={() => {this.setType("image")}}>Image</button>
				pollButton = <span>Poll</span>
				break;
		}
		switch(this.state.privacy) {
			case "public":
				publicButton = <span>Public</span>
				friendsButton = <button className="" onClick={() => {this.setPrivacy("friends")}}>Friends</button>
				privateButton = <button className="" onClick={() => {this.setPrivacy("private")}}>Private</button>
				break;
			case "friends":
				publicButton = <button className="" onClick={() => {this.setPrivacy("public")}}>Public</button>
				friendsButton = <span>Friends</span>
				privateButton = <button className="" onClick={() => {this.setPrivacy("private")}}>Private</button>
				break;
			case "private":
				publicButton = <button className="" onClick={() => {this.setPrivacy("public")}}>Public</button>
				friendsButton = <button className="" onClick={() => {this.setPrivacy("friends")}}>Friends</button>
				privateButton = <span>Private</span>
				break;
				
		}
		return (
			<form className="" onSubmit={this.handleSubmit}>
				<div className="post-type">
					{textButton}
					{imageButton}
					{pollButton}
				</div>
				{this.renderForm()}
				<div className="privacy-settings">
					{publicButton}
					{friendsButton}
					{privateButton}
				</div>
				<button>
					<span>Submit</span>
				</button>
				<button>
					<span>Cancel</span>
				</button>
			</form>
		)
	}
}