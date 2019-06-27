import React from 'react';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      term: ""
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search(term) {
    console.log(`${term} was searched`);
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
    return (<div>
      <Search onSearch={this.search} onChangeDetect={this.handleChange} term={this.state.term}/>
    </div>)
  }
}

export default App;