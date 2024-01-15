"use client";
import { useEffect, useState } from "react";
import Property from "./Property";

const UserProfile = ({ id }: { id: string }) => {
  const [user, setUser] = useState({});
  const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "users/" + id;
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUser(data);
          console.log("test");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <Property data={user}></Property>
    </main>
  );
};
export default UserProfile;
