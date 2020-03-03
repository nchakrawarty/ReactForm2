import React, { Component } from 'react';
import axios from 'axios';


class GetData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datas: []
        }
    }


    componentDidMount() {
        axios.get('http://eletionapp.3m3pfprvaw.ap-south-1.elasticbeanstalk.com/api/questions').then(response => {
            // this.state.data = response;
            const data = response.data;
            this.setState({ datas: data.reverse() })
            console.log(response, this.state)

        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        const { datas } = this.state
        return (
            <div>
                {
                    datas.length ?
                        datas.map((data,index) => <div key={data.id}> {index+1} - {data.question} </div>) :
                        null
                }

            </div>
        );
    }
}

export default GetData;
