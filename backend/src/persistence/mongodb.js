const { MongoClient, ObjectId } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = process.env.MONGO_HOST || "";
console.log("mongodb url:", uri);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
const dbName=process.env.MONGO_DB;

async function init() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);

async function teardown() {
  return new Promise((accept, reject) => {
    if(!client){
      accept();
    }  
    
    client.close((err)=>{
      if(err) reject(err);
      else accept();
    });
  });
}


async function getItems() {
    try {
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const collection = db.collection('todoItems');
      const findResult = await collection.find({}).toArray();
      if(findResult.length===0){
        console.log("No data found !!!!");
        return [];
      }
      
      console.log('Found documents =>', findResult);
      return findResult;
    } catch (error) {
      console.dir("ERROR in get items(getItems()):",error);
      console.error("ERROR in getItems():", error);
      console.log("ERROR in getItems():", error);
    }finally {
      await client.close();

    }
}


async function getItem(item) {
  console.log('(getItem)_ =>', item,typeof item);
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('todoItems');
    const findOneResult = await collection.findOne({id:item});
    if(findOneResult.length===0){
      console.log("No data found !!!!");
      return {};
    }
    
    console.log('Found document getItem() =>', findOneResult);
    return findOneResult;
  } catch (error) {
    console.dir("ERROR in get item(getItem()):",error);
    console.error("ERROR in getItem():", error);
    console.log("ERROR in getItem():", error);
  }finally {
    await client.close();

  }
}


async function storeItem(item) {
  try { 
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      const collection = db.collection('todoItems');
      const insertItem = await collection.insertOne({...item,completed: item.completed ? 1 : 0 });
      console.log('Inserted documents =>', insertItem);
      return insertItem;

    } catch (error) {
      console.dir("ERROR in add items(addItems()):",error);
      console.error("ERROR in getItems():", error);
      console.log("ERROR in getItems():", error);
    }finally {
      await client.close();
    }
}

async function updateItem(id,item) {
  try { 
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('todoItems');
    const updateResult = await collection.updateOne(
      { id:id }, 
      { 
        $set: { 
          name:item.name,	
          completed:  item.completed ? 1 : 0 
        } 
      }
    );
    console.log('Updated documents =>', updateResult);
    return updateResult;

  } catch (error) {
    console.dir("ERROR in add items(addItems()):",error);
    console.error("ERROR in getItems():", error);
    console.log("ERROR in getItems():", error);
  }finally {
    await client.close();
  }
}


async function removeItem(item) {
  try { 
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const todoItems = db.collection('todoItems');
    const deleteOne = await todoItems.deleteOne({id:item});

    console.log('Updated documents =>', deleteOne);
    return deleteOne;

  } catch (error) {
    console.dir("ERROR in add items(addItems()):",error);
    console.error("ERROR in getItems():", error);
    console.log("ERROR in getItems():", error);
  }finally {
    await client.close();
  }
}

module.exports={
    init,teardown,getItems,storeItem,getItem,updateItem,removeItem
}