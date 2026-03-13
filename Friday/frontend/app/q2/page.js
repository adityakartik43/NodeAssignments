"use client";

import { useEffect, useRef, useState } from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3001/api/students/data");
  const data = await res.json();
  return data.data;
};

const page = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async function () {
      const val = await getData();
      setStudents(val);

      const uniqueCourses = [...new Set(val.map((s) => s.course))];
      setCourses(uniqueCourses);
    })();
  }, []);

  const filterData = async (course) => {
  const res = await fetch(
    `http://localhost:3001/api/students/filter/${course}`,
  );
  const data = await res.json();
  setStudents(data.data);
};

  return (
    <>
      <select
        onChange={(e) => filterData(e.target.value)}
        className="border border-white m-5 p-1 bg-gray-800"
      >
        <option value="">All</option>

        {courses.map((elem, k) => (
          <option key={k} value={elem}>
            {elem}
          </option>
        ))}
      </select>
      {
        <table className="border border-white m-5">
          <thead>
            <tr>
              <th className="border border-white p-2">First Name</th>
              <th className="border border-white p-2">Last Name</th>
              <th className="border border-white p-2">Email</th>
              <th className="border border-white p-2">Course</th>
            </tr>
          </thead>

          <tbody>
            {students.map((elem) => {
              return (
                <tr key={elem.student_id}>
                  <td className="border border-white p-2">{elem.first_name}</td>
                  <td className="border border-white p-2">{elem.last_name}</td>
                  <td className="border border-white p-2">{elem.email}</td>
                  <td className="border border-white p-2">{elem.course}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </>
  );
};

export default page;
