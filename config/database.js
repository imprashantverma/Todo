const mongoose = require('mongoose');
require('dotenv').config();
const DbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser :true,
            useUnifiedTopology:true 
            });
        console.log('DB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = DbConnect;
