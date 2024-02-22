import Link from "next/link";



export default function OrderCompleted(){

    return(
        <div className="w-full h-screen flex items-center justify-center flex-col gap-8 sniglet-regular">
            <h1 className="text-4xl font-bold">Order is completed</h1>
            <h2>[Its not gonna be processed  any futher]</h2>

            <Link href="/" className=" underline text-blue-500">[Return to Home]</Link>
        </div>
    )
}