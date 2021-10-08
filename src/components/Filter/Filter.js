import shortid from "shortid";
import PropTypes from "prop-types";
import css from "./Filter.module.css";
import { connect } from "react-redux";
import actions from "../../redux/contacts-action";

function Filter({ filter, onFilter }) {
  const inputFilterId = shortid.generate();

  return (
    <label htmlFor={inputFilterId}>
      Find contacts by name
      <input
        className={css.input}
        onChange={onFilter}
        type="text"
        value={filter}
        id={inputFilterId}
      />
    </label>
  );
}

const mapStateToProps = (state) => ({
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onFilter: (e) => dispatch(actions.filterItem(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func,
};
