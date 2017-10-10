/**
 * Created by roman on 11.02.17.
 */
import React from 'react'

export default class Room extends React.Component {
    classes() {
        let props = this.props;
        let classes = [];

        for (let shift in this.props.classes) {
            let classesElements = [];

            for (let classNumber of this.props.classes[shift]) {
                let className = 'schedule__room-class-number';

                this.props.classes_numbers.forEach(function (item) {
                    if (item.classes_numbers_id == classNumber.id && props.day == item.day) {
                        className += ' schedule__room-class-number_busy';
                        return;
                    }
                });

                classesElements.push(
                    <span
                        key={'room' + this.props.id + '-shift' + shift + '-class-number' + classNumber.id}
                        className={className}>
                        {classNumber.number}
                    </span>
                );
            }

            classes.push(
                <div key={'room' + this.props.id + '-shift' + shift}
                     className="schedule__room-shift-row">
                    <span className="schedule__room-shift-row-title">
                        {shift}:
                    </span>
                    {classesElements}
                </div>
            );
        }

        return classes;
    }

    render() {
        return this.props.connectDragSource(
            <div
                data-container="body"
                data-toggle="popover"
                data-trigger="hover"
                data-placement="left"
                data-content="Перетащите кабинет на урок в расписании"
                className="badge schedule__room">
                № {this.props.number + ' ' + (this.props.comment ? this.props.comment : '')}
                {this.props.capacity ? ' (' + this.props.capacity + ')' : ''}
                <hr className="schedule__room-hr"/>
                {this.classes()}
            </div>
        );
    }
}

Room.propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    id: React.PropTypes.number.isRequired,
    number: React.PropTypes.string.isRequired,
    classes_numbers: React.PropTypes.arrayOf(React.PropTypes.object),
    comment: React.PropTypes.string,
    capacity: React.PropTypes.number,
    classes: React.PropTypes.object,
    day: React.PropTypes.number
};

Room.defaultProps = {
    classes_numbers: [],
    comment: '',
    capacity: null,
    classes: {},
    day: 0
};