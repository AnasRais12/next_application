import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // country, city, ya area
  const selectedcountry = searchParams.get("country"); // 🌍 Country code (cities ke liye)
  const city = searchParams.get("city"); // 🏙 City name (areas ke liye)

  

  try {
    let url = "";

    if (type == "country") {
      url = `http://api.geonames.org/countryInfoJSON?username=anasbaig`;
      console.log(selectedcountry,"Contry")
      console.log(type,"type1")
    } 
    else if(type == "city" && country){
        console.log(selectedcountry,"Contry22 ")
        console.log(type,"type2")
        url = `http://api.geonames.org/searchJSON?country=${selectedcountry}&featureClass=P&maxRows=10&username=anasbaig`;
    }

    // if(type == "city" && country){
    //     console.log(country,"Contry")
    //     console.log(type,"type1")
    //     url = `http://api.geonames.org/searchJSON?country=${country}&featureClass=P&maxRows=10&username=anasbaig`;
    // }
    // else{
    //     return NextResponse.json({ error: "Error Fetch City request" }, { status: 402 });
    // }
    // else if (type == "city" && country) {
    //     console.log(country,"_____>>")
    //          https://api.geonames.org/searchJSON?country=${selectedCountry}&featureClass=P&maxRows=10&username=${USERNAME}
    //   url = `http://api.geonames.org/searchJSON?country=${country}&featureClass=P&maxRows=10&username=anasbaig`;
    // } 
    // else if (type == "area" && city) {
    //   url = `http://api.geonames.org/searchJSON?name_equals=${city}&featureClass=A&maxRows=10&username=anasbaig`;
    //   http://api.geonames.org/childrenJSON?geonameId=${selectedCity}&username=${USERNAME}`
    // } 
    // else {
    //   return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    // }

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
