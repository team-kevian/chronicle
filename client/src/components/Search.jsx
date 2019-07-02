import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.search = this.search.bind(this);
  }

  search() {
    this.props.onSearch(this.props.term);
  }

  render() {
    return (<div>
      <div className="box">
      <input value={this.props.term} onChange={this.props.onChangeDetect} />
      <button onClick={this.search}>Find Results</button>
      </div>
    </div>)
  }
}

export default Search;