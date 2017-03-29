import React from 'react';

const PollVoted = (props) => {
  return (
    <div className="jumbotron text-center">
      <h1>Poll voted!</h1>
      <h2>Thank you for voting!!</h2>
      <h3><i className="fa fa-thumbs-up" aria-hidden="true"></i></h3>
      <a href='/' className="btn btn-success">Back home</a>
    </div>
  );
}

export default PollVoted;
