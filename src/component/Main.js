import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../Firebase'

export default class Main extends Component {
      constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('boards');
        this.unsubscribe = null;
          this.state = {
            boards: []
          };
      }

      onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { title, description, author, image } = doc.data();
          boards.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            description,
            author,
            image
          });
        });
        this.setState({
          boards
       });
       console.log(boards)
      }

      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      }


  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              BOARD LIST
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create">Add Board</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr key={board.key}>
                    <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
                    <td><img style={{height: "50px", width: "100px"}} src={board.image.avatarURL} alt="it" /></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
