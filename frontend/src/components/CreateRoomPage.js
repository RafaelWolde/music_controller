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

import Alert from "@material-ui/lab/Alert"
import { Collapse } from "@material-ui/core";

CreateRoomPage.defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => { },
    errorMsg: "",
    successMsg: ""
}

export default function CreateRoomPage(props) {
    let navigate = useNavigate()


    const [state, setState] = React.useState({
        guestCanPause: props.guestCanPause,
        votesToSkip: props.votesToSkip,
        roomCode: props.roomCode,
        errorMsg: props.errorMsg,
        successMsg: props.successMsg
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
    function handleCreateButtonPressed(e) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    votes_to_skip: state.votesToSkip,
                    guest_can_pause: state.guestCanPause
                }
            )
        };


        fetch('/api/create-room/', requestOptions)
            .then((response) => {
                if (response.status == 403) {
                }
                return response.json();
            })
            .then((data) => {
                navigate("/room/" + data.code)
            })
    }

    function handleUpdateButtonPressed(e) {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    votes_to_skip: state.votesToSkip,
                    guest_can_pause: state.guestCanPause,
                    code: state.roomCode
                }
            )
        };
        fetch('/api/update-room/', requestOptions)
            .then((response) => {
                if (response.ok) {
                    setState({ ...state, successMsg: "Room Updated Successfully!" })
                    props.updateCallback()
                } else {
                    setState({ ...state, errorMsg: "Error Updating Room..." })
                }
            })
    }

    function backButtonPressed() {
        navigate('/');
    }

    function renderCreateButton() {
        return (
            <React.Fragment>
                <Grid item xs={12} align="center">
                    <Button
                        onClick={handleCreateButtonPressed} color="primary" variant="contained"> Create Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={backButtonPressed}> Back</Button>
                </Grid>
            </React.Fragment>
        )
    }

    function renderUpdateButton() {
        return (
            <Grid item xs={12} align="center">
                <Button
                    onClick={handleUpdateButtonPressed} color="primary" variant="contained"> Update Room</Button>
            </Grid>
        )
    }

    function clearStatusMessage() {
        setState({ ...state, errorMsg: "", successMsg: "" })
    }

    const title = props.update ? "Update Room" : "Create A Room";

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <div>
                    <Collapse style={{ width: "fit-content" }} in={state.successMsg != "" || state.errorMsg != ""}>
                        {
                            state.successMsg != "" ?
                                <Alert severity="success" onClose={clearStatusMessage}>{state.successMsg}</Alert> :
                                <Alert severity="error" onClose={clearStatusMessage}>{state.errorMsg}</Alert>
                        }
                    </Collapse>
                </div>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant='h4' >
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText >
                        <label align='center'>
                            Guest Control Playback State
                        </label>
                    </FormHelperText>
                    <RadioGroup row defaultValue={props.guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
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
                            type='number'
                            defaultValue={state.votesToSkip}
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
            {props.update ? renderUpdateButton() : renderCreateButton()}
        </Grid>
    )
}