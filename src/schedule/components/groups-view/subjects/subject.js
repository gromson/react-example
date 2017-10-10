/**
 * Created by roman on 01.02.17.
 */
import React from 'react'
import Teacher from './teacher';

export default class Subject extends React.Component {
    teachers() {
        return this.props.teachers.map((item) => {
            return (
                <Teacher
                    key={'teacher-' + item.id + '-subjects_id-' + this.props.id}
                    subjects_id={this.props.id}
                    subjects_title={this.props.title}
                    subjects_level={this.props.level}
                    id={item.id}
                    name={item.name}
                    schedule={Array.isArray(item.schedule) ? {} : item.schedule}
                    curriculum={Array.isArray(item.curriculum) ? {} : item.curriculum}
                />
            );
        });
    }

    render() {
        return (
            <div className="panel panel-default schedule__subject">
                <div
                    className={'panel-heading row no-margins schedule__subject-header schedule__subject-header_level_' + this.props.level}
                    data-toggle="collapse"
                    data-parent="#subjects-accordion" href={'#collapse-subject-' + this.props.id}>
                    <h5 className="panel-title pull-left schedule__subject-header-title">
                        {this.props.title}
                    </h5>
                    <div className="ibox-tools pull-right">
                        <a href="javascript:;"><i className="fa fa-chevron-down"></i></a>
                    </div>
                </div>
                <div id={'collapse-subject-' + this.props.id} className="panel-collapse collapse">
                    <div className="panel-body schedule__subject-teachers">{this.teachers()}</div>
                </div>
            </div>
        );
    }
}

Subject.propTypes = {
    id: React.PropTypes.number.isRequired,
    level: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    teachers: React.PropTypes.arrayOf(React.PropTypes.object)
};

Subject.defaultProps = {
    teachers: []
};