import { normalize, schema } from 'normalizr';

// Define a users schema
// const user = new schema.Entity('users', {}, { idAttribute: 'email' });

// Define your article
const commit = new schema.Entity(
  'commits',
  {
    // author: user,
    // commiter: user,
  },
  {
    idAttribute: 'commit',
  }
);

const normalizeData = (data) => normalize(data, [commit]);

export default normalizeData;
