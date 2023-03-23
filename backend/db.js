const mongoose = require('mongoose');
const DB_uel="mongodb+srv://santonunaskar22:smritinaskar1@loginsignup.x0kzsof.mongodb.net/LoginSignup?retryWrites=true&w=majority"
const mongoURL =DB_uel;
mongoose.connect(mongoURL);

const connectToMongo = () => {
    mongoose.connect(mongoURL)
    .then(() => {
        console.log("connect")
    })
    .catch((err) => { console.log(err) });
}
module.exports = connectToMongo;

// const mongoose = require('mongoose')
// const mongoURL="mongodb://localhost:27017"
// const connectDB = async () => {
//     try {
//         mongoose.set('strictQuery', false)
//         mongoose.connect(mongoURL)
//         console.log('Mongo connected')
//     } catch(error) {
//         console.log(error)
//         process.exit()
//     }
// }

// module.exports = connectDB