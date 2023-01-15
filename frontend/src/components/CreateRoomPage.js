import React, { Component } from "react";
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CreateRoomPage(props) {
    let navigate = useNavigate()
    let defaultVotes = 2;
    const [state, setState] = React.useState({
        guestCanPause: true,
        votesToSkip: defaultVotes
    })

    function handleVotesChange(e) {
        setState({
            ...state,
            votesToSkip: e.target.value,
        })
    }

    function handleGuestCanPauseChange(e) {
        setState({
            ...state,
            guestCanPause: e.target.value === "true" ? true : false,
        })
    }
    function handleRoomButtonPressed(e) {
        console.log(
            {
                votes_to_skip: state.votesToSkip,
                guest_can_pause: state.guestCanPause,
            }
        )
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: state.votesToSkip,
                guest_can_pause: state.guestCanPause,
            }),
        };
        fetch('/api/create-room/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                navigate("/room/" + data.code)
            }
            )
    }

    function backButtonPressed() {
        navigate('/');
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant='h4' >
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText >
                        <label align='center'>
                            Guest Control Playback State
                        </label>
                    </FormHelperText>
                    <RadioGroup row defaultValue='true' onChange={handleGuestCanPauseChange}>
                        <FormControlLabel
                            value={'true'}
                            control={<Radio color="primary" />}
                            label="Pause/Play"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value={'false'}
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />

                    </RadioGroup>
                    <FormControl>
                        <TextField
                            onChange={handleVotesChange}
                            required={true}
                            type={defaultVotes.toString()}
                            inputProps={
                                {
                                    min: '1',
                                    style: { textAlign: 'center' }
                                }
                            }>
                        </TextField>
                        <FormHelperText>
                            <label align="center">Votes Required To Skip Song</label>
                        </FormHelperText>
                    </FormControl>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    onClick={handleRoomButtonPressed} color="primary" variant="contained"> Create Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to='/' onClick={backButtonPressed}> Back</Button>
            </Grid>

        </Grid>
    )
}