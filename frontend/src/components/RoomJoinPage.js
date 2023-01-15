import React, { Component } from "react";
import { TextField, Grid, Typography, Button } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function RoomJoinPage(props) {
    let navigate = useNavigate()
    const [state, setState] = React.useState({
        roomCode: "",
        error: ""
    })
    function _roomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: state.roomCode,
            })
        }
        fetch("/api/join-room/", requestOptions)
            .then(response => {
                if (response.ok) {
                    navigate('/room/' + state.roomCode)
                } else {
                    setState({
                        ...state,
                        error: "Room Not Found."
                    })
                }
            }).catch(error => console.log(error))
    }
    function _handleTextFieldChange(e) {
        setState({
            ...state,
            roomCode: e.target.value
        })
    }
    function backButtonPressed() {
        navigate('/');
    }
    return (
        <React.Fragment>
            <Grid container spacing={1} >
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join A Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        error={!!state.error}
                        label="Code"
                        placeholder="Enter A Room Code"
                        value={state.roomCode}
                        helperText={state.error}
                        variant="outlined"
                        onChange={_handleTextFieldChange}
                    >

                    </TextField>

                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={_roomButtonPressed}>
                        Enter Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" to="/" onClick={backButtonPressed} component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}