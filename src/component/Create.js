import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import FileUploader from "react-firebase-file-uploader";

export default class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: '',
      image: {
        avatar: '',
        isUploading: '',
        progress: 0,
        avatarURL: ''
      }
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleUploadStart = () => {
    this.setState({ image: { isUploading: true, progress: 0 } })
  }

  handleProgress = (progress) => {
    this.setState({ image: { progress } });
  }

  handleUploadSuccess = (filename) => {
    console.log(this.state.image);
    this.setState({ image: { avatar: filename, progress: 100, isUploading: false } })
    firebase
    .storage()
    .ref("images")
    .child(filename)
    .getDownloadURL()
      .then(url => this.setState({ image: { avatarURL: url } }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, author, image } = this.state;
    this.ref.add({
      title,
      description,
      author,
      image
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
        image: {
          avatar: '',
          isUploading: '',
          progress: 0,
          avatarURL: ''
        },
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }


  render() {
    const { title, description, author } = this.state;
      return (
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                ADD BOARD
              </h3>
            </div>
            <div className="panel-body">
              <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea value={description} className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3" />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author:</label>
                  <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
                </div>
                <div className="col-md-12">
                      <FileUploader
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                            />
                            <br /><br />
                        <div className="fuzone">
                                <span><i className="mdi mdi-image-area"> </i></span> 
                              { this.state.image.isUploading &&
                                <p>progress : {this.state.image.progress} </p>
                              }
                              {
                                this.state.image.progress && 
                                <div>
                                <br />
                                <br />
                                 <div className="spinner-border text-muted mt-50"></div>
                                 </div>
                              }
                              { this.state.image.avatarURL ?
                                (
                                  <div>
                                    <img style={{height: "50%", width: "50%"}} src={this.state.image.avatarURL} alt="hry" />
                                  </div>
                                ) : null
                              }
                        </div>
                    </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
    )
  }
}
