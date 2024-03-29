import React, { Component } from "react";
import { Grid, Card, IconButton, LinearProgress, Typography, Button } from "@material-ui/core";
import { PlayArrow, SkipNext, Pause } from "@material-ui/icons";

export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    pauseSong() {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" }
        }
        fetch("/spotify/pause/", requestOptions);
        alert("PAUSE")
    }
    playSong() {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" }
        }
        fetch("/spotify/play/", requestOptions);
        alert("PLAY")
    }



    skipSong() {
        try {
            let cookieList = document.cookie.split(';')

            let cookieDict = {}
            cookieList.forEach(cookie => {
                let splitCookie = cookie.split('=')
                cookieDict[`${splitCookie[0]}`] = splitCookie[1]
            });

            console.log(cookieDict.csrftoken)
            const requestOptions = {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: {
                    csrfmiddlewaretoken: cookieDict['csrftoken']
                }
            }

            fetch('/spotify/skip/', requestOptions);
        } catch (error) {
            console.log("%cMUSIC CONTROLLER ERROR LOG:", 'color: green', error)
        }



    }
    render() {
        const songProgress = this.props.time / this.props.duration

        return (
            <Card style={{ maxWidth: '450px' }}>
                <Grid container alignItems="center">
                    <Grid item align="center" xs={4}>
                        <img src={this.props.image_url} height="100%" width="100%"></img>
                    </Grid>
                    <Grid item align="center" xs={8}>
                        <Typography component="h5" variant="h5">
                            {this.props.title}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle1">

                            {this.props.artist}
                        </Typography>
                        <div>
                            <IconButton onClick={this.props.is_playing ? this.pauseSong : this.playSong}>
                                {this.props.is_playing ? <Pause /> : <PlayArrow />}
                            </IconButton>
                            {this.props.votes}/{this.props.votes_needed}
                            <IconButton onClick={this.skipSong}>
                                <SkipNext />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <LinearProgress variant="determinate" value={songProgress * 100}></LinearProgress>
            </Card>
        )
    }
}
