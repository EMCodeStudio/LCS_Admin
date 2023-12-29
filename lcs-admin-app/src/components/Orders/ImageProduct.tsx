import React from 'react'
import './ImageStyle.scss'
type ImageProps = {
    urlImage: string
}
export const ImageProduct: React.FC<ImageProps> = (imageValue) => {
    const { urlImage } = imageValue
    console.log('NOMBRE DE LA IMAGEN PARAMETRO: ', urlImage)
    return (
        <div className='image-container'>
            <img src={`http://localhost:3001/imagenes/${urlImage}`} alt="" />
        </div>
    )
}
