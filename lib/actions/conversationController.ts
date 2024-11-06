"use server";

import { connectToDb } from "../database/db";
import Conversation from "../database/model/Conversation";

export const conversationStore =async (messages:any)=>{
    try {
        await connectToDb();
        console.log(messages);
        
        const conversation = await Conversation.create(messages);
        console.log(conversation);
        
    } catch (error) {
        console.log(error);
        
    }    
}