const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// Middleware to handle Cross-Origin Resource Sharing
app.use(cors());
// Parse incoming requests with JSON payloads
app.use(express.json());

//MongoDB

const uri =
  "mongodb+srv://aciKrishibazar:ELqmSdrnQDkZRUYF@cluster0.binqvht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const productsCollection = client.db("aciKrisibazar").collection("products");
  const cartCollection = client.db("aciKrisibazar").collection("carts");
  try {
    await client.connect();
    //! Get Data From Database 1
    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });
    //! Cart post 2
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to the Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//ELqmSdrnQDkZRUYF
//aciKrishibazar
//ELqmSdrnQDkZRUYF
