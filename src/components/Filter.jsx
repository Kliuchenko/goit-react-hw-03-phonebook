import PropTypes from 'prop-types';

export const Filter = ({ filter, value }) => {
  return (
    <form>
      <label>
        Find contacts by name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={filter}
          value={value}
        ></input>
      </label>
    </form>
  );
};

Filter.propTypes = {
  filter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
