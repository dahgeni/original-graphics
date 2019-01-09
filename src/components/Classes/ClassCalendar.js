import React, { Component } from 'react';
import Calendar from 'react-calendar';

class ClassCalendar extends Component {

    state = {
        date: new Date()
    }

    onChange = (date) => {
        this.setState({
            date
        });
    }

    render() {
        return (
            <div className='ui center aligned container segment'>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
            </div>
        );
    }
}

export default ClassCalendar;
