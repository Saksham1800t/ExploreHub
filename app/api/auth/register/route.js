import { connectDB } from '@/app/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await connectDB();
        const { username, email, password } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });
        }
        const existingUser1 = await User.findOne({ username });
        if (existingUser1) {
            return new Response(JSON.stringify({ message: "Username already exists" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
