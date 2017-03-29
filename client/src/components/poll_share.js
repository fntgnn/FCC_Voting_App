import React from 'react';

const PollShare = (props) => {
  return (
    <div className="jumbotron text-center">
      <h1>Poll created!</h1>
      <h2>Share your poll with your friends!</h2>
      <p>Go and <a href={`/poll/${props.params.id}`}>vote!</a></p>
    </div>
  );
}

export default PollShare;
