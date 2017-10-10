/**
 * Created by roman on 04.02.17.
 */
import React from 'react';
import {DragSource} from 'react-dnd';
import {DRAG_TYPE_TEACHER} from '../../../drag-and-drop/draggable-types';
import {spec,collect} from '../../../drag-and-drop/drag/teacher';

class Teacher extends React.Component {
    constructor(props) {
        super(props);

        let hours_done = 0;
        let hours_planned = 0;
        let load = 0;

        if (this.props.schedule.hasOwnProperty('subjects')) {
            hours_done = this.props.schedule.subjects.hasOwnProperty(this.props.subjects_id)
                ? this.props.schedule.subjects[this.props.subjects_id].hours
                : 0
        }

        if (this.props.curriculum.hasOwnProperty('subjects')) {
            hours_planned = this.props.curriculum.subjects.hasOwnProperty(this.props.subjects_id)
                ? this.props.curriculum.subjects[this.props.subjects_id].hours
                : 0;
        }

        if (hours_done == 0) load = 0;
        else if (hours_planned == 0 || hours_done > hours_planned) load = 100;
        else load = hours_done / hours_planned * 100;

        this.state = {
            hours_done: hours_done,
            hours_planned: hours_planned,
            load: load
        }
    }

    render() {
        return this.props.connectDragSource(
            <div className="progress progress-striped schedule__subject-teacher_progress-bar">
                <div className="teacher-name schedule__subject-teacher-name">
                    {this.props.name + ' (' + this.state.hours_done + '/' + this.state.hours_planned + ')'}
                </div>
                <div style={{width: this.state.load + '%'}}
                     aria-valuemax="100"
                     aria-valuemin="0"
                     aria-valuenow={this.state.load}
                     role="progressbar" className="progress-bar progress-bar_color_gray">
                </div>
            </div>
        );
    }
}

Teacher.propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    subjects_id: React.PropTypes.number.isRequired,
    subjects_title: React.PropTypes.string.isRequired,
    subjects_level: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    schedule: React.PropTypes.object,
    curriculum: React.PropTypes.object,
};

Teacher.defaultProps = {
    schedule: {},
    curriculum: {}
};

export default DragSource(DRAG_TYPE_TEACHER, spec, collect)(Teacher);