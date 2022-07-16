const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes/empresas');

app.use(cors());

app.set('port', process.env.PORT || 3001);

app.use(express.json());

//Rutas
app.use('/', routes);

//Iniciar server
app.listen(app.get('port'), () => {
    console.log('Server runing in port', app.get('port'));
})