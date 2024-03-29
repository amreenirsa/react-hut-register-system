import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";











class BookingHut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hutname: this.props.match.params.name,
            index: this.props.match.params.index,
            obj: {}
            // check:true
        }
    }
    componentDidMount() {
        firebase.database().ref('booking').on('value', snap => {
            var obj = snap.val()
            this.setState({ obj: obj })
            // console.log(this.state.obj);
        })
    }
    booking() {
        var hutname = this.state.hutname;
        var index = this.state.index;
        var date = this.refs.date.value;
        var startTime = this.refs.stime.value;
        var endTime = this.refs.etime.value;
        var temp = true;
        var checkDate = false;
        console.log(startTime);

        var splitTime = startTime.split(":");
        var hours = splitTime[0]
        var minutes = splitTime[1]
        hours = Number(hours);
        minutes = Number(minutes);
        console.log(hours, minutes);

        var splitDate = date.split("-");
        var year = splitDate[0]
        var month = splitDate[1]
        var date = splitDate[2]
        year = Number(year);
        month = Number(month);
        date = Number(date);

        // console.log(date);
        var d = new Date();
        var currentMonth = d.getMonth();
        currentMonth = currentMonth + 1;
        var currentDate = d.getDate();
        var currentYear = d.getFullYear();
        var currentHours = d.getHours();
        var currentMinutes = d.getMinutes();
        console.log(currentHours);
        console.log(currentMinutes);
        if (year >= currentYear) {
            if (month >= currentMonth) {
                if (date >= currentDate) {
                    if (hours >= currentHours) {
                        if (minutes >= currentMinutes) {
                            checkDate = true;
                        }else{ alert('Please Select Right Minute'); }
                    } else { alert('Please Select Right Hours'); }
                } else { alert('Please Select Right Date'); }
            } else { alert('Please Select Right Month'); }
        } else { alert('Please Select Right Year'); }
        // console.log(checkDate);
        if (date == '' || startTime == '' || endTime == '') {
            alert('Please Fill All Requirement');
        }
        else {
            if (checkDate == true) {
                // console.log(areaName,index,date,startTime,endTime);
                if (this.state.obj != null) {
                    // console.log(this.state.obj);
                    for (let key in this.state.obj) {
                        // console.log(key);
                        // console.log("in loop");
                        if (this.state.obj[key].hutname == hutname) {
                            //    console.log(obj[key].areaName,"false");
                            if (this.state.obj[key].slot == index) {
                                // console.log(obj[key].slot,"false1");
                                if (this.state.obj[key].date == date) {
                                    // console.log(obj[key].date,"false2");
                                    // if((startTime>=obj[key].startTime)&&(startTime<=obj[key].endTime)||(endTime>=obj[key].startTime)&&(endTime<=obj[key].endTime)
                                    // // ||((startTime>=obj[key].startTime)&&(startTime<=obj[key].endTime)&&(endTime>=obj[key].startTime)&&(endTime<=obj[key].endTime))
                                    // ){                            
                                    //                                         console.log(obj[key].startTime,obj[key].endTime);
                                    //                                         // alert("This slot is booked at this time");
                                    //                                             temp=false;
                                    //                                             break;

                                    // }
                                    if ((startTime < this.state.obj[key].startTime) && (endTime < this.state.obj[key].startTime) || (startTime > this.state.obj[key].endTime) && (endTime > this.state.obj[key].endTime)) {
                                        temp = true;
                                    } else { temp = false }
                                }
                            }
                        }
                    }
                }
                // }
                // else{

                // console.log(temp);
                if (temp == true) {
                    var userid = firebase.auth().currentUser.uid;
                    var bookingSlot = {
                        hutname: hutname,
                     //   slot: index,
                        date: date,
                        startTime: startTime,
                        endTime: endTime,
                        uid: userid
                    }
                    var booking1 = firebase.database().ref();
                    const booking2 = booking1.child("booking").push(bookingSlot)
                    alert("Slot booked Sucessfully");
                    this.props.history.push('/allregisteredhut');
                }
                else {
                    alert("This hut is booked at this time");
                }
                // }
            }
        }
    }
    render() {
        return (
            <div className="bg">
            <div className="hutwraper">
               
                   
                            <h1>Booking Parking</h1>
                            
                                <span>Select Date</span><br />
                                <input type="date" ref="date" /><br />
                                <span>Select start time</span><br />
                                <input type="time" ref="stime" /><br />
                                <span>Select end time</span><br />
                                <input type="time" ref="etime" /><br />
                                <button onClick={this.booking.bind(this)}>Sumbit</button>
                            
                            
                                </div>
            </div>
        )
    }
}
export default BookingHut;