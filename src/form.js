import React from "react";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';

import GetData from './requests/GetData'

import axios from 'axios';

export default class Form extends React.Component {
    state = {
        Questions: [],
        // questionType: []
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
          for(var i=0; i< this.state.Questions.length; i++) {
            axios.post(`http://eletionapp.3m3pfprvaw.ap-south-1.elasticbeanstalk.com/api/questions`, 
            {
                "question": this.state.Questions[i],
                "type": "text",
                "options": [],
                "userId": ""
              })
            .then(res => {
              console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
            // console.log(this.state, "All Questions");
            this.setState({ Questions: this.state.Questions })
          }

    }

    handleClear(e) {
        this.state.Questions.splice(0);
    }
    componentDidMount() {
        // fetch("http://eletionapp.3m3pfprvaw.ap-south-1.elasticbeanstalk.com/api/forms")
        //     .then(res => res.json(console.log(res)))
        //     .then(
        //         (result) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 items: result.items
        //             });
        //             console.log(this.items)
        //         },
        //         // Note: it's important to handle errors here
        //         // instead of a catch() block so that we don't swallow
        //         // exceptions from actual bugs in components.
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     )
        // this.http.fetch(`http://eletionapp.3m3pfprvaw.ap-south-1.elasticbeanstalk.com/api/forms`).subscribe((res) => {
        //     console.log(res)
        //     this.forms = res;
        //     console.log(res)
        // })
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
                                {/* <select onChange={(e) => this.handleSelectChange(e, index)} name="questionType">
                                    <option value="text">Text</option>
                                    <option value="options">Options</option>
                                </select> */}
                                {/* { this.state.questionType[index] === "options" &&
                                    <div>
                                        {this.options.map((value, i) => {
                                            <input name="qtype" type="radio" value= {value}/><input type="text" value={}></input> <br></br>
                                        })}
                                    </div>
                                } */}
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

    // change = e => {
    //     // this.props.onChange({ [e.target.name]: e.target.value });
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    //     console.log(e.target.value)
    // };

    // onSubmit = e => {
    //     e.preventDefault();
    //     // this.props.onSubmit(this.state);
    //     this.setState({
    //         firstName: "",
    //         lastName: "",
    //         username: "",
    //         // email: "",
    //         // password: ""
    //     });
    //     // this.props.onChange({
    //     //     firstName: "",
    //     //     lastName: "",
    //     //     username: "",
    //     //     email: "",
    //     //     password: ""
    //     // });
    //     console.log(e.target.value)
    // };

    // render() {
    //     return (
    //         <form>
    //             <input
    //                 name="firstName"
    //                 placeholder="First name"
    //                 value={this.state.firstName}
    //                 onChange={e => this.change(e)}
    //             />
    //             <br />
    //             <input
    //                 name="lastName"
    //                 placeholder="Last name"
    //                 value={this.state.lastName}
    //                 onChange={e => this.change(e)}
    //             />
    //             <br />
    //             <input
    //                 name="username"
    //                 placeholder="Username"
    //                 value={this.state.username}
    //                 onChange={e => this.change(e)}
    //             />
    //             <br />
    //             <br />
    //             <Button onClick={e => this.onSubmit(e)}>Submit</Button>
    //         </form>
    //     );
    // }
}
Form.propTypes = {
    classes: PropTypes.object.isRequired,
};