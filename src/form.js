import React from "react";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import axios from 'axios';
import GetData from './Requests/GetData'

export default class Form extends React.Component {
    state = {
        Questions: [],
    }

    singleQuestion = {
        question: "",
        type: "",
        options: [],
        userId: ""
    }

    options = ["Option 1", "Option 2"];



    addQueston() {
        this.setState({
            Questions: [...this.state.Questions, "  "]
        })
    }

    handleChange(e, index) {
        this.state.Questions[index] = e.target.value

        this.setState({ Questions: this.state.Questions })
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

    handleClear(e) {
        this.state.Questions.splice(0);
    }
    componentDidMount(state, props) {
        console.log(props, state)
    }



    render() {
        const remove = {
            color: "#ef0000",
        }
        const form = {
            padding: "10px",
            marging: "10px",
            minWidth: "400px"
        }
        const insideForm = {
            display: "flex",
            alignItems: "center"
        }

        const formInput = {
            width: "100%"
        }

        const addB = {
            fontSize: "0.6rem",
            padding: "5px 10px",
            margin: "0 5px"
        }

        return (
            <div style={form}>
                Enter Question.
                {
                    this.state.Questions.map((Question, index) => {
                        return (
                            <div style={insideForm} key={index} >
                                <input style={formInput} onChange={(e) => this.handleChange(e, index)} value={Question} />

                                <IconButton onClick={() => this.handleRemove(index)} style={remove} >
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        )
                    })
                }
                <hr></hr>
                <Button style={addB} variant="contained" color="secondary" onClick={(e) => this.addQueston(e)} >
                    Add
                </Button>
                <Button style={addB} variant="contained" color="primary" onClick={(e) => this.handleSubmit(e)} >
                    Submit
                </Button>
                {/* <Button onClick={(e) => this.handleClear(e)} >Clear</Button> */}
            </div >
        )
    }


}
Form.propTypes = {
    classes: PropTypes.object.isRequired,
};