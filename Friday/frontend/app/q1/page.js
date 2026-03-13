"use client";

import { useRef, useState } from "react";

const getData = async (name) => {
  const res = await fetch(`http://localhost:3001/api/users/${name}`);
  const data = await res.json();
  return data;
};

const page = () => {
  const [users, setUsers] = useState([]);
  const searchRef = useRef(null);

  const fn = async () => {
    const value = searchRef.current.value;
    console.log(value);

    const data = await getData(value);
    console.log(data.data)
    setUsers(data.data);
  };

  return (
    <>
      <input
        type="search"
        className="border-2 border-white m-5 p-1 rounded-lg focus:bg-gray-900"
        ref={searchRef}
        onChange={fn}
      />

      {
        users.map((elem)=>{
          return <div key={elem.user_id} className="border-1 border-white p-2 m-2 flex justify-between">
            <div>{elem.first_name} {elem.last_name}</div> <div>{elem.username}</div></div>
        })
      }

    </>
  );
};

export default page;
