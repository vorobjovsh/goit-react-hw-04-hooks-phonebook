import React, { useState, useEffect } from 'react';
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from './Filter/Filter';
import shortid from 'shortid';

export const App = () => {

  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const dataContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(dataContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  },[]);

  const addName = ({name, number}) => {
    const user = {
      id: shortid.generate(),
      name,
      number
    };

    const sortFilter = contacts.filter(contact =>
      contact.name === user.name,
    );

    if (sortFilter.length > 0) {
      return alert(
        `${user.name} is already in contacts`
      );
    } else {
      const addContact = [user, ...contacts];
      setContacts(addContact);
      localStorage.setItem('contacts', JSON.stringify(addContact));
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    const beforeDelete = contacts.filter(item => item.id !== contactId);
    setContacts(beforeDelete)
    localStorage.setItem('contacts', JSON.stringify(beforeDelete));
  };

    return (
       <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={addName} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
       </div>
    );

};
