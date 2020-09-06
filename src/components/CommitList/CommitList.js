import React from 'react';
import formatDate from '../../data/formatDate';
import getColour from '../../data/getColour';
import './CommitList.css';

const xSpacing = 15;
const ySpacing = 24;
const xOffset = 12;
const yOffset = 12;
const dotRadius = 4;

function Dot({ data: [xIndex, branch], yIndex }) {
  const colour = getColour(branch);
  const x = xOffset + xIndex * xSpacing;
  const y = yOffset + yIndex * ySpacing;

  return (
    <circle cx={x} cy={y} r={dotRadius} stroke="none" strokeWidth="1" fill={colour} />
  );
}

function Line({ data: [xIndex1, xIndex2, branch], yIndex }) {
  const colour = getColour(branch);
  const x1 = xOffset + xIndex1 * xSpacing;
  const y1 = yOffset + yIndex * ySpacing;
  const x2 = xOffset + xIndex2 * xSpacing;
  const y2 = yOffset + (yIndex + 1) * ySpacing;

  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth="1" />;
}

function Curve({ data: [xIndex1, xIndex2, branch], yIndex }) {
  const colour = getColour(branch);
  const x1 = xOffset + xIndex1 * xSpacing;
  const y1 = yOffset + yIndex * ySpacing;
  const x2 = xOffset + xIndex2 * xSpacing;
  const y2 = yOffset + (yIndex + 1) * ySpacing;

  const yDifference = y2 - y1;

  return (
    <path
      fill="none"
      stroke={colour}
      strokeWidth="2"
      d={`
        M ${x1} ${y1}
        C ${x1} ${y1 + yDifference * 0.75}, ${x2} ${y1 + yDifference * 0.25}, ${x2} ${y2}
      `}
    />
  );
}

function Graph({ graph }) {
  return (
    <>
      {graph.map((node, nodeIndex) => {
        return (
          <svg key={nodeIndex}>
            {node[2].map((route, routeIndex) => {
              return <Curve key={routeIndex} data={route} yIndex={nodeIndex} />;
            })}
            <Dot data={node[1]} yIndex={nodeIndex} />
          </svg>
        );
      })}
    </>
  );
}

const CommitList = ({ commits, graph, filtering }) => {
  if (!commits || commits.length === 0) return null;

  return (
    <div className="commit-list">
      <table>
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Graph</th>
            <th style={{ width: '50%' }}>Description</th>
            <th style={{ width: '10%' }}>Commit #</th>
            <th style={{ width: '10%' }}>Author</th>
            <th style={{ width: '15%' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {commits.map((commit) => {
            const testData = typeof commit.commit === 'string';

            const hash = testData ? commit.commit : commit.sha;
            const message = testData ? commit.subject : commit.commit.message;
            const author = testData ? commit.author.name : commit.commit.author.name;
            const date = testData ? commit.author.date : commit.commit.author.date;

            return (
              <tr key={hash}>
                <td></td>
                <td>
                  {/* <span>origin/test/1234</span> */}
                  {message}
                </td>
                <td>{hash}</td>
                <td>{author}</td>
                <td>{formatDate(date)}</td>
              </tr>
            );
          })}
        </tbody>
        {!filtering && (
          <svg
            className="commit-list-graph"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Graph graph={graph} />
          </svg>
        )}
      </table>
    </div>
  );
};

export default CommitList;
