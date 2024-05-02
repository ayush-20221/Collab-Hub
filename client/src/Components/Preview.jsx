import { v4 as uuidV4 } from "uuid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
// import ReactGA from 'react-ga';
// import { useAuth0 } from '@auth0/auth0-react'
// import { Login, Logout } from "./auth/Auth0";

export default function Preview() {
  const docId = uuidV4();

  const navigate = useNavigate();
  // const { isAuthenticated, user } = useAuth0();

  const [roomId, setRoomId] = useState("");
  const joinRoomViaRoomId = () => {
    if (roomId.includes("http") || roomId.includes("https")) {
      const url = new URL(roomId);
      const path = url.pathname;
      navigate(`${path}`);
    } else {
      navigate(`./${roomId}`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/mockBG.jpeg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "94vh",
        filter: "blur(0px)",
        "-webkit-filter": "blur(0px)",
        position: "relative",
      }}
      className="pt-14 select-none flex items-center justify-center w-full"
    >
            <div
        style={{
          filter: "blur(0.5px)",
          "-webkit-filter": "blur(0.5px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          zIndex: -1,
        }}
      ></div>

      <div className="mb-20 flex flex-col items-center">
        <div
          style={{
            color: "rgb(45,121,123)",
          }}
          className="flex w-full text-3xl sm:text-7xl font-bold codeFont justify-center"
        >
          <span>Mock Interview Rooms</span>
        </div>
        <div className="flex flex-col mt-20 justify-center  text-white">
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            onClick={() => {
              navigate(`./${docId}`);
            }}
            variant={"solid"}
            className=" hover:shadow-md duration-150 px-4 py-2 rounded-lg shadow bg-white border font-semibold"
          >
            Click here to generate a new random Room
          </Button>
          <div className="mt-10 flex">
            <input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              id="roomIdInput"
              placeholder="Enter Room ID"
              type="text"
              style={{
                border: "1px solid rgb(45,121,123)",
              }}
              className=" duration-300 rounded w-80 focus:shadow-lg shadow-md text-black outline-none focus:outline-none px-4 py-3 codeFont"
            />
            <Button
              colorScheme="teal"
              onClick={joinRoomViaRoomId}
              style={{
                padding: "1.5rem 1rem",
              }}
              className="hover:shadow-lg border border-white duration-300 hover:bg-blue-700 px-4 ml-2 py-3 rounded-lg shadow font-medium"
            >
              Join Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
