import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const testNearby = async () => {
  try {
    console.log("--- TEST: NEARBY TEMPLES ---");
    
    // 1. Get token
    const regRes = await axios.post(`${BASE_URL}/auth/register`, {
      email: `admin_geo_${Date.now()}@templeconnect.com`,
      password: "admin123",
    });
    const token = regRes.data.token;

    // 2. Create a temple in Mumbai
    await axios.post(`${BASE_URL}/temples`, {
      name: "Siddhivinayak Temple",
      state: "Maharashtra",
      city: "Mumbai",
      deity: "Ganesha",
      location: {
        lat: 19.0169,
        lng: 72.8303,
      },
    }, { headers: { Authorization: `Bearer ${token}` } });

    // 3. Search nearby Mumbai (should find it)
    const nearbyRes = await axios.get(`${BASE_URL}/temples/nearby?lat=19.017&lng=72.831&distance=5000`);
    console.log("Nearby Mumbai (5km) count:", nearbyRes.data.count);

    // 4. Search nearby Delhi (should not find it)
    const farRes = await axios.get(`${BASE_URL}/temples/nearby?lat=28.6139&lng=77.2090&distance=5000`);
    console.log("Nearby Delhi (5km) count:", farRes.data.count);

    process.exit(0);
  } catch (error) {
    console.error("Geo Verification Failed:", error.response?.data || error.message);
    process.exit(1);
  }
};

testNearby();
