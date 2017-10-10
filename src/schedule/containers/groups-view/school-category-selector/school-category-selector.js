/**
 * Created by roman on 15.04.17.
 */
import {connect} from 'react-redux';
import {SchoolCategorySelector as Selector} from '../../../components/groups-view/school-category-selector/school-category-selector';
import {setStateData} from '../../../data/state-handler';

const mapStateToProps = (state) => {
    return {
        scheduleId: state.schedule_id,
        level: state.school_category
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSchoolCategory: (id, category) => {
            $.ajax({
                url: '/schedule/getinitstate/' + id + '/' + category,
                dataType: 'json',
                success: function (data) {
                    dispatch(setStateData(data));
                }
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Selector);