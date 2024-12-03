import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, Typography, Paper } from '@mui/material';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/items')
      .then(res => setItems(res.data));
  }, []);

  const addItem = () => {
    if (input.trim() === '') return;
    axios.post('http://localhost:5001/items', { name: input })
      .then(res => {
        setItems([...items, res.data]);
        setInput('');
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>CRUD App</Typography>
      <Paper sx={{ p: 3 }}>
        <TextField
          label="Enter item name"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addItem}
          fullWidth
        >
          Add
        </Button>
      </Paper>
      <List sx={{ mt: 3 }}>
        {items.map((item) => (
          <ListItem key={item.id} divider>
            {item.name}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
