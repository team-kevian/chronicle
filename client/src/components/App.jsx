import React from 'react';
import axios from 'axios';
import EventList from './EventList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], pageCount: 0, term: '' };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  getInitialPageAndCount() {
    let pcount = 0;
    axios
      .get('http://localhost:3000/events?')
      .then(data => {
        console.log(data.data.length);
        pcount = data.data.length / 10;
        console.log('THIS IS PCOUNT:', pcount);

        axios
          .get('http://localhost:3000/events?_page=1')
          .then(data => {
            console.log('This is pcount:', pcount);
            this.setState({ events: data.data, pageCount: pcount });
            console.log(this.state.pageCount);
          })
          .catch(err => {
            console.log(
              'There is an error in retrieving first page of items on component mount '
            );
          });
      })
      .catch(err => {
        console.log(
          'There is an error in retrieving page count on component mount: ',
          err
        );
      });
  }

  componentDidMount() {
    this.getInitialPageAndCount();
  }

  handlePageClick(data) {
    let term = '';
    let page = data.selected + 1;

    if (this.state.term === '') {
      term = `http://localhost:3000/events?_page=${page}`;
    } else {
      let queryWord = this.state.term;
      term = `http://localhost:3000/events?q=${queryWord}&_page=${page}`;
    }

    axios
      .get(term)
      .then(data => {
        console.log(data.data);
        this.setState({ items: data.data });
      })
      .catch(err => {
        console.log(
          'An error occurred when attempting to request new page information from json server: ',
          err
        );
      });
  }

  render() {
    return (
      <EventList
        pageCount={this.state.pageCount}
        items={this.state.items}
        handlePageClick={this.handlePageClick}
      />
    );
  }
}

export default App;
