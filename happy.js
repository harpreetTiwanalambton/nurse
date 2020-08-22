const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://harpreet:harpreetkaur@enterpriseproject.lao2q.mongodb.net/hospital?retryWrites=true&w=majority";

async function connect(){

  const client = new MongoClient(uri, { useNewUrlParser: true });
   
  try{
    await client.connect();
     const db=client.db("hospital");
     console.log(`connected to database ${db.databaseName}`)
     
     //  1) step creating collection 
  /*
     const collection=db.createCollection("nurse");
     console.log(`collection created ${(await collection).collectionName}`)
     
  */
    const nurse=db.collection("nurse")
  
    
  /*
   // 2) insert  documents into collection
      const insertCursor= await nurse.insertMany([
       {nurseID:121, name: 'Hina', age:25,gender:'female',phoneno:'437-239-8379',poistion:"Head nurse"},
        {nurseID:122, name: 'Nicol', age:28,gender:'female',phoneno:'647-211-8991',poistion:"nurse"},
        {nurseID:123, name: 'Carlo', age:29,gender:'female',phoneno:'437-340-1803',poistion:"Head nurse"},
        {nurseID:124, name: 'Happy', age:24,gender:'female',phoneno:'647-239-9918',poistion:"nurse"},
        {nurseID:125, name: 'Mann', age:28,gender:'male',phoneno:'647-771-1099',poistion:" Head nurse"},
        {nurseID:126, name: 'mithura', age:23,gender:'female',phoneno:'447-239-9011',poistion:"nurse"}

              
  ])
  
  
  console.log(insertCursor.insertedCount)
  */
  
  // 3) finding the document 
  
  const searchCursor =await nurse.find();
  //const searchCursor =await nurse.find({"name":"Mann"});
  const result=await searchCursor.toArray();
  result.forEach(r=>console.log(r));
  console.table(result)
  
  
  // 4)  updating the document
  
  const updateCursor=await nurse.updateOne(
    {"nurseID":125},
    {"$set":{"age":27}}
  )
  console.log(updateCursor.modifiedCount);
  
  
  
  //deleting the document
  /*
  const deleteCursor=await nurse.deleteOne(
      {"name":"Happy"}
   
  )
  console.log(deleteCursor.deletedCount)
  */
  }
  
  
  catch(ex){
    console.error(`something bad happen ${ex}`)
  }
  
  finally{
    client.close();
  }
  
  }
  connect();
   
  
  