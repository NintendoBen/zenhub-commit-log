import React from 'react';
import './CommitList.css';

const CommitList = ({ commits }) => (
  <div className="commit-list">
    {commits.map((commit) => (
      <div>
        {commit.commit} | {commit.subject} | {commit.author.name}
      </div>
    ))}
  </div>
);

export default CommitList;
