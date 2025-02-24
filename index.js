const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;



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
