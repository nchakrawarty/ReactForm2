import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class CreateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forms: [],
            Questions: [],
            checkedQstnList: [],

        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    selectedQuest = [];
    handleInputChange(event, value) {
        console.log("value:" + event.target.value + " checked: " + event.target.checked);

        //find Question with that id and set checked value to it
        for (const each of this.state.Questions) {
            if (each.id == event.target.value) {
                each.checked = event.target.checked;
                // this.setState({ checkedQstnList: each })
                if (each.checked == true) {
                    this.selectedQuest.push(each);
                    // this.state.checkedQstnList.push(each)
                    this.setState({ checkedQstnList: this.selectedQuest })
                } else {
                    this.state.checkedQstnList.slice(1)
                }

                console.log(each.checked, each, this.state.checkedQstnList)
            }
            // console.log(this.state.Questions)
        }


        //update student list state
        // this.setState({ Questions: this.state.Questions });
    }
    componentDidMount() {
        axios.get('http://eletionapp.3m3pfprvaw.ap-south-1.elasticbeanstalk.com/api/questions').then(response => {
            // this.state.data = response;
            const data = response.data;
            this.setState({ Questions: data.reverse() })
            console.log(response, this.state)

        }).catch(error => {
            console.log(error)
        })

        axios.get('http://eletionapp.3m3pfprvaw.ap-south-1.elasticbeanstalk.com/api/forms').then(response => {
            // this.state.data = response;
            const data = response.data;
            this.setState({ forms: data.reverse() })
            console.log(response, this.state)

        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        const { Questions } = this.state
        const { checkedQstnList } = this.state
        const mainContainer = {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "10px",
            margin: "5px"
        }
        const form = {
            padding: "10px",
            marging: "10px",
            // minWidth: "400px",
            // borderRight: "1px solid #000"
        }
        const addformbtn = {
            margin: "15px"
        }
        const handleClick = event => {
            console.log(event.currentTarget);
            document.getElementById("create_form").style.display = "block";
        };
        const addToForm = event => {
            console.log(this.state.Questions)
        }
        const formInput = {
            ':focus': {
                outline: "none"
            },
            width: "49%",
            minHeight: "30px",
            border: "none",
            // borderBottom: "1px solid #bfbcbc",
            margin: "2px"
        }
        const formInputpurpose = {
            ':focus': {
                outline: "none"
            },
            width: "98%",
            minHeight: "30px",
            border: "none",
            // borderBottom: "1px solid #bfbcbc",
            margin: "5px"
        }
        const create_form = {
            display: "none"
        }

        // const handleClose = () => {
        //     this.setAnchorEl(null);
        // };
        const open = Boolean(this.anchorEl);
        const id = open ? 'simple-popover' : undefined;
        return (
            <div style={mainContainer}>
                <Paper style={form}>
                    <AppBar position="static" color="default" elevation={0}>
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <h3>Select Question</h3>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    {/* {Questions.question} */}
                    {
                        Questions.length ?
                            Questions.map((data, index) => <div key={data.id}>
                                <Checkbox
                                    // label={data.id + " : " + student.name}
                                    value={data.id}
                                    onClick={(event, value) => this.handleInputChange(event, value)}
                                    checked={data.checked}
                                // iconStyle={
                                //     {
                                //         fill: "#ffb400" //hex color values (yellow)
                                //     }
                                // }
                                />
                                {index + 1} - {data.question}
                                {/* <IconButton onClick={(e) => this.deleteItem(data.id)} style={remove} >
                                    <CancelIcon />
                                </IconButton> */}
                            </div>) :
                            null
                    }
                    {/* <Button color="primary" onClick={addToForm} >Add to form</Button> */}
                </Paper>
                <Paper style={form}>
                    <AppBar position="static" color="default" elevation={0}>
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Button style={addformbtn} aria-describedby={id} variant="contained" color="primary" onClick={handleClick} >Create Form</Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <div id="create_form" style={create_form} >
                        <span>
                            <TextField style={formInput} variant="outlined" placeholder="Form Name" />
                            <TextField style={formInput} variant="outlined" placeholder="Form Type" />
                            <TextField style={formInputpurpose} variant="outlined" placeholder="Form Purpose" />
                            {/* onChange={(e) => this.handleChange(e, index)} value={Question} */}
                        </span>
                        <span>
                            {/* {this.state.checkedQstnList} */}
                            {
                                checkedQstnList.length ?
                                    checkedQstnList.map((data, index) =>
                                        <div key={data.id}>
                                            <p> {index + 1} - {data.question}</p>

                                            {/* value={data.id}
                                                onClick={(event, value) => this.handleInputChange(event, value)}
                                                checked={data.checked} */}



                                        </div>) :
                                    <p>Select a question</p>
                            }
                        </span>
                        <Button style={addformbtn} variant="contained" color="primary">Create</Button>
                    </div>

                </Paper>
            </div>
        )
    }

}

export default CreateForm;