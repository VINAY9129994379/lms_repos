import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const payload = JSON.stringify(req.body); // Ensure the body is a string
        await whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_address?.[0]?.email_address || "",
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    imageUrl: data.image_url || "",
                };

                await User.create(userData);
                return res.json({ success: true });
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_address?.[0]?.email_address || "",
                    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                    imageUrl: data.image_url || "",
                };
                await User.findByIdAndUpdate(data.id, userData);
                return res.json({ success: true });
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true });
            }

            default:
                return res.status(400).json({ success: false, message: "Unhandled event type" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
