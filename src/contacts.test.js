import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ContactList from '../src/pages/ContactList';
import { actionTypes } from '../src/actions/contacts';

// Mock the external components that aren't part of our test
jest.mock('components/Header', () => {
  return function Header({ title }) {
    return <h1 data-testid="header">{title}</h1>;
  };
});

jest.mock('components/ExternalInfo', () => {
  return function ExternalInfo() {
    return null;
  };
});

// Create a full reducer to handle our contact actions
const initialState = {
  contacts: {
    list: [
      { name: 'John Doe', phone: '123-456-7890' },
      { name: 'Jane Smith', phone: '987-654-3210' }
    ]
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: {
          list: [...state.contacts.list, action.payload]
        }
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: {
          list: state.contacts.list.map((contact, index) =>
            index === action.payload.index ? { ...action.payload.contact } : contact
          )
        }
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: {
          list: state.contacts.list.filter((_, index) => index !== action.payload)
        }
      };
    default:
      return state;
  }
};

describe('Contacts Feature', () => {
  let store;

  beforeEach(() => {
    // Create store with thunk middleware
    store = createStore(reducer, initialState, applyMiddleware(thunk));
  });

  it('displays the initial contact list', () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    // Verify header and description
    expect(screen.getByText(/Redux CRUD Operations/)).toBeInTheDocument();
    expect(screen.getByText(/Manage contacts!!!/)).toBeInTheDocument();

    // Verify initial contacts are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('987-654-3210')).toBeInTheDocument();
  });

  it('can add a new contact', () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    // Open add contact form
    const addButton = screen.getByRole('button', { name: /add/i }) || 
                     document.querySelector('.float-right.mt-1.cursor-pointer');
    fireEvent.click(addButton);

    // Fill out the form
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const phoneInput = screen.getByRole('textbox', { name: /phone/i });
    
    fireEvent.change(nameInput, { target: { value: 'Bob Wilson' } });
    fireEvent.change(phoneInput, { target: { value: '555-123-4567' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    // Verify new contact is added
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
    expect(screen.getByText('555-123-4567')).toBeInTheDocument();

    // Verify we now have 3 contacts
    expect(store.getState().contacts.list).toHaveLength(3);
  });

  it('can edit an existing contact', () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    // Find and click edit button for first contact
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    // Get input fields
    const inputs = screen.getAllByRole('textbox');
    
    // Update contact info
    fireEvent.change(inputs[0], { target: { value: 'John Doe Jr', name: 'name' } });
    fireEvent.change(inputs[1], { target: { value: '999-888-7777', name: 'phone' } });

    // Save changes
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Verify contact was updated
    expect(screen.getByText('John Doe Jr')).toBeInTheDocument();
    expect(screen.getByText('999-888-7777')).toBeInTheDocument();

    // Verify store was updated correctly
    expect(store.getState().contacts.list[0]).toEqual({
      name: 'John Doe Jr',
      phone: '999-888-7777'
    });
  });

  it('can cancel editing a contact', () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    // Start editing first contact
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    // Change values
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Changed Name', name: 'name' } });
    fireEvent.change(inputs[1], { target: { value: '000-000-0000', name: 'phone' } });

    // Cancel the edit
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Verify original values are still there
    expect(screen.getByText('John Doe Jr')).toBeInTheDocument();
    expect(screen.getByText('999-888-7777')).toBeInTheDocument();
  });

  it('can delete a contact', () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    // Get initial contact count
    const initialCount = store.getState().contacts.list.length;

    // Delete the first contact
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    // Verify contact was removed from UI
    expect(screen.queryByText('John Doe Jr')).not.toBeInTheDocument();
    expect(screen.queryByText('999-888-7777')).not.toBeInTheDocument();

    // Verify store was updated
    expect(store.getState().contacts.list).toHaveLength(initialCount - 1);
  });

  it('maintains contact list state across actions', () => {
    render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );

    // Add a new contact
    fireEvent.click(document.querySelector('.float-right.mt-1.cursor-pointer'));
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const phoneInput = screen.getByRole('textbox', { name: /phone/i });
    
    fireEvent.change(nameInput, { target: { value: 'Alice Cooper' } });
    fireEvent.change(phoneInput, { target: { value: '111-222-3333' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Edit an existing contact
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[1]);
    
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jane Smith-Jones', name: 'name' } });
    fireEvent.click(screen.getByText('Save'));

    // Delete a contact
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    // Verify final state
    const finalState = store.getState().contacts.list;
    expect(finalState).toHaveLength(2);
    expect(screen.getByText('Jane Smith-Jones')).toBeInTheDocument();
    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
  });

  it('handles empty contact list', () => {
    // Create a store with no contacts
    const emptyStore = createStore(reducer, { contacts: { list: [] } });
    
    render(
      <Provider store={emptyStore}>
        <ContactList />
      </Provider>
    );

    // Verify empty state is handled
    expect(screen.queryByTestId('contact-card')).not.toBeInTheDocument();

    // Add a contact to empty list
    fireEvent.click(document.querySelector('.float-right.mt-1.cursor-pointer'));
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const phoneInput = screen.getByRole('textbox', { name: /phone/i });
    
    fireEvent.change(nameInput, { target: { value: 'First Contact' } });
    fireEvent.change(phoneInput, { target: { value: '111-111-1111' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Verify contact was added
    expect(screen.getByText('First Contact')).toBeInTheDocument();
    expect(emptyStore.getState().contacts.list).toHaveLength(1);
  });
});