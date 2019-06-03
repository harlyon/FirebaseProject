import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase'

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    console.log(this.state.board)
    return (
       <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          <h4><Link to="/">Board List</Link></h4>
            <h3 className="panel-title">
              {this.state.board.title}
            </h3>
          </div>
          <div className="panel-body">
            <div>
              <h2>Description:</h2>
              <h4>{this.state.board.description}</h4>
              <h2>Author:</h2>
              <h4>{this.state.board.author}</h4>
              <h4><img style={{height: "50px", width: "100px"}} src={this.state.board.image !== undefined ? this.state.board.image.avatarURL : ''} alt="it" /></h4>
            </div>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;