// Implement the delete class button
// Fix class.model to remove based on date and title
// In class.service will call classModel.deleteClass(title, date)

import React, { Component } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { DateInput } from 'semantic-ui-calendar-react';

class ClassCalendar extends Component {

  state = {
    classes: [],
    title: '',
    description: '',
    proficiency: '',
    date: '',
    viewDate: new Date(),
    showClassInput: false,
    inputDate: ''
  }

  classTitleOptions = [
    'Basic Photography: Taking Better Pictures',
    'Intermediate Photography: Beyond Basics',
    'Advanced Photography: Don\'t "take" photos, "make" photos'
  ];

  classProficiencyOptions = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  classDescriptionOptions =
  [
    'In this class you will learn camera basics as we explain how to use your camera correctly and take better pictures. It\'s easy, fun and the best way to start learning. Understanding photography\'s basics is essential to making great images. Start with basic photographic principles and camera controls and expand to composition, color theory and issues of visual perception.',

    'You will dive deeper into photography building your skills, personal style and your own photography portfolio. Brush up on technical issues and camera use. Improve lighting, composition, approach to subject matter.',

    'Explore our advanced level class you will learn how to control every detail of your photographs while shooting and editing. Learn to use your camera to better tell your intended story through exploring more complex camera techniques and thinking processes.'
  ];

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  onCalendarChange = async date => {
    const dateString = formatDateString(date)

    let res = await axios.get(`/api/class?date=${dateString}`)
    this.setState({
      classes: res.data
    })
  }

  createClass = async e => {
    e.preventDefault();

    const { title, description, proficiency, date } = this.state;

    if (title && description && proficiency && date) {
      const course = {
        title,
        description,
        proficiency,
        date
      }

      let res = await axios.post(`/api/class`, course)
      this.setState({
        classes: [...this.state.classes, res.data]
      })
      // console.log(this.state.classes);
      this.showClassInput(false);
    } else {
      this.showClassInput(false);
      return false;
    }
  }

  deleteClass = async course => {
    const { _id } = course;
    // console.log(_id);
    await axios.delete('/api/class', { data : {_id}})
    this.setState({
      classes: this.state.classes.filter(course => course._id !== _id)
    })
  }

  onClassInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showClassInput = bool => {
    this.setState({
      showClassInput: bool
    })
  }

  render() {
    return (
      <div>

        <div className='ui padded vertical center aligned segment'>
          <h1 style={{fontSize: '40px'}} className='ui header'>
            Class Calendar
            <div className='ui sub header'>
              Click on any date to view the classes on that day!
            </div>
          </h1>
        </div>

        <div className='ui container grid'>
          <aside className='five wide column'>
            <img className='ui image' alt='boka of camera' src='http://blog.dcccd.edu/wp-content/uploads/2017/11/photography-classes-in-dallas-780x390.jpg'/>
          </aside>
          <aside className='five wide column'>
            <img className='ui image' alt='camera options' src='https://www.adobe.com/content/dam/acom/en/products/creativecloud/training/the-photography-starter-kit-for-beginners_800.jpg'/>
          </aside>
          <aside className='five wide column'>
            <img className='ui image' alt='videography against sunset' src='https://talk.dallasmakerspace.org/uploads/default/original/4/c/4cd6d7f05c8afc0c5b530b80560688353ac736e8.jpg'/>
          </aside>
        </div>

        <div className="ui grid segment container">
          <div className="sixteen wide column">
            {this.state.showClassInput ? (
              <div>
                <div style={{paddingBottom: '10px'}} className="ui form">
                  <div
                    onClick={this.createClass}
                    className="ui large teal button">
                    Submit
                  </div>
                  <div
                    onClick={this.showClassInput.bind(this, false)}
                    className="ui large red button">
                    Cancel
                  </div>
                  <div className="ui stacked segment">

                    <div className='three fields'>

                      <div className="ten wide field">

                        <select name="title" onChange={this.onClassInputChange}>
                          <option hidden>Class Title</option>
                          {this.classTitleOptions.map((option, i) =>  <option key={i}>{option}</option>)}
                        </select>

                      </div>

                      <div className="three wide field">

                        <select name="proficiency" onChange={this.onClassInputChange}>
                          <option hidden>Class Proficiency</option>
                          {this.classProficiencyOptions.map((option, i) => <option key={i}>{option}</option>)}
                        </select>

                      </div>

                      <div className="three wide field">
                        <DateInput
                          name='date'
                          placeholder='Date'
                          value={this.state.date}
                          iconPosition='left'
                          onChange={this.handleChange}
                          autoComplete='off'
                        />
                      </div>

                    </div>

                      <select name="description" onChange={this.onClassInputChange}>
                          <option hidden>Class Description</option>
                          {this.classDescriptionOptions.map((option, i) =>  <option key={i}>{option}</option>)}
                      </select>

                  </div>
                </div>
              </div>
            ) : (
              <div style={{ paddingBottom: '10px' }}>
                <div
                  onClick={this.showClassInput.bind(this, true)}
                  className="ui large teal button">
                  Create Class
                </div>
              </div>
            )}

            <Calendar
              onChange={this.onCalendarChange}
              value={this.state.viewDate}
            />

            {
              this.state.classes.map(course => {
                return (
                  <div className='ui segment container' key={course._id}>
                    <h1 className='ui header'>{course.title}</h1>
                    <h3>{course.proficiency}</h3>
                    <div className='ui message'><p>{course.description}</p></div>
                    <div className='ui stackable two buttons'>
                      <div className='ui large primary button'>Register for Class</div>
                      <div onClick={this.deleteClass.bind(null, course)} className='ui large red button'>Delete Class</div>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    )
  }
}

const formatDateString = (date) => {
  if (date.getMonth() < 10) {
    return `${date.getDate()}-0${date.getMonth()+1}-${date.getFullYear()}`
  } else {
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }
}

export default ClassCalendar;
