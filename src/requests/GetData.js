import React, { Component } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';


class GetData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datas: []
        }
    }

    componentDidCatch() { }
    componentDidMount() {
        axios.get('http://electionapp-env.tkapbzqwmf.ap-south-1.elasticbeanstalk.com/api/questions').then(response => {
            // this.state.data = response;
            const data = response.data;
            this.setState({ datas: data.reverse() })
            console.log(response, this.state)
            return this.state
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
        const { datas } = this.state

        return (
            <div>
                {
                    datas.length ?
                        datas.map((data, index) => <div key={data.id}> {index + 1} - {data.question}
                            <IconButton onClick={(e) => this.deleteItem(data.id)} style={remove} >
                                <CancelIcon />
                            </IconButton>
                            {/* <span  > [x] </span>  */}
                            <hr /> </div>) :
                        null
                }

            </div>
        );
    }
}

export default GetData;
