import React from 'react';

import Card from 'react-bootstrap';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.events.map((item, i) => {
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
      </div>
    );
  }
}

export default EventList;
