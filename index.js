const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
// const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
// app.use(bodyParser.json())
// or
app.use(express.json())


// user: mydbuser
// password: kp8CEplf1dBn5QdA



const uri = "mongodb+srv://mydbuser:kp8CEplf1dBn5QdA@cluster0.u9lnx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   const collection = client.db("foodMasters").collection("users");
//   console.log("Hitting Database")
//   const user = {name: 'Opu biswas', email: 'opo@gmail.com', phone: '0172164560'}
//   collection.insertOne(user)
//   .then(() => {
//     console.log("insertOne Successfully")
//   })
// //   client.close();
// });



// client.connect(err => {
//   const collection = client.db("foodMasters").collection("users");
  
//   app.post('/users', (req, res) => {
//     const newUser = req.body;
//     const result = collection.insertOne(newUser);
//     console.log('got new user', req.body);
//     console.log('added user', result)
//     // res.send('inside post');
//     // res.send(JSON.stringify(result));
//     res.json(result);
//   })
// //   client.close();
// });


// client.connect(err => {
//   const collection = client.db("foodMasters").collection("users");
  
//   app.post('/users', (req, res) => {
//     const newUser = req.body;
//     const result = collection.insertOne(newUser)
//     .then(result => {
//       console.log('got new user', req.body);
//       console.log('added user', result)
//       // res.send('inside post');
//       // res.send(JSON.stringify(result));
//       res.json(result);
//     })
//   })
// //   client.close();
// });


// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("foodMasters");
//     const userCollection = database.collection("users");

//       // POST API
//       app.post('/users', async (req, res) => {
//       const newUser = req.body;
//       const result = await userCollection.insertOne(newUser);
//       console.log('got new user', req.body);
//       console.log('added user', result)
//       // res.send('inside post');
//       // res.send(JSON.stringify(result));
//       res.json(result);
//     })
//   }
//   finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);



async function run() {
  try {
    await client.connect();
    const database = client.db("foodMasters");
    const userCollection = database.collection("users");

      // GET API and received Client side data
      app.get('/users', async (req, res) => {
      const cursor = userCollection.find({})
      const users = await cursor.toArray();
      res.send(users);
    })

      // Dynamic Received Client side Data
      app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id)};
      const user = await userCollection.findOne(query);
      console.log('Update id', id);
      console.log('Update User', user);
      res.send(user);
    })

      // POST API
      app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      console.log('got new user', req.body);
      console.log('added user', result)
      // res.send('inside post');
      // res.send(JSON.stringify(result));
      res.json(result);
    })

    // Update API
    app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const updatedUser = req.body;
        const filter = { _id: ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            name: updatedUser.name,
            email: updatedUser.email
          },
        };
        const result = await userCollection.updateOne(filter, updateDoc, options);
        console.log('Updating User', id);
        // res.send('Updating User Successfully');
        res.json(result);
    })

    // DELETE API
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      console.log('deleted result', result)
      console.log('deleted user', id)

      res.json(result);
    })
  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World! Hello')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// box-shadow: 0 6px 7px -5px rgb(0 0 0 / 50%);