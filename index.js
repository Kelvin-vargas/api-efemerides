const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/efemerides', (req, res) => {
      const filePath = path.join(__dirname, 'efemerides.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return res.status(500).json({ error: 'Error al leer las efemérides' });
    }

    try {
      const efemerides = JSON.parse(data);
      res.json(efemerides);
    } catch (parseError) {
      console.error('Error al parsear el JSON:', parseError);
      res.status(500).json({ error: 'Error al procesar las efemérides' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});