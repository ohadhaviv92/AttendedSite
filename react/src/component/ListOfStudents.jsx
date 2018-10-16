import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import Style from '../css/Style.css';
import StudentProfile from './StudentProfile';
import Ajax from './Ajax';
import $ from 'jquery';
import bootstrap from 'react-bootstrap'
//import pic1 from '../../public/images/sharon.jpg';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

let stuID;

class ListOfStudents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsForStatus: []
    }


  }




  checkStatus = (e) => {

    let paramsObj =
      {
        LectureID: parseInt(this.props.lecture),
        StatusName: e.target.innerHTML
      }

    Ajax('AllStudentsOfStatus', paramsObj)
      .then(data => {
        data = JSON.parse(data);

        let list = [];
        
        for (let i = 0; i < data.length; i++) {

          list.push(<br />);
          list.push(<img src={'/images/' + data[i].Picture + '.png'} height="42" width="42" />)
          list.push(<span> {data[i].FirstName + "  " + data[i].LastName} </span>);

          //list.push(Example);
          list.push(<select name="status" id="status" onChange={() => {
            debugger;
            let paramsObj = {
              studentID: data[i].StudentID,
              lectureID: this.props.lecture,
              Status: $('#status').val()

            }
            Ajax('ChangeStudentStatus', paramsObj)
              .then(data => {


              })
              .catch(err => {
                alert(err)
              });

          }
          }>
           <option ></option>
            <option >איחר</option>
            <option >נכח</option>
            <option >נייטרלי</option>
            <option >נעדר</option>
          </select>);
          list.push(<br />);

        }

        this.setState({ studentsForStatus: list });



      })
      .catch(err => {
        alert(err)
      });
  }

  render() {
    let litLecture = [];
    if (this.props.list != null) {
      this.props.list.map((obj) => {
        litLecture.push(<Button bsStyle="info"  onClick={this.checkStatus} >{obj} </Button>);
        litLecture.push(<span>&nbsp;</span>);

      }
      );
    }
    return (
      <div>
        {litLecture}
        {this.state.studentsForStatus}
      </div>
    )
  }
};


export default ListOfStudents;

