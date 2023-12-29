import React from 'react'
import './Messages.scss'
import { useState, useEffect } from 'react'

type Props = {
  message: string
  showError?: boolean
}

const baseClass = 'error-message';
const ErrorMessages: React.FC<Props> = (props) => {

  const { message, showError } = props
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 60000)
    return () => clearTimeout(timer)
  }, [])
  
  const handleClose = () => {
    setIsVisible(false)
  }

  if (showError) {
    return (
      isVisible && (
        <div className={`${baseClass}`}>
          <p>{message}</p>
          <button className={`${baseClass}__close-button`} type='button' onClick={handleClose}>&#x58;</button>
          {/*    &#x88 */}
        </div>
      )
    )
  } else {
    return null;
  }
}

export default ErrorMessages