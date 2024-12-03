const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin'); 

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require('./interview.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); 

app.post('/items', async (req, res) => {
  try {
    const item = { name: req.body.name };
    const docRef = await db.collection('items').add(item); 
    const newItem = { id: docRef.id, ...item };
    res.json(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/items', async (req, res) => {
  try {
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(5001, () => console.log('Server running on port 5001'));
