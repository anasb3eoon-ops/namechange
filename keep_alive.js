const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Neon Identity Bot is Alive!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 خادم البقاء يعمل على المنفذ ${PORT}`);
});
