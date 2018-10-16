import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import $ from 'jquery';
import Style from '../css/Style.css';
import Ajax from './Ajax';
import ListOfStudents from './ListOfStudents';
import {Button} from 'react-bootstrap'



export class ListClassesForDate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    };

    componentDidMount() {

    }




    render() {


        let listLecture;



        if (this.props.list != null) {

            if (this.props.past == false) {
                listLecture = this.props.list.map((obj, index) =>

                    <div>
                        <a4>מיקום: {obj.Class.ClassName}</a4> <br />
                        <a4>שם הקורס: {obj.Course.CourseName}</a4> <br />
                        <a4>שעה: {obj.BeginHour}-{obj.EndHour} </a4>
<br/>

                       {console.log(obj)
                       }
                        <Button bsStyle="primary"  id={`${obj.LectureID}1`} onClick={() => {

                            let paramsObj =
                                {

                                    LectureID: parseInt(obj.LectureID)
                                }

                            Ajax('DeleteLecture', paramsObj)
                                .then(data => {
                                    $(`#${obj.LectureID}1`).hide();
                                    $(`#${obj.LectureID}2`).show();
                                })
                                .catch(err => {
                                    alert(err)
                                });
                        }} >ביטול השיעור </Button>   &nbsp;&nbsp;
                        <Button  bsStyle="primary" id={`${obj.LectureID}2`} onClick={() => {


                            let paramsObj =
                                {

                                    LectureID: parseInt(obj.LectureID)
                                }

                            Ajax('ChangeDeleteLecture', paramsObj)
                                .then(data => {
                                    $(`#${obj.LectureID}1`).show();
                                    $(`#${obj.LectureID}2`).hide();
                                })
                                .catch(err => {
                                    alert(err)
                                });
                        }}>הפוך שיעור לפעיל</Button>
                        <br/><br/>
                        <ListOfStudents list={["נייטרלי", "נכח", "נעדר", "איחר", "מוצדק"]} lecture={obj.LectureID} />
                        <hr />

                    </div >



                );
            }
            else {
                listLecture = this.props.list.map((obj, index) =>

                    <div>
                        <a4>מיקום: {obj.Class.ClassName}</a4> <br />
                        <a4>שם הקורס: {obj.Course.CourseName}</a4> <br />
                        <a4>שעה: {obj.BeginHour}-{obj.EndHour} </a4>
                        <br/>
                        <ListOfStudents list={["נייטרלי", "נכח", "נעדר", "איחר", "מוצדק"]} lecture={obj.LectureID} />

                        <hr />

                    </div >



                );
            }

        }


        return (
            <div>
                <center>
                    {listLecture}
                </center>
            </div>
        )
    }
};

export default ListClassesForDate;




