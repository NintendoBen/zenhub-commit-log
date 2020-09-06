const randomColours = [];

function getRandomColour(index) {
  if (randomColours[index] != null) return randomColours[index];

  randomColours[index] = '#' + Math.floor(Math.random() * 16777215).toString(16);

  return randomColours[index];
}

const colours = [
  '#df9ff7',
  '#96d0ec',
  '#8ae798',
  '#ec9696',
  '#f7eb9f',
  '#ecb396',
  '#e78d8a',
];

function getColour(index) {
  index = index % colours.length;

  return colours[index];
}

export default getColour;
