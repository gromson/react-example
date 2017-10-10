/**
 * Created by roman on 29.01.17.
 */
import React from 'react'
import Subject from './subjects/subject';
import uuid from 'uuid/v1';

export default class SubjectsBlock extends React.Component {
    items() {
        return this.props.subjects.map((item, index) => <Subject key={'subject-' + item.id + '-' + uuid()} {...item}/>);
    }

    componentDidMount() {
        $('#subjects-accordion, #rooms-accordion').on('show.bs.collapse', function (event) {
            let $icon = $(event.target).prev('.panel-heading').find('i.fa')
            $icon.removeClass('fa-chevron-down');
            $icon.addClass('fa-chevron-up');
        }).on('hide.bs.collapse', function (event) {
            let $icon = $(event.target).prev('.panel-heading').find('i.fa')
            $icon.removeClass('fa-chevron-up');
            $icon.addClass('fa-chevron-down');
        });

        $('.scroll_content').slimscroll({
            height: '500px'
        });
    }

    render() {
        return (
            <div className="col-sm-2 schedule__left-module">
                <div className="scroll_content" style={{marginRight: 10 + 'px'}}>
                    <div className="panel-group schedule__subjects" id="subjects-accordion">
                        {this.items()}
                    </div>
                </div>
            </div>
        );
    }
}

SubjectsBlock.propTypes = {
    subjects: React.PropTypes.arrayOf(React.PropTypes.object)
};

SubjectsBlock.defaultProps = {
    subjects: []
};