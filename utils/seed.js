const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomUsername,
  getRandomSentence,
  getRandomReaction,
  getRandomNumber,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  //Empty array to hold thoughts
  const thoughts = [];

  //Generates 8 random thoughts
  for (let i = 0; i < 8; i++) {
    const thoughtText = getRandomSentence(10);
    const username = getRandomUsername();

    //Generate reactions for each thought
    const reactions = [];
    for (let i = 0; i < 3; i++) {
      reactions.push({
        reactionBody: getRandomSentence(5),
        username: getRandomUsername(),
      });
    }

    thoughts.push({
      thoughtText,
      username,
      reactions,
    });
  }

  const thoughtData = await Thought.insertMany(thoughts);

  //Empty array to hold users
  const users = [];

  //Generates users based on the amount of thoughts
  for (let i = 0; i < thoughtData.length; i++) {
    const username = thoughtData[i].username;
    const email = `${username}@gmail.com`;
    const userThoughts = [
      thoughtData
        .filter((thought) => thought.username === username)
        .map((thought) => thought._id),
    ];

    users.push({
      username,
      email,
      thoughts: userThoughts,
    });
  }

  const userData = await User.insertMany(users);

  //Loops over the user Data and add a friend that is the next user in the array
  for(let i = 0; i < userData.length; i++){
    const friends = [];
    if(i + 1 < userData.length){
        friends.push(userData[i + 1]._id)
    }

    await User.findOneAndUpdate(
        {_id: userData[i]._id}, 
        { $push: {friends: { $each: friends }}}
    )

  }

  console.table(thoughtData, users);
  console.info("Seeding Complete");
  process.exit(0);
});
