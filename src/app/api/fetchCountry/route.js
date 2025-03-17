import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch('http://api.geonames.org/countryInfoJSON?username=anasbaig');
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}