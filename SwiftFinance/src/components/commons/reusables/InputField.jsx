import React from 'react'

const InputField = ({ label, id, type = 'text', ...rest }) => {
  return (
    <label style={{display: 'flex', flexDirection: 'column', gap: '6px'}} htmlFor={id}>
      <span style={{fontSize: '14px', color: 'var(--mint)', fontWeight: '500'}}>{label}</span>
      <input 
        id={id} 
        name={id} 
        type={type} 
        {...rest}
        style={{
          padding: '0.75rem',
          backgroundColor: 'var(--card)',
          color: 'var(--white)',
          border: '1px solid var(--mint)',
          borderRadius: '4px',
          fontFamily: 'inherit',
          fontSize: '1rem',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          ...rest.style
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--violet)'
          e.target.style.boxShadow = '0 0 8px rgba(108,52,131,0.14)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--mint)'
          e.target.style.boxShadow = 'none'
        }}
      />
    </label>
  )
}

export default InputField
