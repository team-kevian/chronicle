import React from 'react';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      term: '',
      pageCount: 0
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  // function that makes initial get request to JSON Server when component first successfully mounts
  // then sets state with for first 10 items found in events object
  getInitialPageAndCount() {
    axios
      .get('http://localhost:3000/events?_page=1')
      .then(data => {
        // pcount -> total count of items found inside of events object
        // used for server-side pagination
        let pcount = data.headers['x-total-count'] / 10;
        this.setState({ items: data.data, pageCount: pcount });
      })
      .catch(err => {
        console.log(
          'There is an error in retrieving first page of items on component mount: ',
          err
        );
      });
  }

  componentDidMount() {
    this.getInitialPageAndCount();
  }

  // click handler function that when triggered makes query to JSON server for given term or page currently selected
  // then sets state with what's returned from result of query
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
        this.setState({ items: data.data });
      })
      .catch(err => {
        console.log(
          'An error occurred when attempting to request new page information from json server: ',
          err
        );
      });
  }

  // invoked when user triggers search button, makes get request to JSON server for search term and sets state with returned data
  search(term) {
    axios
      .get(`/events?q=${term}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          items: response.data
        });
      })
      .catch(err => console.error(err));
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Search
          onSearch={this.search}
          onChangeDetect={this.handleChange}
          term={this.state.term}
        />
        <EventList
          pageCount={this.state.pageCount}
          items={this.state.items}
          handlePageClick={this.handlePageClick}
        />
      </div>
    );
  }
}

export default App;
