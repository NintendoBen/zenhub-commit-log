import commitlog from './commitlog';

// Simulates a fake `git log` request to fetch the git log data
export const getData = () => {
  return Promise.resolve(commitlog);
};

export default getData;
