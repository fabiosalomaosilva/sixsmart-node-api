import app from './app';

const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log('Server running as ' + new Date().toTimeString() + ' 🔥🔥');
});
