import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Header from "./Header";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Navigate } from "react-router-dom";
export default function HomePage(props) {
  const [state, setState] = React.useState({
    roomCode: null,
  });

  useEffect(() => {
    fetch("/api/user-in-room/")
      .then((response) => response.json())
      .then((data) => {
        setState({
          roomCode: data.code,
        });
      });
  }, [state.roomCode]);

  function RenderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Party Music
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              JOIN A ROOM
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              CREATE A ROOM
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
  function clearRoomCode() {
    setState({ ...state, roomCode: null })
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            state.roomCode ? (
              <Navigate replace to={`/room/${state.roomCode}`}></Navigate>
            ) : (
              <RenderHomePage />
            )
          }
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode} />} />
      </Routes>
    </BrowserRouter>
  );
}
