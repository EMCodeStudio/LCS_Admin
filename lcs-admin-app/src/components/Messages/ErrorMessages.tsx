import React from 'react'
import './Messages.scss'
type Props = {
  message: string
  showError?: boolean
}
const ErrorMessages: React.FC<Props> = (props) => {
  const { message, showError} = props
  if (showError) {
   // return <p style={{ color: 'white' }}>{message}</p>
   return <div className='error-message'><p>{message}</p></div>
  } else return null;
}

export default ErrorMessages