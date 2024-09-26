import { NextApiRequest,NextApiResponse } from "next";
import severAuth from "@/lib/severAuth";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "GET"){
        return res.status(405).end();
    }
    try{
        const{currentUser} = await severAuth(req)
;
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }

}