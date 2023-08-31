const mongoose = require('mongoose')

const DBconnect = (url) =>{
    mongoose
    .connect(url)
    .then((res)=>{console.log('DB connected');})
    .catch((err)=>{console.log('Connecting error', err);})

    console.log('DB running...');
}

module.exports = DBconnect
