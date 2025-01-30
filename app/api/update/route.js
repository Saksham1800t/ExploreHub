import { connectDB } from "@/app/utils/db";
import User from "@/models/User";
import { verify } from "jsonwebtoken";

export async function PUT(req) {
    try {
        await connectDB();
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verify(token, "saksham");

        if (!decoded) {
            return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
        }

        const { username, email } = await req.json();

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
            _id: { $ne: decoded.id } 
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: "Username or Email already exists" }), { status: 400 });
        }

        currentUser.username = username || currentUser.username;
        currentUser.email = email || currentUser.email;

        await currentUser.save();

        return new Response(JSON.stringify({ message: "Profile updated successfully", user: currentUser }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
