"use client";

import { useEffect, useState } from "react";
import { getTemples } from "../lib/api";

export default function Home() {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    const res = await getTemples();
    setTemples(res.data || []);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        TempleConnect 🛕
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {temples.map((temple) => (
          <div
            key={temple._id}
            className="border rounded-xl p-4 shadow"
          >
            <h2 className="text-xl font-semibold">
              {temple.name}
            </h2>
            <p>{temple.city}, {temple.state}</p>
            <p className="text-sm text-gray-500">
              {temple.deity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}