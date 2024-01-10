require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

// mongodb+srv://<username>:<password>@cluster0.rpi3hpm.mongodb.net/?retryWrites=true&w=majority

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rpi3hpm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("job-seekers");

    const jobsCollection = db.collection("jobs");

    app.get("/jobs", async (req, res) => {
      const cursor = jobsCollection.find({});
      const job = await cursor.toArray();

      res.send({ status: true, data: job });
    });

    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;

      const result = await jobsCollection.findOne({ id: id });
      console.log(result);
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello JobSeekers!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
