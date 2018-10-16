import React, { Component } from 'react';
import Calendar from 'react-calendar';
import $ from 'jquery';
import NextClass from './NextClass';
import ListClassesForDate from './ListClassesForDate.jsx';
import Menu from './Menu';
import Ajax from './Ajax';
import { CalendarIcon } from "react-calendar-icon";




class CalendarLecturer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allClass: null,

      date: new Date(),
      showCalender: false,
      date2: new Date(),

    };

    this.isPast;
  }

  onDateChange = (date) => {
this.setState({date2:date});
    if (date > new Date() || date.toLocaleDateString() === new Date().toLocaleDateString()) {
      this.isPast = false;
    }
    else {
      this.isPast = true;
    }

    var date1 = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    //var date1 = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

    let paramsObj =
      {
        date: date1,
        LecturerID: localStorage.getItem('id')
      }
    Ajax('GetAllLectureForLecturerForSpecDate', paramsObj)
      .then(data => {
        let info = JSON.parse(data);
        this.setState({ allClass: info })
      })
      .catch(err => {
        alert(err)
      });
  }

  renderCalender = () => {
    if (this.state.showCalender) {
      return <Calendar
        onChange={this.onDateChange}
        value={this.state.date}
      />
    }
  }

  componentDidMount() {
    this.onDateChange(new Date());
  }

  render() {

    return (

      <div>
        <center>
          <Menu role={1} />
         <button style={{background:'none' ,border:'none'}} onClick={() => this.state.showCalender === false ? this.setState({ showCalender: true }) : this.setState({ showCalender: false })} > <CalendarIcon date={this.state.date2}/></button>
<br/><br/>
          {this.renderCalender()}



          <ListClassesForDate list={this.state.allClass} past={this.isPast} />
        </center>
      </div>

    );
  }
}

export default CalendarLecturer

