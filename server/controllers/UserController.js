


import userModel from "../models/userModels.js";
import { Webhook } from "svix";               // For Clerk webhook signature verification






// Api CONTROLLER FUNCTION TO MANAGE CLERK USER WITH DATABASE


//http://localhost:4000/api/user/webhooks


const clerkWebhook = async (req, res) => {

  
  try {

    // create a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],

    })

    const { data, type } = req.body;
    
    switch (type) {
      case "user.created": {

        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name
          
          
        }
        await userModel.create(userData)
        res.json({ });
        

        break;
      }
      case "user.updated": {
        const userData = {
          
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name
          
          
        }
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
        res.json({  });
        

        break;
      }
      case "user.deleted": {

        await userModel.findOneAndDelete({ clerkId: data.id })
        res.json({});
        

        break;
      }
        // Handle the event type here
        
      default:
        // Handle unknown event types
        break;
    }
    
  } catch (error) {

    console.log(error.message);
    res.json({ success:false, message: error.message });
    
  }

}



//API CONTROLLER FUNCTION TO GET USER AVAILABLE CREDITS DATA

const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const userData = await userModel.findOne({ clerkId });
    

    res.json({ success: true, credits: userData.creditBalance });


  }catch (error) {
    console.log(error.message);
    res.json({ success:false, message: error.message });
    
  }
}


export { clerkWebhook,userCredits };