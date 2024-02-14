const express = require('express');
const cors = require('cors');
const tarifRouter = require('./routes/tarif.routes');
const serviceRouter = require('./routes/service.routes');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.disable('etag');
app.use(express.json());
app.use('/api', tarifRouter);
app.use('/api', serviceRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
