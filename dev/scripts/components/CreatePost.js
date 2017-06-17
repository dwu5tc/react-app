import React from 'react';

export default class CreatePost extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.addOption = this.addOption.bind(this);
		this.state = {
			type: "text",
			privacy: "public",
			options: 2,
			textTitle: "",
			textContent: "",
			imagePath: "",
			imageFile: "",
			imagePreview: "",
			imageText: "",
			pollQuestion: "",
			pollOptions: [{option: "", votes: 0}, {option: "", votes: 0}, {option: "", votes: 0}, {option: "", votes: 0}]
		}
	}
	resetState() {
		this.setState({ // can't figure out how to deep copy a base state; json.parse+json.stringify doesn't work
			type: "text",
			privacy: "public",
			options: 2,
			textTitle: "",
			textContent: "",
			imagePath: "",
			imageFile: "",
			imagePreview: "",
			imageText: "",
			pollQuestion: "",
			pollOptions: [{option: "", votes: 0}, {option: "", votes: 0}, {option: "", votes: 0}, {option: "", votes: 0}]
		});
	}
	handleImageChange(e) {
		e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				imageFile: file,
				imagePreview: reader.result
			});
		}
		reader.readAsDataURL(file)
	}
	handleImageSubmit(e) {
		e.preventDefault();
	}
	handleChange(e) {
		switch(e.target.name) {
			case "optionA":
				var temp = this.state.pollOptions;
				temp[0].option = e.target.value;
				this.setState({
					pollOptions: temp
				})
				break;
			case "optionB":
				var temp = this.state.pollOptions;
				temp[1].option = e.target.value;
				this.setState({
					pollOptions: temp
				})
				break;
			case "optionC":
				var temp = this.state.pollOptions;
				temp[2].option = e.target.value;
				this.setState({
					pollOptions: temp
				})
				break;
			case "optionD":
				var temp = this.state.pollOptions;
				temp[3].option = e.target.value;
				this.setState({
					pollOptions: temp
				})
				break;
			default: 
				this.setState({
					[e.target.name]: e.target.value
				});
		}
	}
	handleSubmit(e) {
		e.preventDefault();
		var storageRef = firebase.storage().ref();
		var imageRef = storageRef.child("images/"+this.state.imageFile.name);
		var date = new Date();
		var timestamp = date.getTime();
		var date = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear();
		var obj = {
			user: {
				id: this.props.currUser.uid,
				name: this.props.currUser.displayName,
				photo: this.props.currUser.photoURL
			},
			timestamp: timestamp,
			date: date,
			privacy: this.state.privacy,
			likes: []
			// comments: []
		}
		switch(this.state.type) {
			case "text":
				obj.type = "text",
				obj.title = this.state.textTitle,
				obj.content = this.state.textContent
				this.updateFirebase(obj);
				break;
			case "image":
				var uploadTask = imageRef.put(this.state.imageFile).then(() => {
					var urlObject =imageRef.getDownloadURL().then((data) => {
						obj.imagePath = data;
						obj.type = "image",
						obj.caption = this.state.imageText
						this.updateFirebase(obj);
					});
				});
				break;
			case "poll":
				obj.type = "poll",
				obj.question = this.state.pollQuestion
				this.updateFirebase(obj);
				break;
		}
	}
	updateFirebase(obj) {
		var userId = this.props.currUser.uid;
		var userRef = firebase.database().ref("users/"+userId);
		var postsRef = firebase.database().ref("posts/").push(); // refactor 2nd line to postsRef.push().key?
		var key = postsRef.key;
		obj.key = key;
		userRef.child("posts").once("value").then((snapshot) => {
			if (!snapshot.exists()) {
				userRef.update({ posts: [key] });
			}
			else {
				var temp = snapshot.val();
				temp.push(key);
				userRef.update({ posts: temp });
			}
			this.props.handleSubmitPost();
		});
		postsRef.set(obj);
	}
	renderForm() {
		switch(this.state.type) {
			case "text":
				return (
					<div className="post-content">
						<input className="text-title" name="textTitle" type="text" placeholder="Post title" value={this.state.textTitle} onChange={this.handleChange} />
						<textarea className="text-content" name="textContent" type="textarea" placeholder="Write here" value={this.state.textContent} onChange={this.handleChange} />
					</div>
				);
			case "image":
				var imagePreview;
				if (this.state.imagePreview) {
					imagePreview = <img src={this.state.imagePreview} alt="" />;
				}
				return (
					<div className="post-content">
						<div className="image-upload">
							<span>Upload an image. (Max 10MB)</span>
							{/*<label htmlFor="image-upload"><button className="btn" onClick={this.handleImageSubmit}><span>Upload</span></button></label>*/}
							<input id="image-upload" type="file" onChange={this.handleImageChange} />
						</div>
						<div className="image-preview">
							<div className="image-preivew__container">
								{imagePreview}
							</div>
						</div>
						<textarea className="image-text" name="imageText" type="textarea" placeholder="Image caption" value={this.state.imageText} onChange={this.handleChange} />
					</div>
				);
			case "poll":
				return (
					<div className="post-content">
						<input className="poll-question" name="pollQuestion" type="text" placeholder="Ask a question" value={this.state.pollQuestion} onChange={this.handleChange} />
						{this.renderPoll()}
						<button className="btn" onClick={this.addOption}><i className="fa fa-plus-circle" aria-hidden="true"></i><span>Option</span></button>
					</div>
				);
		}
	}
	setType(newType) { // called with arrow function; no need to bind
		this.resetState(); // no need to bind since it is called inside setType?
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
		var options = [<input className="poll-option" name="optionA" type="text" placeholder="Option 1" value={this.state.pollOptions[0].option} onChange={this.handleChange} />,
		<input className="poll-option" name="optionB" type="text" placeholder="Option 2" value={this.state.pollOptions[1].option} onChange={this.handleChange} />,
		<input className="poll-option" name="optionC" type="text" placeholder="Option 3" value={this.state.pollOptions[2].option} onChange={this.handleChange} />,
		<input className="poll-option" name="optionD" type="text" placeholder="Option 4" value={this.state.pollOptions[3].option} onChange={this.handleChange} />];
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
				textButton = <span className="btn btn--selected">Text</span>
				imageButton = <button className="btn" onClick={() => {this.setType("image")}}><span>Image</span></button>
				pollButton = <button className="btn" onClick={() => {this.setType("poll")}}><span>Poll</span></button>
				break;
			case "image":
				textButton = <button className="btn" onClick={() => {this.setType("text")}}><span>Text</span></button>
				imageButton = <span className="btn btn--selected">Image</span>
				pollButton = <button className="btn" onClick={() => {this.setType("poll")}}><span>Poll</span></button>
				break;
			case "poll":
				textButton = <button className="btn" onClick={() => {this.setType("text")}}><span>Text</span></button>
				imageButton = <button className="btn" onClick={() => {this.setType("image")}}><span>Image</span></button>
				pollButton = <span className="btn btn--selected">Poll</span>
				break;
		}
		switch(this.state.privacy) {
			case "public":
				publicButton = <span className="btn btn--selected">Public</span>
				friendsButton = <button className="btn" onClick={() => {this.setPrivacy("friends")}}><span>Friends</span></button>
				privateButton = <button className="btn" onClick={() => {this.setPrivacy("private")}}><span>Private</span></button>
				break;
			case "friends":
				publicButton = <button className="btn" onClick={() => {this.setPrivacy("public")}}><span>Public</span></button>
				friendsButton = <span className="btn btn--selected">Friends</span>
				privateButton = <button className="btn" onClick={() => {this.setPrivacy("private")}}><span>Private</span></button>
				break;
			case "private":
				publicButton = <button className="btn" onClick={() => {this.setPrivacy("public")}}><span>Public</span></button>
				friendsButton = <button className="btn" onClick={() => {this.setPrivacy("friends")}}><span>Friends</span></button>
				privateButton = <span className="btn btn--selected">Private</span>
				break;
				
		}
		return (
			<form className={`${this.state.type}-post`} onSubmit={this.handleSubmit}>
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
				<div className="post-control">
					<button className="btn btn--cancel" onClick={() => this.props.handleSubmitPost()}>
						<span>Cancel</span>
					</button>
					<button className="btn btn--submit">
						<span>Submit</span>
					</button>
				</div>
			</form>
		)
	}
} 
