import React from "react";
import CreateRoomPage from "./CreateRoomPage";
import Header from "./Header";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";


export default function App(props) {

    const [user, setUser] = React.useState({ user: "Rafael" })
    return (
        <React.Fragment>
            <HomePage />
        </React.Fragment>
    );
};

