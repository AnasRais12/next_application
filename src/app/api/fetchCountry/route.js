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
    else if(type == "city" && selectedcountry){
        console.log(selectedcountry,"Contry22 ")
        console.log(type,"type2")
        url = `http://api.geonames.org/searchJSON?country=${selectedcountry}&featureClass=P&maxRows=10&username=anasbaig`;
    }
     else if (type == "area" && city) {
     console.log(city,"____City is here! ")
    //  url = http://api.geonames.org/childrenJSON?geonameId=${city}}&username=anasbaig
      url = `http://api.geonames.org/childrenJSON?geonameId=${city}&username=anasbaig`
    } 

  

    else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
