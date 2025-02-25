const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

//middelwear
app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://mahiburislamsazib:IWlcIkzcBeH3dpjW@cluster0.rjpks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Get the database and collection on which to run the operation
    /* const database = client.db("sample_mflix");
    const user = database.collection("user"); */

    const usersCollections = client.db("simpleCRUD").collection("users");

    app.get("/users", async (req, res) => {
      const users = await usersCollections.find().toArray();
      res.send(users)
    })

    app.post("/users", async (req, res) => {
      const user = req.body
      const result = await usersCollections.insertOne(user);
      res.send(result)
    })

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const user = req.body
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: user.name,
          email: user.email
        },
      };
      const result = await usersCollections.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollections.deleteOne(query);
      res.send(result)
    })

  } finally {
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("server is running success")
})

app.listen(port, () => {
  console.log(`server is running in ${port}`);

})
