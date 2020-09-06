const filterCommitsMap = {};

const filterCommits = (filter, commits) => {
  if (!commits || commits.length === 0) return [];

  const sampleData = typeof commits[0].commit === 'string';

  return filterCommitsMap[filter]
    ? filterCommitsMap[filter]
    : (filterCommitsMap[filter] = commits.filter((value) =>
        sampleData
          ? value.subject.toLowerCase().indexOf(filter.toLowerCase()) > -1
          : value.commit.message.toLowerCase().indexOf(filter.toLowerCase()) > -1
      ));
};

export default filterCommits;
