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
export default function CreateRoomPage(props) {
    const [state, setState] = React.useState(4)
    let defaultVotes = 2;

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
                        <div align='center'>
                            Guest Control Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue='true'>
                        <FormControlLabel
                            value={true}
                            control={<Radio color="primary" />}
                            label="Pause/Play"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />

                    </RadioGroup>
                    <FormControl>
                        <TextField required={true}
                            type={defaultVotes}
                            inputProps={
                                {
                                    min: 1,
                                    style: { textAlign: 'center' }

                                }
                            }>
                        </TextField>
                        <FormHelperText>
                            <div align="center">Votes Required To Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained"> Create Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to='/'> Back</Button>
            </Grid>

        </Grid>
    )
}