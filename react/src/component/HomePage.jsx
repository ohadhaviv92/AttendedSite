import React from 'react';

import $ from 'jquery';


import Menu from './Menu';

import ListOfStudents from './ListOfStudents';
import Ajax from './Ajax';

import { Button } from 'react-bootstrap';

import ReactCountdownClock from 'react-countdown-clock';
import logo from '../images/logo.svg';


let timeInterval;

let lectureID;
let lecture

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      date: new Date(),
      nextClass: null,
      myClass: null,
      output: null,
      listStu: [],
      timer: "",
      msg: "",
      TimeOfTimer: 2,
      Distance: 2,
      pic: "",
      seconds: "",
      showList: false,
      msg2: ""


    };

    this.long;
    this.lat;
  }

  listOfStudent = (e) => {

    if (this.state.showList) {
      this.setState({ listStu: [], lecture1: lecture.LectureID, showList: false });
    }
    else {
      let status = ["נייטרלי", "נכח", "נעדר", "איחר"];
      this.setState({ listStu: status, lecture1: lecture.LectureID, showList: true });
    }


  }

  setTimer = (e) => {

    if (lecture.IsActive === true) {

      if (lecture.TimeStarted !== "") {

        //$(`#${lecture.LectureID}`).hide();
        let now = new Date().toTimeString().slice(0, 5);
        let timer = lecture.TimeStarted;
        let minutes = parseInt(timer.slice(3, 5));
        let hours = parseInt(timer.slice(0, 2));

        let totalMinutesOfTimer = hours * 60 + minutes;
        let totalMinutesOfNow = parseInt(now.slice(0, 2)) * 60 + parseInt(now.slice(3, 5));



        if (totalMinutesOfNow - totalMinutesOfTimer < parseInt(this.state.TimeOfTimer)) {


          let minutes = parseInt(this.state.TimeOfTimer) - (totalMinutesOfNow - totalMinutesOfTimer);
          this.setState({ seconds: minutes * 60 });
          let seconds = 0;
          timeInterval = setInterval(() => {
            this.setState({ timer: (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds) });
            seconds--;
            if (seconds < 0) {
              minutes--;
              seconds = 59;
            }
            if (minutes === 0 && seconds <= 0) {

              this.setState({ timer: "מצב נוכחות הסתיים" });

              clearInterval(timeInterval);

            }
          }, 1000);



        }
        else {

          this.setState({ timer: "מצב נוכחות לא פעיל" });
        }
      }
    }
  }


  startTimer = () => {
    //$(`#${lecture.LectureID}`).hide();
    //$("#timeOfTimer").hide();
    //$("#Distance").hide();
    navigator.geolocation.getCurrentPosition((position) => {




      let now = new Date();
      let time = (now.getHours() > 9 ? now.getHours() + ":" : "0" + now.getHours() + ":") + (now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes());
      let paramsObj =
        {
          TimeStarted: time,
          LectureID: lectureID,
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
          Distance: this.state.Distance.toString(),
          TimeOfTimer: this.state.TimeOfTimer.toString()

        }


      Ajax('StartTimer', paramsObj)
        .then(data => {

          lecture.TimeStarted = time;

          this.setTimer();
        })
        .catch(err => {

        });


    });

  }

  componentDidMount() {

    this.setState({ msg: "שלום " + localStorage.getItem('name'), pic: `/images/${localStorage.getItem('pic')}.png` });



    let outputs = [];

    var time1 = this.state.date.getHours() + ":" + this.state.date.getMinutes();
    var date1 = this.state.date.getDate() + "/" + (this.state.date.getMonth() + 1) + "/" + this.state.date.getFullYear();

    //var date1 = (this.state.date.getMonth() + 1) + "/" + this.state.date.getDate() + "/" + this.state.date.getFullYear();

    var paramsObj =
      {
        date: date1,
        LecturerID: localStorage.getItem('id'),
        time: time1
      }


    Ajax('GetNextLectureForLecturer', paramsObj)
      .then(data => {
        lecture = JSON.parse(data);
        if (lecture != null && lecture.TimeOfTimer != null)
          this.setState({ TimeOfTimer: lecture.TimeOfTimer });
        if (lecture !== null) {




          lectureID = lecture.LectureID;


          outputs.push(
            <div className="box" style={{ textAlign: 'center' }}>
              <div className="line"></div>
              <div className="title">

                <h3>{lecture.Course.CourseName}</h3>
                <p>מגמה: {lecture.Department.DepartmentName}  <br />
                  כיתה: {lecture.Class.ClassName} <br />
                  שעה: {lecture.BeginHour.slice(0, -3)}-{lecture.EndHour.slice(0, -3)}</p>
              </div>



            </div>
          );


          outputs.push(<center><select id="Distance" onChange={() => {

            this.setState({ Distance: $('#Distance').val() })
          }}>
            <option>גודל כיתה במטרים</option>
            <option>1</option>
            <option>2</option>
            <option>4</option>
            <option>10</option>
            <option>30</option>
          </select></center>)

          if (lecture.IsActive === true) {


            outputs.push(<span>&nbsp;</span>);
            outputs.push(<center><select id="timeOfTimer" onChange={(e) => {

              this.setState({ TimeOfTimer: $('#timeOfTimer').val() })
            }}>
              <option>בחר זמן לטיימר</option>
              <option>2</option>
              <option>4</option>
              <option>8</option>
              <option>16</option>
              <option>32</option>
            </select></center>);

            if (new Date().toTimeString().slice(0, 2) >= lecture.BeginHour.slice(0, 2))
              outputs.push(<center><br /><Button bsStyle="danger" onClick={this.startTimer} id={lecture.LectureID} class="attend" >הפעל מצב נוכחות </Button></center>);

          }
          else {
          //$(`#${lecture.LectureID}`).hide();
                $("#timeOfTimer").hide();
                $("#Distance").hide();
            outputs.push(<center><div style={{ color: 'red' }}>השיעור בוטל</div></center>)
          }
          outputs.push(<center><br /><Button bsStyle="success" onClick={this.listOfStudent} id={lecture.LectureID}  >רשימת הסטודנטים</Button></center>);


          this.setState({ output: outputs })

        }
        else {
          this.setState({ msg2: "אין שיעורים להיום" })

        }
        this.setTimer();
      })
      .catch(err => {

      });

  }






  render() {
    return (

      <div>

        <header>
          <div className="logotwo">
            <a><img src={logo} /></a>
          </div>
          <br />
          <center>שלום {localStorage.getItem('name')}</center>

          <div className="profile">
            <a><img src={this.state.pic} height="42" width="42" /></a>
          </div>
        </header>

        <Menu role={1} list={this.state.listStu} />
        <br />


        <div className="boxs">
          <div style={{ marginLeft: '80px' }}>
            <center>
              <ReactCountdownClock seconds={this.state.seconds}
                color="red"
                alpha={0.2}
                size={100} />
               {this.state.msg1}
              
            </center>
            <br />
          </div>
          <br/>
        <center>
          <h2 style={{ color: 'red' }}>{this.state.msg2}</h2>
        </center>
          {this.state.output}
        </div>
        <br />
        <center>
        
          {this.state.showList ? <ListOfStudents list={this.state.listStu} lecture={this.state.lecture1} /> : <div></div>}
          <br /> <br />
        </center>

      </div>
    );
  }
}

export default HomePage
