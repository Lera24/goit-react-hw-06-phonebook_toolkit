import PropTypes from "prop-types";
import actions from "../../redux/contacts-action";
import { connect } from "react-redux";
import css from "./ContactList.module.css";

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map((contact) => {
        return (
          <li key={contact.id} className={css.item}>
            <span className={css.name}>{`${contact.name}:`}</span>
            <span className={css.number}>{contact.number}</span>
            <button
              type="submit"
              className={css.button}
              onClick={() => onDeleteContact(contact.name)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = (state) => {
  const { filter, items } = state.contacts;
  const normalizeFilter = filter.toLowerCase();
  const filterCurrentTel = items.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter)
  );

  return {
    contacts: filterCurrentTel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteContact: (name) => dispatch(actions.removeItem(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

ContactList.propTypes = {
  contacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};
