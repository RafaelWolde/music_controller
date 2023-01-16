import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
export default function Room(props) {
    let { roomCode } = useParams();

    const [state, setState] = React.useState({
        hostName: roomCode,
        votesToSkip: 2,
        guestCanPause: false,
        showSettings: false,
        spotifyAuthenticated: false,
        song: {}
    });
    const [songState, setSongState] = React.useState({})
    const [isHostState, setIsHostState] = React.useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        getRoomDetails();

        const interval = setInterval(getCurrentSong, 1000);
        return () => {
            clearInterval(interval);
        }
    },
        []);

    function getRoomDetails() {
        fetch("/api/get-room?code=" + roomCode.toString())
            .then((response) => {
                if (!response.ok) {
                    props.leaveRoomCallback();
                    navigate("/");
                }
                return response.json();
            })
            .then((data) => {
                if (data.is_host) {
                    authenticateSpotify()
                }
                setIsHostState(data.is_host)



            });
    }

    function getCurrentSong() {
        fetch('/spotify/current-song').then(response => {
            if (!response.ok) {
                return {};
            }
            else {
                return response.json();
            }
        }).then(data => {
            setSongState(data)
        })
    }

    function authenticateSpotify() {
        console.log("%cLOG", "{color: #653b98}", state.isHost)
        fetch('/spotify/is-authenticated/').then(response => response.json()).then(data => {
            setState(
                {
                    ...state,
                    spotifyAuthenticated: data.status
                }
            )

            if (!data.status) {
                fetch('/spotify/get-auth-url/').then(response => response.json()).then(urlData => {
                    setTimeout(() => {
                        window.location.replace(urlData.url)
                    }, 100)
                })
            }
        })
    }
    function leaveButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };

        fetch("/api/leave-room/", requestOptions).then((response) => {
            navigate("/");
        });
    }

    function updateShowSettings(value) {
        setState({ ...state, showSettings: value });
    }

    function renderShowSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        updateShowSettings(true);
                    }}
                >
                    Settings
                </Button>
            </Grid>
        );
    }

    function RenderSettings() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={state.votesToSkip}
                        guestCanPause={state.guestCanPause}
                        roomCode={roomCode}
                        updateCallback={getRoomDetails}>
                    </CreateRoomPage>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => { updateShowSettings(false) }}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }


    if (state.showSettings) {
        return RenderSettings();
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item align='center' xs={12}>
                <MusicPlayer  {...songState} />
            </Grid>
            {isHostState ? renderShowSettingsButton() : null}

            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveButtonPressed}
                >
                    Leave Room
                </Button>
            </Grid>

        </Grid>
    );
}
