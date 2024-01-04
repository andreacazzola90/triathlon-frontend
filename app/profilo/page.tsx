"use client";

import { useEffect } from "react";
import { useUser } from "@/app/context/userContext";

import { useSearchParams } from "next/navigation";
import Property from "../components/Property";

export default function Profilo() {
  const { user, updateUser } = useUser();

  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");

  useEffect(() => {
    if (userId) {
      const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "users/" + userId;
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          updateUser({ ...user, ...data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  return (
    <main className="flex flex-col items-center">
      <h1>Profilo {userId}</h1>
      <h1>{user && <Property data={user} />}</h1>
    </main>
  );
}
