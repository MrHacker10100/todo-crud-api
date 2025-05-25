import mongoose from 'mongoose'

const connectToDb = async ()=>{
    await mongoose.connect(process.env.URI).then((res)=>{
        console.log("Database connect Successfully")
    })
};

export default connectToDb; 