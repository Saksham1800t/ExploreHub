import { connectDB } from '@/app/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 400 });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, "saksham", { expiresIn: '7h' });

        return new Response(JSON.stringify({ token, user: { id: user._id, username: user.username, email: user.email } }), { status: 200 });

    } catch (error) {
        return { error: error.message };
    }
}