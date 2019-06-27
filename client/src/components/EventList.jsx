import React from 'react';
import ReactPaginate from 'react-paginate';

import Card from 'react-bootstrap/Card';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.items.map((item, i) => {
          return (
            <Card bg="dark" text="white" key={i}>
              <Card.Header> </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p> {item.description} </p>
                  <footer className="blockquote-footer">
                    {item.date}
                    {' , '}
                    {item.category2}
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          );
        })}
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.props.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default EventList;