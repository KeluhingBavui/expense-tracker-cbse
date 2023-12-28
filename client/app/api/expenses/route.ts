import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/expenses?id=${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error(response);
            return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}