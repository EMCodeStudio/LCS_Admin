import React from 'react'
import './Messages.scss'
import { useState, useEffect } from 'react'
type Props = {
  message: string
  showError?: boolean
}
const ErrorMessages: React.FC<Props> = (props) => {

  const { message, showError } = props

  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // onClose();
    }, 60000); // 1 minuto en milisegundos

    return () => clearTimeout(timer);
    /*   }, [onClose]); */
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // onClose();
  };

  if (showError) {
    return (
      isVisible && (
        <div className='error-message'>
          <p>{message}</p>
          <button type='button' onClick={handleClose}>X</button>
        </div>
      )
    )
  }
  else {
    return null;
  }
}

export default ErrorMessages