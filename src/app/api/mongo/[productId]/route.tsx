import { MongoClient,ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request,productId) {
    try{

        const jsonFIle = JSON.stringify(productId);
        const parsedJson = JSON.parse(jsonFIle);
        const productIdValue = parsedJson.params.productId;

        // Connect to mongoDB
        const uri = "mongodb+srv://mongo:mongoDBpsswsd@helloheavendb.0xoa3i8.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

        try{
            // Go to collection
            const database = client.db("products");
            const values = database.collection("data");

            const data = await values.findOne({_id: new ObjectId(productIdValue)});

            return NextResponse.json({ok:true, data});
        }catch(error){
            console.log(error);
        }
    }catch(error){
        console.log(error);
    }
}