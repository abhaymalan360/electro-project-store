import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const amount = searchParams.get("amount");
    const name = searchParams.get("name") || "Customer";

    const upiId = "abhaymalan@fam";
    const payeeName = "Electro Project Store";

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // UPI payment URL with amount baked in
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Payment by ${name}`)}`;

    try {
        // Generate QR code as a data URL (PNG base64)
        const qrDataUrl = await QRCode.toDataURL(upiUrl, {
            width: 280,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        });

        return NextResponse.json({
            qrCode: qrDataUrl,
            upiUrl,
            upiId,
            amount: Number(amount),
        });
    } catch (error) {
        console.error("QR generation failed:", error);
        return NextResponse.json(
            { error: "Failed to generate QR code" },
            { status: 500 }
        );
    }
}
