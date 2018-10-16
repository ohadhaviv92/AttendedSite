import React from 'react';
import $ from 'jquery';
import {Button} from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Menu from './Menu';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/he';
import Style from '../css/Style.css';


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

export default class CalendarStudent extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            selectedDay: new Date(),
            output: null
        };
        this.id;
    }

    /* מציג את הקורסים לפי התאריך שהמשתמש בחר */
    handleDayChange(day) {
        this.setState({ selectedDay: day });
        this.setState({ output: [] });




        let paramsObj =
            {
                date: (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear(),
                id: parseInt(this.id)
            }


        $.ajax({
            url: WebServiceURL + "/GetLecturesByStudentAndDate",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(paramsObj),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: (data) => {
                let lectures = JSON.parse(data.d);
                
                let output = [];
             
                lectures.forEach(lecture => {


                    output.push(<h1>קורס: {lecture.Course.CourseName}<br /></h1>);
                    output.push(<h3>כיתה: {lecture.Class.ClassName}<br /></h3>);
                    output.push(<h2>מרצה: {lecture.FirstName} {lecture.LastName}<br /></h2>);
                    output.push(<h2>{lecture.BeginHour.slice(0, -3)}-{lecture.EndHour.slice(0, -3)}<br /></h2>);
                    if (lecture.IsActive == true)
                        output.push(<h2>סטטוס: {lecture.StatusName}<br /></h2>);
                    else
                        output.push(<h3 style={{ color: 'red' }}>השיעור בוטל</h3>);
                    output.push(<hr />);

                });
                this.setState({ output });
            }
        });
    }

    /* מגדיר את הדפולט של האקורדיון להראות את הקורסים של היום ושהקורס הנוכחי יפתח אוטומטית */
    componentDidMount() {
        this.id = localStorage.getItem('id');
        this.handleDayChange(this.state.selectedDay);
    }



    render() {
        const { selectedDay } = this.state;
        return (
            <div>
                <center>
                    <Menu role={2} />


                    <hr />
                    {/* {selectedDay && <p>יום: {selectedDay.toLocaleDateString()}</p>} */}
                    {!selectedDay && <p>:בחר יום</p>}
                    <DayPickerInput onDayChange={this.handleDayChange}
                        formatDate={formatDate}
                        parseDate={parseDate}
                        format="l"
                        placeholder={`${formatDate(new Date(), 'l', 'he')}`}
                        dayPickerProps={{
                            locale: 'he',
                            localeUtils: MomentLocaleUtils,
                        }}
                    />
                    <hr />
                    {this.state.output}
                </center>
            </div>
        );
    }
}