const usernames = ["Noah83", "apple", "casual", "programming", "Chris24", "John997", "Applewood", "cat44", "dog88", "car22"];

const words = [
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "Cras",
  "vulputate",
  "elit",
  "eu",
  "congue",
  "sodales",
  "Suspendisse",
  "potenti",
  "Phasellus",
  "vulputate",
  "ipsum",
  "nulla",
];

//Generates a random number so they're is a very low possibilty of duplicates
const getRandomNumber = (int) => Math.floor(Math.random() * int);

// Gets a random item frm any array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () => {
    return `${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}${getRandomNumber(101)}`;
};

// Creates random sentences for thoughts and reactions
const getRandomSentence = (int) => {
    let result = "";
    for(let i = 0; i < int; i++){
        result += (getRandomArrItem(words));
    }
    return result;
}

module.exports = { getRandomUsername, getRandomSentence, getRandomNumber };