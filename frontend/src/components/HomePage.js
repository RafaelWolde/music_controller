import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Header from "./Header";
export default function HomePage(props) {
  const [state, setState] = React.useState(4);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Header />} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}
