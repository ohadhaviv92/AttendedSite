import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Menu from './Menu';
import Style from '../css/Style.css';
import asset3 from '../images/Asset3.svg';
import ReactCountdownClock from 'react-countdown-clock';
import logo from '../images/logo.svg';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/he';

var WebServiceURL = "http://localhost:51302/Project.asmx";

function formatErrorMessage(jqXHR, exception) {
    if (jqXHR.status === 0) {
        return ('Not connected.\nPlease verify your network connection.');
    } else if (jqXHR.status == 404) {
        return ('The requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        return ('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
        return ('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        return ('Time out error.');
    } else if (exception === 'abort') {
        return ('Ajax request aborted.');
    } else {
        return ('Uncaught Error.\n' + jqXHR.responseText);
    }
}


let timeInterval;
export default class HomePageStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: null,
            timer: "",
            msg: "",
            msg2: "",
            msg3: "",
            msg4: "",
            msg5: "",
            seconds: "",
            pic: ""
        };
        this.lecture;
        this.id = localStorage.getItem('id');
    }



    setTimer = (e) => {
        if (this.lecture.IsActive == true) {

            if (this.lecture.StatusName == "נייטרלי") {

                if (this.lecture.TimeStarted != null) {

                    let now = new Date().toTimeString().slice(0, 5);
                    let timer = this.lecture.TimeStarted;
                    let minutes = parseInt(timer.slice(3, 5));
                    let hours = parseInt(timer.slice(0, 2));

                    let totalMinutesOfTimer = hours * 60 + minutes;
                    let totalMinutesOfNow = parseInt(now.slice(0, 2)) * 60 + parseInt(now.slice(3, 5));

                    if (totalMinutesOfNow - totalMinutesOfTimer < parseInt(this.lecture.TimeOfTimer)) {


                        let minutes = parseInt(this.lecture.TimeOfTimer) - (totalMinutesOfNow - totalMinutesOfTimer);
                        this.setState({ seconds: minutes * 60 });
                        let seconds = 0;
                        timeInterval = setInterval(() => {
                            this.setState({ timer: (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds) });
                            seconds--;
                            if (seconds < 0) {
                                minutes--;
                                seconds = 59;
                            }
                            if (minutes == 0 && seconds <= 0) {
                                this.setState({ timer: "השעון הסתיים" });
                                $("#updateLate").show();
                                $("#updatePresent").hide();
                                clearInterval(timeInterval);

                            }
                        }, 1000);



                    }
                    else {


                        if (this.lecture.TimeStarted === "") {
                            this.setState({ timer: "השעון לא התחיל" });
                            $("#updateLate").hide();
                            $("#updatePresent").hide();
                        }
                        else {
                            this.setState({ timer: "השעון הסתיים" });
                            $("#updateLate").show();
                            $("#updatePresent").hide();
                        }



                    }

                }
                else {
                    this.setState({ timer: "" })
                }
            }
            else {
                $("#updatePresent").hide();
                $("#updateLate").hide();
            }

        }
    }


    componentDidMount() {
        $("#updateLate").hide();

        this.setState({ msg: "", pic: `/images/${localStorage.getItem('pic')}.png` });
        let paramsObj =
        {
            id: parseInt(this.id)
        }

        $.ajax({
            url: WebServiceURL + "/GetCurrentLectureByStudent",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(paramsObj),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: (data) => {
                this.lecture = JSON.parse(data.d);
                if (this.lecture != null) {
                    let output = [];

                    output.push(


                        <div className="box" style={{ textAlign: 'center' }}>
                            <div className="line"></div>
                            <div className="title">

                                <h3>{this.lecture.Course.CourseName}</h3>
                                <p>מגמה: {this.lecture.Department.DepartmentName}  <br />
                                    כיתה: {this.lecture.Class.ClassName} <br />
                                    שעה: {this.lecture.BeginHour.slice(0, -3)}-{this.lecture.EndHour.slice(0, -3)}</p>
                            </div>


                            {/* <a href="#"><img src={asset3} /></a> */}
                        </div>

                    );

                    if (this.lecture.IsActive == true && this.lecture.TimeStarted != null) {

                        if (this.lecture.TimeStarted === null) {
                            this.setState({ timer: "מצב נוכחות נגמר" });
                            $("#updatePresent").hide();


                        }
                        else {

                            this.setTimer();
                        }

                        output.push(<center><h3>סטטוס: {this.lecture.StatusName}<br /></h3></center>);

                        if (this.lecture.StatusName != 'נייטרלי') {
                            $("#updatePresent").hide();
                            $("#updateLate").hide();
                        }
                    }
                    else {
                        output.push(<center><h3 style={{ color: 'red' }}>השיעור בוטל</h3></center>);
                        $("#updatePresent").hide();
                        $("#updateLate").hide();
                    }
                    this.setState({ output });
                }
                else {
                    this.setState({ msg5: <center style={{ color: 'red' }}><h2>אין שיעורים להיום</h2></center> });
                    $("#updatePresent").hide();
                    $("#updateLate").hide();
                }


            }
        });




    }


    check = (lon1, lat1, lon2, lat2) => {


        var R = 6371; // Radius of the earth in km
        var dLat = (lat2 - lat1) * Math.PI / 180;  // Javascript functions in radians
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;

    }


    updateToPresent = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let x = this.check(this.lecture.Longitude, this.lecture.Latitude, position.coords.longitude, position.coords.latitude);
            this.setState({ msg2: " מיקום הסטודנט: " + position.coords.longitude + " , " + position.coords.latitude, msg3: "מיקום מרצה: " + this.lecture.Longitude + " , " + this.lecture.Latitude, msg4: "המרחק : " + x.toString() + " המרחק המותר :" + parseFloat(this.lecture.Distance) / 1000 })

            if (x < (parseFloat(this.lecture.Distance) / 1000)) {

                let paramsObj =
                {
                    studentID: parseInt(this.id),
                    lectureID: parseInt(this.lecture.LectureID)
                }

                $.ajax({
                    url: WebServiceURL + "/ChangeStudentStatusToPresent",
                    dataType: "json",
                    type: "POST",
                    data: JSON.stringify(paramsObj),
                    contentType: "application/json; charset=utf-8",
                    error: function (jqXHR, exception) {
                        alert(formatErrorMessage(jqXHR, exception));
                    },
                    success: (data) => {
                        this.setState({ msg: "" })
                        this.componentDidMount();
                        $("#updatePresent").hide();
                        $("#updateLate").hide();
                        clearInterval(timeInterval);
                        this.setState({ timer: "" });

                    }
                });
            }
            else {
                this.setState({ msg: "אין אפשרות לאשר הגעה מחוץ לכיתה" })

            }

        });
    }

    updateToLate = () => {

        navigator.geolocation.getCurrentPosition((position) => {

            let x = this.check(this.lecture.Longitude, this.lecture.Latitude, position.coords.longitude, position.coords.latitude);
            this.setState({ msg2: " מיקום הסטודנט: " + position.coords.longitude + " , " + position.coords.latitude, msg3: "מיקום מרצה: " + this.lecture.Longitude + " , " + this.lecture.Latitude, msg4: "המרחק : " + x + " המרחק המותר :" + parseFloat(this.lecture.Distance) / 1000 })

            if (x < parseFloat(this.lecture.Distance) / 1000) {
                let paramsObj =
                {
                    studentID: parseInt(this.id),
                    lectureID: parseInt(this.lecture.LectureID)
                }

                $.ajax({
                    url: WebServiceURL + "/ChangeStudentStatusToLate",
                    dataType: "json",
                    type: "POST",
                    data: JSON.stringify(paramsObj),
                    contentType: "application/json; charset=utf-8",
                    error: function (jqXHR, exception) {
                        alert(formatErrorMessage(jqXHR, exception));
                    },
                    success: (data) => {
                        this.componentDidMount();
                        $("#updatePresent").hide();
                        $("#updateLate").hide();
                    }
                });
            }
            else {
                this.setState({ msg: "לא ניתן לאשר נוכחות לא בתוך הכיתה" })
            }

        });
    }



    render() {
        return (
            <div>

                <header>
                    <div className="logotwo">
                        <a><img src={logo} /></a>
                    </div>
                    <br/>
                    <center>
                        <div>שלום {localStorage.getItem('name')}</div>
                    </center>
                    <div className="profile">
                        <a><img src={this.state.pic} height="42" width="42" /></a>
                    </div>
                </header>

                <Menu role={2} />

                {/* <h2 style={{ color: 'red' }} > {this.state.timer} </h2> */}


       <br/>
          {this.state.msg5}
       
                <div className="boxs">
                    {this.state.output}

                    <div className="box">
                        <div className="line"></div>
                        <div className="title" >
                            <div style={{ marginLeft: '215px', marginBottom: '90px' }}>
                                <ReactCountdownClock seconds={this.state.seconds}
                                    color="red"
                                    alpha={0.2}
                                    size={100} />
                            </div>

                        </div>


                        {/* <a href="#"><img src={asset3} /></a> */}
                    </div>


                </div>

                <center>
                    <Button bsStyle="danger" onClick={this.updateToPresent} id="updatePresent">סמן נוכח</Button>
                    <Button bsStyle="danger" onClick={this.updateToLate} id="updateLate">סמן איחור</Button>
                    <br /><p style={{ color: 'red', fontWeight: 'bold' }}>{this.state.msg}</p>
                    <br /><p style={{ color: 'green', fontWeight: 'bold' }}>{this.state.msg2}</p>
                    <br /><p style={{ color: 'green', fontWeight: 'bold' }}>{this.state.msg3}</p>
                    <br /><p style={{ color: 'green', fontWeight: 'bold' }}>{this.state.msg4}</p>
                </center>


            </div>
        );
    }
}