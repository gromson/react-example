/**
 * Created by roman on 15.04.17.
 */
import React from 'react';
import {SchoolCategorySelectorItem as Item} from './school-category-selector-item';

export function SchoolCategorySelector(props) {
    return (
        <div className="schedule__school_category-selector">
            <div className="btn-group">
                <Item
                    title="Начальные классы"
                    itemLevel="elementary"
                    level={props.level}
                    scheduleId={props.scheduleId}
                    getSchoolCategory={props.getSchoolCategory}/>
                <Item
                    title="Средние классы"
                    itemLevel="middle"
                    level={props.level}
                    scheduleId={props.scheduleId}
                    getSchoolCategory={props.getSchoolCategory}/>
                <Item
                    title="Старшие классы"
                    itemLevel="high"
                    level={props.level}
                    scheduleId={props.scheduleId}
                    getSchoolCategory={props.getSchoolCategory}/>
            </div>
        </div>
    );
}

SchoolCategorySelector.propTypes = {
    scheduleId: React.PropTypes.number.isRequired,
    getSchoolCategory: React.PropTypes.func.isRequired,
    level: React.PropTypes.oneOf(['elementary', 'middle', 'high'])
};

SchoolCategorySelector.defaultProps = {
    level: 'elementary'
};