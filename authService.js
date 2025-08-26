const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;

exports.login = async ({ username, password }) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const user = await client.db("users").collection("credentials").findOne({ username });

    if (!user || user.password !== password) {
      return { statusCode: 401, body: "Invalid credentials" };
    }

    const token = `${username}-${Date.now()}`;
    return { statusCode: 200, body: JSON.stringify({ token }) };
  } finally {
    await client.close();
  }
};
