import { Component } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  updateContacts = ({ name, number }) => {
    const contactExists = this.state.contacts.find(contact => {
      return contact.name === name || contact.number === number;
    });

    contactExists
      ? Report.info(
          '',
          `Contact with name ${name} and number ${number} already exists`,
          'Okay'
        )
      : this.setState(prevState => ({
          contacts: [
            ...prevState.contacts,
            {
              name,
              number,
              id: nanoid(),
            },
          ],
        }));
  };

  filterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contactsStorage = localStorage.getItem('contacts');
    const parsedContactsStorage = JSON.parse(contactsStorage);

    if(parsedContactsStorage) {
      this.setState({ contacts: parsedContactsStorage })
    } 
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    const { filter } = this.state;

    const normalizedFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.updateContacts} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} filter={this.filterContacts} />
          <ContactsList
            contactList={filteredContacts}
            deleteContact={this.deleteContacts}
          />
        </Section>
      </>
    );
  }
}

App.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  id: PropTypes.string,
};
