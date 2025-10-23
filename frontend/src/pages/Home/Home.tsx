import React, { useEffect, useState } from "react";
import "./Home.css";

import Hero from "./sections/Hero/Hero";
import Search from "./sections/Search/Search";
import Popular from "./sections/Popular/Popular";
import Teachers from "./sections/Teachers/Teachers";
import StudReviews from "./sections/StudReviews/StudReviews";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const Home: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
    );
    setSocket(newSocket);

    newSocket.on("courseCreated", (data: { message: string }) => {
      console.log("📩 New course:", data);
      toast.success(data.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      <Hero />
      <Search />
      <Popular />
      <Teachers />
      <StudReviews />
    </div>
  );
};

export default Home;
