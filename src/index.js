const express = require('express')
const morgan = require('morgan')
const app = express();
const paht = require('path')
const {mongoose} = require('./database')


//configuracion
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'));
app.use(express.json());


//rutas
app.use('/api/tareas',require('./routes/tareas_routes'));

//archivos staticos
app.use(express.static(paht.join(__dirname,'./public')))


app.listen(app.get('port'),()=>{
    console.log("servidor iniciado en el puerto "+app.get('port'))
})