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



class Content extends Component {
    constructor(props) {
        super(props)
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            datas: [],
            Questions: []

        }
    }
    addQueston() {
        this.setState({
            Questions: [...this.state.Questions, "  "]
        })
    }
    handleChange(e, index) {
        this.state.Questions[index] = e.target.value
        this.setState({ Questions: this.state.Questions })
        console.log(this.state)
    }

    handleSelectChange(e, index) {
        this.state.questionType[index] = e.target.value
        this.setState({ questionType: this.state.questionType })
        console.log(this.questionType);
    }

    handleRemove(index) {
        // console.log(ar.splice(index, 1));
        this.state.Questions.splice(index, 1);
        console.log(this.state.Questions);
        this.setState({ Questions: this.state.Questions })
    }

    handleSubmit(e) {
        // if (localStorage == null) {
        //     alert("NO")
        // }
        // localStorage.setItem("questionList", JSON.stringify(this.state))
        for (var i = 0; i < this.state.Questions.length; i++) {
            axios.post(`http://electionapp-env.tkapbzqwmf.ap-south-1.elasticbeanstalk.com/api/questions`,
                {
                    "question": this.state.Questions[i],
                    "type": "text",
                    "options": [],
                    "userId": ""
                })
                .then(res => {
                    console.log(res);
                    this.state.Questions.splice(0);
                    this.setState({ Questions: this.state.Questions })
                    this.componentDidMount()
                })
                .catch(error => {
                    console.log(error);
                });
            console.log(this.state, "All Questions");
            // this.setState({ Questions: this.state.Questions })
        }

    }
    componentDidMount() {
        axios.get('http://electionapp-env.tkapbzqwmf.ap-south-1.elasticbeanstalk.com/api/questions').then(response => {
            // this.state.data = response;
            const data = response.data;
            this.setState({ datas: data.reverse() })
            console.log(response, this.state)

        }).catch(error => {
            console.log(error)
        })
    }
    deleteItem(d) {
        axios.delete('http://electionapp-env.tkapbzqwmf.ap-south-1.elasticbeanstalk.com/api/questions/' + d).then(response => {
            console.log(response, this.state)
            console.log(d)
            this.componentDidMount()
        }).catch(error => {
            console.log(error)
            console.log(d)
        })
    }
    render() {
        const remove = {
            color: "#ef0000",
            // float: "right"
        }
        const mainContainer = {
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gridGap: "10px",
            margin: "5px"
        }
        const formInput = {
            ':focus': {
                outline: "none"
            },
            width: "100%",
            minHeight: "30px",
            border: "none",
            // borderBottom: "1px solid #bfbcbc",
            marginTop: "5px"
        }

        const addB = {
            fontSize: "0.7rem",
            padding: "5px 10px",
            margin: "5px 5px"
        }

        const form = {
            padding: "10px",
            marging: "10px",
            // minWidth: "400px",
            // borderRight: "1px solid #000"
        }
        const insideForm = {
            display: "flex",
            alignItems: "center"
        }

        const { datas } = this.state;
        return (
            <div style={mainContainer}>
                <Paper style={form}>
                    {/* <Button variant="contained" color="primary" >Add Question</Button> */}
                    {/* Add new question <hr /> */}
                    <AppBar position="static" color="default" elevation={0}>
                        <Toolbar>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item>
                                    <h3> Add new question</h3>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    {
                        this.state.Questions.map((Question, index) => {
                            return (
                                <div style={insideForm} key={index} >
                                    {/* <input style={formInput} onChange={(e) => this.handleChange(e, index)} value={Question} /> */}
                                    <TextField style={formInput} onChange={(e) => this.handleChange(e, index)} value={Question}
                                        // error
                                        variant="outlined"
                                    />
                                    <IconButton style={remove} onClick={() => this.handleRemove(index)}  >
                                        <CancelIcon />
                                    </IconButton>
                                </div>
                            )
                        })
                    }

                    <Button style={addB} variant="contained" color="secondary" onClick={(e) => this.addQueston(e)} >
                        Add Question
                </Button>
                    <Button style={addB} variant="contained" color="primary" onClick={(e) => this.handleSubmit(e)} >
                        Submit
                </Button>
                </Paper>
                <Paper style={form}>
                    <AppBar position="static" color="default" elevation={0}>
                        <Toolbar>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item>
                                    <h3> Edit Question bank</h3>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    {
                        datas.length ?
                            datas.map((data, index) => <div key={data.id}>
                                <IconButton onClick={(e) => this.deleteItem(data.id)} style={remove} >
                                    <CancelIcon />
                                </IconButton>
                                {index + 1} - {data.question}

                            </div>) :
                            null
                    }

                </Paper>
            </div>

        );
    }
}

// Content.propTypes = {
//     classes: PropTypes.object.isRequired,
//     onDrawerToggle: PropTypes.func.isRequired,
// };

export default Content;

