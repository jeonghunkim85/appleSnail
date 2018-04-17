import React, { Component } from 'react';
import { DateUtils } from '../utils/DateUtils';
import classNames from 'classnames/bind';
import styles from './Calendar.scss';
const st = classNames.bind(styles);


class Calendar extends Component {

  constructor(props){
    super(props);

    this.today = props.today;
    const firstDate = DateUtils.getFirstDateOfCalendar(this.today);
    const lastDate = DateUtils.getLastDateOfCalendar(this.today);
    const counts = DateUtils.countDaysBetween(firstDate, lastDate)+1;
    this.datesArray = DateUtils.getCalendarArray(firstDate, counts);
  }

  render(){
    return (
      <div className={st('calendar')}>
        <h2>{this.today.getFullYear()}년 {this.today.getMonth()+1}월</h2>
        <ul className={st("calendar-week")}>
          <li>
            <ul className={st("calendar-header")}>
              <li className={st("cal-col")}>SUN</li>
              <li className={st("cal-col")}>MON</li>
              <li className={st("cal-col")}>TUE</li>
              <li className={st("cal-col")}>WED</li>
              <li className={st("cal-col")}>THU</li>
              <li className={st("cal-col")}>FRI</li>
              <li className={st("cal-col")}>SAT</li>
            </ul>
          </li>
          {this.datesArray.map(week => 
          <li>
            <ul>
              {week.map(date => 
                <li className={st("cal-col", "cal-day")} >
                  <div className={st("dateLabel")}>
                    {date.getDate()}
                  </div>
                  <div>

                  </div>
                </li>
              )}
            </ul>
          </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Calendar;