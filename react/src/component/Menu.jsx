import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import $ from 'jquery';
import Style from '../css/Style.css';





export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            date: new Date(),

        };
    }

    page = (e) => {
        debugger;
        this.props.history.push({
            pathname: '/CalendarLecturer/',

        });
    }

    render() {

        if (this.props.role == 1) {



            return (

                <nav>
                    <a href="/" className="icon"><i style={{color:'#2F4F4F'}} className="fas fa-sign-out-alt"></i></a>
                    <a href="/CalendarLecturer" className="icon"><i style={{color:'#2F4F4F'}} className="fas fa-calendar-alt"></i></a>
                    <a href="/homepage" className="icon"><i style={{color:'#2F4F4F'}} className="fas fa-home"></i></a>
                </nav>

            //     <div>
            //         <a id="home" href="/homepage" >  דף הבית  </a> |
            //     <a id="home" href="/CalendarLecturer" >יומן  </a> |
            //     <a id="contact" href="/contact">   רשימת הקורסים (BETA)  </a>|
            //     <a id="contact" href="/">   התנתק   </a>|
            // </div>

            );
        } else {
            return (

                <nav>
                    <a href="/" className="icon"><i style={{color:'#2F4F4F'}} className="fas fa-sign-out-alt"></i></a>
                    <a href="/CalendarStudent" className="icon"><i style={{color:'#2F4F4F'}} className="fas fa-calendar-alt"></i></a>
                    <a href="/HomePageStudent" className="icon"><i style={{color:'#2F4F4F'}} className="fas fa-home"></i></a>
                </nav>

                //     <div>
                //         |<a id="home" href="/HomePageStudent" >  דף הבית  </a> |
                //     <a id="home" href="/CalendarStudent" >  יומן  </a> |
                //     <a id="contact" href="/CoursesList">   רשימת הקורסים   (BETA)</a>|
                //     <a id="contact" href="/">  התנתק  </a>|
                // </div>

            );
        }
    }
}