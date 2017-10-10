/**
 * Created by roman on 11.12.16.
 */
import React from 'react';
import SubjectsBlock from '../../containers/groups-view/subjects-block';
import RoomsBlock from '../../containers/groups-view/rooms-block';
import Grid from '../../containers/groups-view/grid';
import DaySelector from '../../containers/groups-view/day-selector/day-selector';
import TrashZone from '../../containers/groups-view/trash-zone';
import SchoolCategorySelector from '../../containers/groups-view/school-category-selector/school-category-selector';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.props.getData(props.id);
    }

    enableSlideSides() {
        let $blockSubjects = $('.schedule').find('.schedule__left-module'),
            $blockRooms = $('.schedule').find('.schedule__right-module'),
            $blockTrash = $('.schedule').find('.schedule-trash-zone'),
            initTopSubjects = $blockSubjects.offset().top,
            initTopRooms = $blockRooms.offset().top,
            initTopTrash = $blockTrash.offset().top,
            scrollTimeoutId;

        $(document).on('scroll', function () {
            clearTimeout(scrollTimeoutId);
            scrollTimeoutId = setTimeout(function () {
                if ($(this).scrollTop() > initTopSubjects) {
                    $blockSubjects.animate({marginTop: ( $(document).scrollTop() - initTopSubjects )});
                    $blockRooms.animate({marginTop: ( $(document).scrollTop() - initTopRooms )});
                    $blockTrash.animate({marginTop: ( $(document).scrollTop() - initTopTrash )});
                } else {
                    $blockSubjects.animate({marginTop: 0});
                    $blockRooms.animate({marginTop: 0});
                    $blockTrash.animate({marginTop: 0});
                }
            }, 200)

        });
    }

    componentDidMount() {
        this.enableSlideSides();
    }

    render() {
        return (
            <div className="schedule row">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <SchoolCategorySelector />
                    </div>
                    <div className="col-sm-8 col-sm-offset-2">
                        <DaySelector />
                    </div>
                </div>
                <SubjectsBlock />
                <Grid />
                <RoomsBlock
                    rooms_categories={this.props.rooms_categories}
                    classes={this.props.classes}/>
                <TrashZone visible={this.props.trash_zone} />
            </div>
        );
    }
}

Schedule.propTypes = {
    id: React.PropTypes.number.isRequired,
    getData: React.PropTypes.func.isRequired,
    classes: React.PropTypes.object,
    groups: React.PropTypes.arrayOf(React.PropTypes.object),
    rooms_categories: React.PropTypes.objectOf(React.PropTypes.object),
    subjects: React.PropTypes.arrayOf(React.PropTypes.object),
    week_length: React.PropTypes.number,
    trash_zone: React.PropTypes.bool
};

Schedule.defaultProps = {
    classes: {},
    groups: [],
    rooms_categories: {},
    subjects: [],
    week_length: 6,
    trash_zone: false
};

export default DragDropContext(HTML5Backend)(Schedule);