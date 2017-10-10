/**
 * Created by roman on 08.02.17.
 */
import React from 'react'
import DaySelectorItem from '../../../containers/groups-view/day-selector/day-selector-item';
import days from '../../../data/days';

export default class DaySelector extends React.Component {
    items() {
        let daysElements = [];

        for (let index = 0; index < this.props.week_length; index++) {
            daysElements.push(
                <DaySelectorItem
                    key={'day-selector-item-' + index}
                    index={index}
                    label={days[index]}
                    active={this.props.active == index}/>
            );
        }

        return daysElements;
    }

    render() {
        return (
            <div className="schedule__day-selector">{this.items()}</div>
        );
    }
}

DaySelector.propTypes = {
    active: React.PropTypes.number,
    week_length: React.PropTypes.number
};

DaySelector.defaultProps = {
    active: 0,
    week_length: 6
};