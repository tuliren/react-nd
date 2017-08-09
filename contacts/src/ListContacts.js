import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless functional component
 *
 * When the component only has one render method and does not track interal state,
 * it can be replaced with a stateless functional component which has props as its argument.
 */

// function ListContacts(props) {
//   return (
//     <ol className='contact-list'>
//       {props.contacts.map((contact) => (
//         <li key={contact.id} className='contact-list-item'>
//           <div className='contact-avatar' style={{
//             backgroundImage: `url(${contact.avatarURL})`
//           }}/>
//           <div className='contact-details'>
//             <p>{contact.name}</p>
//             <p>{contact.email}</p>
//           </div>
//           <button className='contact-remove'>
//             Remove
//           </button>
//         </li>
//       ))}
//     </ol>
//   )
// }

class ListContacts extends React.Component {
  render() {
    return (
      <ol className='contact-list'>
        {this.props.contacts.map((contact) => (
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`
            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
              Remove
            </button>
          </li>
        ))}
      </ol>
    );
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

// export so that this file can be imported in App.js
export default ListContacts
