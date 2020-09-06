function getGraph(commits) {
  const nodes = [];
  const offsets = [];
  const branchIndexes = {};
  let branchIndex = 0;

  function getBranchIndex(commitHash) {
    if (!branchIndexes[commitHash]) {
      branchIndexes[commitHash] = branchIndex;
      offsets.push(branchIndex);
      branchIndex += 1;
    }

    return branchIndexes[commitHash];
  }

  function hasBranch(commitHash) {
    return branchIndexes[commitHash] != null;
  }

  for (let i = 0; i < commits.length; ++i) {
    const commit = commits[i];

    const parentsLength = 1;
    const branchIndex = getBranchIndex(commit.sha);
    const branchIndexOffset = offsets.indexOf(branchIndex);
    const routes = [];

    // TODO: As you go through each commit, catalog the branch it should belong
    // to. When there is more than one parent, it's time to start creating new
    // branches. When there is just one parent, check to see if we can
    // collapse its branch...
    if (parentsLength === 1) {
      const parentCommit = { sha: commit.parent };
      const parentBranchExists = hasBranch(parentCommit.sha);

      if (parentBranchExists) {
        // Time to collapse a branch...

        // when a branch in the middle of the road collapses, we need to shift
        // all of the branches to the right of our target over by one to the left...
        for (let j = branchIndexOffset + 1; j < offsets.length; ++j) {
          routes.push([j, j - 1, offsets[j]]);
        }

        // Branches to the left of our target branch continue on straight...
        for (let j = 0; j < branchIndexOffset; ++j) {
          routes.push([j, j, offsets[j]]);
        }

        // Remove our target branch...
        offsets.splice(branchIndexOffset, 1);

        // Join our branching path...
        routes.push([
          branchIndexOffset,
          offsets.indexOf(branchIndexes[parentCommit.sha]),
          branchIndex,
        ]);
      } else {
        // The parent branch does not exist, so we'll be creating straight
        // lines...
        for (let j = 0; j < offsets.length; ++j) {
          routes.push([j, j, offsets[j]]);
        }
        branchIndexes[parentCommit.sha] = branchIndex;
      }
    } else if (parentsLength === 2) {
      // Create straight lines...
      branchIndexes[commit.parents[0].sha] = branchIndex;
      for (let j = 0; j < offsets.length; ++j) {
        routes.push([j, j, offsets[j]]);
      }

      // Add the new branch...
      const newBranchIndex = getBranchIndex(commit.parents[1].sha);
      const newBranchIndexOffset = offsets.indexOf(newBranchIndex);
      routes.push([branchIndexOffset, newBranchIndexOffset, newBranchIndex]);
    }

    // Create our node...
    const node = [commit.sha, [branchIndexOffset, branchIndex], routes];

    nodes.push(node);
  }

  return nodes;
}

export default getGraph;
