import React from 'react';
import Search from './Search.jsx';
import EventList from './EventList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.search = this.search.bind(this);
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

  render() {
    return (<div>
      React App
      <Search onSearch={this.search}/>
      {/* <EventList /> */}
    </div>)
  }
}

export default App;