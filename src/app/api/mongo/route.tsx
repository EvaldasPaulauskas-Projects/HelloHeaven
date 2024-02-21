import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// GETTING ALL DATA FROM MONGODB
export async function GET() {
    const uri = "mongodb+srv://mongo:mongoDBpsswsd@helloheavendb.0xoa3i8.mongodb.net/?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
    try {
      const database = client.db("products");
      const values = database.collection("data");
  
      const allData = await values.find({}).toArray();
  
      return NextResponse.json({ ok: true, allData });
    } finally {
      await client.close();
    }
}

// SENDING DATA TO MONGODB
export async function POST(request) {
  let body = await request.json();
  
  const uri ="mongodb+srv://mongo:mongoDBpsswsd@helloheavendb.0xoa3i8.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    const database = client.db("orders");
    const values = database.collection("data");

    const data = await values.insertOne(body);

    return NextResponse.json({ ok: true, data });
  } finally {
    await client.close();
  }
}