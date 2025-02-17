const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const app = express();
app.use(bodyParser.json());



app.get('/books', (req, res)=>{
  res.status(200).send(data);
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id
  const book = data.find(book => book.book_id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});



app.put('/books/:id', (req, res) => {
  const bookId = (req.params.id);
  const bookIndex = data.findIndex(book => book.book_id === bookId);

  if (!bookIndex) {
    return res.status(404).json({ message: 'Book not found' });
  }
  data[bookIndex] = { ...data[bookIndex], ...req.body };

  res.status(200).json(data[bookIndex]); 
});


app.delete('/books/:id', (req, res)=>{
  const bookIndex = data.findIndex(book => book.book_id === req.params.id)
  if (!bookIndex) {
    return res.status(404).json({ message: 'Book not found'});
  }
  const deletedbook=data.splice(bookIndex,1)[0];
  res.status(200).json({message:"The deleted book is", deletedbook});
  console.log(data);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
