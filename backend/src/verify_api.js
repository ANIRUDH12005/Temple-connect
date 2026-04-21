import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const testAPI = async () => {
  try {
    console.log("--- TEST: REGISTER ADMIN ---");
    const regRes = await axios.post(`${BASE_URL}/auth/register`, {
      email: `admin_${Date.now()}@templeconnect.com`,
      password: "admin123",
    });
    console.log("Register Success:", regRes.data.success);
    const token = regRes.data.token;

    console.log("\n--- TEST: GET ALL TEMPLES (EMPTY) ---");
    const getRes = await axios.get(`${BASE_URL}/temples`);
    console.log("Get All Success:", getRes.data.success, "Count:", getRes.data.count);

    console.log("\n--- TEST: CREATE TEMPLE (PROTECTED) ---");
    const createRes = await axios.post(
      `${BASE_URL}/temples`,
      {
        name: "Kedarnath Temple",
        state: "Uttarakhand",
        city: "Kedarnath",
        deity: "Shiva",
        location: {
          lat: 30.7352,
          lng: 79.0669,
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Create temple success:", createRes.data.success);
    const templeId = createRes.data.data._id;

    console.log("\n--- TEST: SEARCH TEMPLE ---");
    const searchRes = await axios.get(`${BASE_URL}/temples?name=Kedar`);
    console.log("Search results count:", searchRes.data.count);

    console.log("\n--- TEST: GET SINGLE TEMPLE (INCREMENTS VIEWS) ---");
    const singleRes = await axios.get(`${BASE_URL}/temples/${templeId}`);
    console.log("Single temple views:", singleRes.data.data.views);

    console.log("\n--- TEST: GET POPULAR TEMPLES ---");
    const popRes = await axios.get(`${BASE_URL}/temples/popular`);
    console.log("Popular temples count:", popRes.data.count);

    console.log("\n--- TEST: DELETE TEMPLE (PROTECTED) ---");
    const delRes = await axios.delete(`${BASE_URL}/temples/${templeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Delete success:", delRes.data.success);

    process.exit(0);
  } catch (error) {
    console.error("Verification Failed:", error.response?.data || error.message);
    process.exit(1);
  }
};

testAPI();
