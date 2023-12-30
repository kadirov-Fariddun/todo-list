import React from 'react';
import PropTypes from 'prop-types';
import './inputSearch.scss';

export default function InputSearch(props) {
    const {onChange,onClick,btnNone,placeholder,className} = props;
  return (
    <div className="search-input">
        <input type="text" name='search' required className={className} onChange={onChange} placeholder={placeholder}
        autoComplete='off'/>
        {btnNone ? '':
        <button type='reset' className="search-btn" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
        </svg>
        </button>
        }
    </div>
  )
}

InputSearch.propTypes = {
    onChange:PropTypes.func.isRequired,
    onClick:PropTypes.func.isRequired,
    btnNone:PropTypes.bool.isRequired,
    placeholder:PropTypes.string.isRequired,
}
InputSearch.defaultProps = {
    onChange(){},
    onClick(){},
    placeholder:'Search note...',
}