import commitlog from './commitlog';

// Simulates a fake `git log` request to fetch the git log data
export const getData = () => {
  return Promise.resolve(commitlog);
};

export const getFacebookReactCommits = () => {
  return fetch('https://api.github.com/repos/facebook/react/commits').then((response) =>
    response.json()
  );
};

export const getPixijsPixijsCommits = () => {
  return fetch('https://api.github.com/repos/pixijs/pixi.js/commits').then((response) =>
    response.json()
  );
};

export const getReduxjsReselectCommits = () => {
  return fetch('https://api.github.com/repos/reduxjs/reselect/commits').then((response) =>
    response.json()
  );
};

export const getPaularmstrongNormalizrCommits = () => {
  return fetch(
    'https://api.github.com/repos/paularmstrong/normalizr/commits'
  ).then((response) => response.json());
};

export const getMrdoobThreejsCommits = () => {
  return fetch(
    'https://api.github.com/repos/mrdoob/three.js/commits'
  ).then((response) => response.json());
};

export default getMrdoobThreejsCommits;
