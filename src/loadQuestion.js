import React, { Component } from 'react'

// function loadData() {
//     let questList = JSON.parse(localStorage.getItem('questionList'))
//     console.log("QuestionList", questList)
// }

export default class LoadQuestion extends Component {
    // questList(e) {
    //     // let questList = JSON.parse(localStorage.getItem('questionList'))
    //     // console.log("QuestionList", questList)
    //     console.log("QuestionList", JSON.parse(localStorage.getItem('questionList'))
    // }
    // loadData();
    state = {
        questList: JSON.parse(localStorage.getItem('questionList'))
    }

    render() {
        return (
            <div>
                {this.state.questList.Questions.map((item, index) => {
                    return <p>{index + 1}) {item} <hr /> </p>

                })}
                {/* {this.state.questList.Questions} */}
            </div>
        )
    }
}