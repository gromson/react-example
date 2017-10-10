/**
 * Created by roman on 25.02.17.
 */
import {connect} from 'react-redux';
import SubjectsBlock from '../../components/groups-view/subjects-block';

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsBlock);