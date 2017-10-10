/**
 * Created by roman on 15.04.17.
 */
import React from 'react';

export class SchoolCategorySelectorItem extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        console.log('ad');
        this.props.getSchoolCategory(this.props.scheduleId, this.props.itemLevel);
    }

    render() {
        let props = this.props;
        let className = ' btn-white';

        if (props.itemLevel == props.level) {
            className = ' btn-primary active';
        }

        return (
            <button className={'btn btn-sm' + className} type="button" onClick={this.onClick}>{props.title}</button>
        );
    }
}

SchoolCategorySelectorItem.propTypes = {
    scheduleId: React.PropTypes.number.isRequired,
    itemLevel: React.PropTypes.oneOf(['elementary', 'middle', 'high']).isRequired,
    title: React.PropTypes.string.isRequired,
    getSchoolCategory: React.PropTypes.func.isRequired,
    level: React.PropTypes.oneOf(['elementary', 'middle', 'high'])
};

SchoolCategorySelectorItem.defaultProps = {
    level: 'elementary'
};