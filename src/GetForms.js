import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class GetForms extends Component {
    constructor(props) {
        super(props)
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            datas: [],
            value: '',
            singleData: []
            // rdvalue: ''
            // Forms: []

        }
    }


    componentDidMount() {
        axios.get('http://electionapp-env.tkapbzqwmf.ap-south-1.elasticbeanstalk.com/api/forms').then(response => {
            // this.state.data = response;
            const data = response.data;
            this.setState({ datas: data.reverse() });
            // console.log(response, this.state)

        }).catch(error => {
            console.log(error)
        })
    }
    deleteItem(d) {
        // axios.delete('http://eletionapp.3m3pfprvaw.ap-south-1.elasticbeanstalk.com/api/forms/' + d).then(response => {
        //     console.log(response, this.state)
        //     console.log(d)
        //     this.componentDidMount()
        // }).catch(error => {
        //     console.log(error)
        //     console.log(d)
        // })
        console.log(d)

    }

    close() {
        document.getElementById("form_cards").style.display = "inline-flex";
        document.getElementById("form_details").style.display = "none";
    }

    async formClicked(id) {
        document.getElementById("form_cards").style.display = "none";
        document.getElementById("form_details").style.display = "block";

        axios.get('http://electionapp-env.tkapbzqwmf.ap-south-1.elasticbeanstalk.com/api/forms/' + id).then(response => {
            // this.state.data = response;
            const singleForm = [];
            singleForm.push(response.data);
            this.setState({ singleData: singleForm });
            console.log(this.state);

        }).catch(error => {
            console.log(error)
        })
    }

    // handleChange(event, target) {
    //     this.setState({ rdvalue: event.target.value }, this.sendStateToParent);
    //     console.log(this.state.rdvalue, event.target.value)
    //     // setValue(event.target.value);
    // };

    render() {
        // const [value, setValue] = React.useState('');
        const rdvalue = '';
        const handleChange = (event) => {
            this.rdvalue = event.target.value;
            console.log(this.rdvalue)
            console.log(event.target)
        };
        const form = {
            padding: "10px",
            marging: "10px",
            // minWidth: "400px",
            // borderRight: "1px solid #000"
        }
        const remove = {
            color: "#ef0000",
            float: "right"
        }
        const paperForms = {
            width: "24%",
            margin: "10px",
            display: "block"
        }
        const paperForms2 = {
            width: "100%",
            padding: "25px",
            margin: "10px"
            // display: "inline-flex"
        }
        const formspan = {
            textAlign: "center",
            width: "100%",
            cursor: "pointer"
        }
        const close_form_details = {
            float: "right",
            color: "#ef0000",
        }
        const formcard = {
            display: "inline-flex",
            width: "-webkit-fill-available"
        }
        const { datas } = this.state;
        const { singleData } = this.state;
        return (
            <div>
                <Paper style={form}>
                    <AppBar position="static" color="default" elevation={0}>
                        <Toolbar>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item>
                                    <h3> Forms Available</h3>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <div id="form_cards" style={formcard}>
                        {
                            datas.length ?
                                datas.map((data, index) => <Paper style={paperForms} key={data.id}>
                                    <div>
                                        <IconButton onClick={(e) => this.deleteItem(data.id)} style={remove} >
                                            <CancelIcon />
                                        </IconButton>
                                    </div>
                                    <span onClick={(e) => this.formClicked(data.id)} style={formspan}>
                                        <h3> {data.formname}</h3>
                                        <h4> {data.formtype} </h4>
                                        <p>{data.purpose}</p>
                                    </span>

                                </Paper>) :
                                null
                        }
                    </div>
                </Paper>
                <div id="form_details">
                    {
                        singleData.length ?
                            singleData.map((data, index) => <Paper style={paperForms2} key={data.id}>
                                <IconButton onClick={(e) => this.close()} style={close_form_details} >
                                    <CancelIcon />
                                </IconButton>
                                {data.questions.length ?
                                    data.questions.map((quest, i) => <div key={i} >
                                        {quest.question}
                                        {quest.type == 'multiple' ?
                                            <RadioGroup aria-label="options" name={i.toString()} onClick={(event, quest) => handleChange(event, quest)}>
                                                {quest.options.map((opt, index) =>
                                                    <FormControlLabel key={index} value={opt} name={quest.question} control={<Radio />} label={opt} />)}
                                            </RadioGroup>
                                            :

                                            <TextField type="text" key={index} ></TextField>


                                        }
                                    </div>) : null
                                }
                            </Paper>) :
                            <p>Select A Form to view</p>
                    }
                </div>

                <Paper>

                </Paper>
            </div>
        )
    }
}

export default GetForms;