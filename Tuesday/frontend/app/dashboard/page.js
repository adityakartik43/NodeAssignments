"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState([]);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const decodedToken = jwtDecode(token);
    setDecoded(decodedToken);
  }, []);

  useEffect(() => {
    if (!decoded) return;

    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/dashboard/get-data/${decoded.name}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setData(res.data.data);
    };

    fetchData();
  }, [decoded]);

  return (
    <>
      {data.map((elem, index) => (
        <div key={index}>
          {elem.name} - {elem.total_amount}
        </div>
      ))}
    </>
  );
};

export default Page;