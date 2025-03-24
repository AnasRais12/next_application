// import axios from 'axios';

// export const createAddress = async (addressData, parcelData,senderaddress,fromaddress) => {
//   try {
//     // 🚀 Step 1: Pehle Shippo API se address create karo
//     const addressResponse = await axios.post(
//       'https://api.goshippo.com/addresses/',
//       addressData,
//       {
//         headers: {
//           'Authorization': `ShippoToken shippo_test_a97b9f8528a5ef7f01b17fe542157d5d780d0201`,
//           'Content-Type': 'application/json',
//         }
//       }
//     );

//     const address = addressResponse.data;
//     console.log("✅ Address Created Successfully:", address);

//     if (!address.object_id) {
//       console.error("❌ Address creation failed, cannot proceed with shipment.");
//       return null;
//     }

//     // 🚀 Step 2: Ab shipment create karo using the created address
//     const shipmentData = {
//       address_from: senderaddress,
//       address_to: fromaddress, // Dono same rakh raha hoon, tum change kar sakte ho
//       parcels: [parcelData]
//     };

//     const shipmentResponse = await axios.post(
//       'https://api.goshippo.com/shipments/',
//       shipmentData,
//       {
//         headers: {
//           'Authorization': `ShippoToken shippo_test_a97b9f8528a5ef7f01b17fe542157d5d780d0201`,
//           'Content-Type': 'application/json',
//         }
//       }
//     );

//     console.log("✅ Shipment Created Successfully:", shipmentResponse.data);

//     return shipmentResponse.data; // Shipment ka response return kar raha hai

//   } catch (error) {
//     console.error("❌ Error in address or shipment creation:", error);
//     return null;
//   }
// };

// export const purchaseLabel = async (rateObjectId) => {
//   try {
//     const transactionResponse = await axios.post(
//       'https://api.goshippo.com/transactions/',
//       {
//         rate: rateObjectId,  // Yahan wo rate.object_id pass karo jo shipment create response se mila
//       },
//       {
//         headers: {
//           'Authorization': `ShippoToken shippo_test_a97b9f8528a5ef7f01b17fe542157d5d780d0201`,
//           'Content-Type': 'application/json',
//         }
//       }
//     );

//     console.log("✅ Label Purchased Successfully:", transactionResponse.data);

//     // Label URL ko return kar raha hoon jisse download kar sako
//     return transactionResponse.data.label_url;

//   } catch (error) {
//     console.error("❌ Error purchasing label:", error);
//     return null;
//   }
// };
