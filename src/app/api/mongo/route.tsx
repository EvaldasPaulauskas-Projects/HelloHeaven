import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// GETTING ALL DATA FROM MONGODB
const url = process.env.MONGODB_URI;

export async function GET() {
  
    const client = new MongoClient(url);
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

  const client = new MongoClient(url);

  try {
    const database = client.db("orders");
    const values = database.collection("data");

    const data = await values.insertOne(body);

    return NextResponse.json({ ok: true, data });
  } finally {
    await client.close();
  }
}