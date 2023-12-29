import React from 'react'
import './ImageStyle.scss'
type ImageProps = {
    urlImage: string
}
export const ImageProduct: React.FC<ImageProps> = (imageValue) => {

    const { urlImage } = imageValue

    return (
        <div className='image-container'>
            <img src={urlImage} alt="" />
        </div>

    )
}
