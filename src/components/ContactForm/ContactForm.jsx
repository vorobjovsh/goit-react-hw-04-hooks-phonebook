import React, { useState} from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
//import shortid from 'shortid';

function ContactForm ({onSubmit}) {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = e => {
    setName(e.currentTarget.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({name, number});

    setName('');
    setNumber('');
  };

    return (
      <form className={s.form} onSubmit={handleSubmit} >
        <label>
          <p className={s.name}>Name</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label>
          <p className={s.name}>Number</p>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChangeNumber}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={s.addBtn} type="submit" >
          Add contact
        </button>
      </form>

    )

}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
