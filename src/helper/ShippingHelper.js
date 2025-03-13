import { supabase } from '@/lib/supabase';
import axios from 'axios';

export const createAddress = async (addressData, addressId) => {
  try {
    // 🛑 Step 1: Pehle check karo ke `addresses_id` exist karti hai ya nahi
    const { data: existingAddress, error: fetchError } = await supabase
      .from('shiping_address')
      .select('addresses_id')
      .eq('addresses_id', addressId)
      .maybeSingle(); // Single record check karega

    if (fetchError) {
      console.error("Error checking existing address:", fetchError);
      return null;
    }

    if (existingAddress) {
      console.log("Address already exists, skipping insertion.");
      return null // Agar exist karti hai to insert nahi karega
    }

    // 🚀 Step 2: Agar exist nahi karti to Shippo API se address create karo
    const response = await axios.post(
      'https://api.goshippo.com/addresses/',
      addressData,
      {
        headers: {
          'Authorization': `ShippoToken shippo_test_a97b9f8528a5ef7f01b17fe542157d5d780d0201`,
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("Address Created:", response.data);

    if (response.data) {
      const shippoResponse = response.data;
      console.log(shippoResponse, "shippoResponse");

      // 🚀 Step 3: Ab insert karo, kyunki address pehle exist nahi karta
      const { data, error } = await supabase
        .from('shiping_address')
        .insert([
          {
            addresses_id: addressId,
            object_id: shippoResponse.object_id, // Shippo se jo ID mili hai
            name: shippoResponse.name,
            street1: shippoResponse.street1,
            city: shippoResponse.city,
            state: shippoResponse.state,
            zip: shippoResponse.zip,
            country: shippoResponse.country,
            phone: shippoResponse.phone,
            email: shippoResponse.email,
            is_residential: shippoResponse.is_residential
          }
        ]);

      if (error) {
        console.log("Supabase Error:", error);
      } else {
        console.log("Data Inserted Successfully:", data);
      }

      return data;
    }
  } catch (error) {
    console.error("Error creating address:", error);
    return null;
  }
};
