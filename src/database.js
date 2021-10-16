const mongoose = require('mongoose')
const URI = 'mongodb+srv://helder_user:ZBGpWvPTc7Ce9QhS@cluster0.ux9ut.mongodb.net/dbtareas?retryWrites=true&w=majority';

mongoose.connect(URI)
.then(db => console.log("La base de data esta conectada"))
.catch(error => console.log(error))

module.exports = mongoose;








