import * as express from 'express'; 
import { join } from 'path';
import * as bodyParser from 'body-parser';

import { api } from './server/routes/api';


const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(join(__dirname, './dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, './dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';

app.set('port', port);


app.listen(port, () => console.log(`API running on localhost:${port}`));