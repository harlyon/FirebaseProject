import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import FileUploader from "react-firebase-file-uploader";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
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


  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author,
          image: board.image.avatarURL
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
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
    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      title,
      description,
      author,
      image
    }).then((docRef) => {
      this.setState({
        key: '',
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
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  render() {
    return (
      <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            EDIT BOARD
          </h3>
        </div>
        <div className="panel-body">
          <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Board List</Link></h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
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
                                <span><i className="mdi mdi-image-area"> - </i>File Preview</span>
                              { this.state.image.isUploading &&
                                <p>progress : {this.state.image.progress}  </p>
                              }
                              { this.state.image.avatarURL ?
                                (
                                  <div>
                                    <img style={{height: "50px", width: "100px"}} src={this.state.image.avatarURL} alt="hry" />
                                  </div>
                                ) :
                                null
                              }
                        </div>
                    </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

export default Edit;