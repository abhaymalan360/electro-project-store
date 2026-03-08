import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { formatInTimeZone } from 'date-fns-tz';
import { adminAuth } from '@/lib/firebase-admin';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const origin = request.headers.get('origin') || 'http://localhost:3000';

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Validation for Environment Variables
        const requiredVars = ['RESEND_API_KEY', 'FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
        const missingVars = requiredVars.filter(v => !process.env[v]);
        if (missingVars.length > 0) {
            return NextResponse.json({
                error: `Configuration Error: Missing ${missingVars.join(', ')}. Please add them to Vercel Settings.`
            }, { status: 500 });
        }

        // 1. Generate the Sign-In Link using Firebase Admin
        const actionCodeSettings = {
            url: `${origin}/login-callback`,
            handleCodeInApp: true,
        };

        let link;
        try {
            link = await adminAuth.generateSignInWithEmailLink(email, actionCodeSettings);
        } catch (err: any) {
            console.error('Firebase Admin Link Error:', err);
            return NextResponse.json({
                error: `Firebase Error: ${err.message}. Check your Service Account credentials in Vercel.`
            }, { status: 500 });
        }

        // 2. Current time in IST (Delhi)
        const now = new Date();
        const istTime = formatInTimeZone(now, 'Asia/Kolkata', "d MMMM yyyy, h:mm a 'IST'");

        // 3. Send Email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Electro Project Store <onboarding@resend.dev>',
            to: [email],
            subject: 'Login link for Electro Project Store',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1a1a1a; border-radius: 12px; background-color: #030712; color: #fff; }
                        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #1f2937; }
                        .logo { color: #22d3ee; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; }
                        .content { padding: 30px 20px; text-align: center; }
                        .time { font-size: 12px; color: #9ca3af; margin-bottom: 20px; }
                        .button { display: inline-block; padding: 14px 30px; background-color: #22d3ee; color: #020617; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.3s; }
                        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #1f2937; font-size: 12px; color: #6b7280; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">ELECTRO PROJECT STORE</div>
                        </div>
                        <div class="content">
                            <p class="time">Requested on ${istTime}</p>
                            <h2>Hello,</h2>
                            <p>We received a request to log in to your Electro Project Store account using this email address.</p>
                            <p style="margin-bottom: 30px;">Click the button below to sign in securely:</p>
                            <a href="${link}" class="button">Log In to My Account</a>
                            <p style="margin-top: 30px; font-size: 14px;">If you did not request this link, you can safely ignore this email.</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2026 Electro Project Store. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({
                error: `Resend Email Error: ${error.message}. Check your RESEND_API_KEY in Vercel.`
            }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Internal Server Error:', error);
        return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
    }
}
