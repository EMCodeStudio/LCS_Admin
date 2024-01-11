import payload from "payload";
import { Field, FieldHook } from "payload/types";
import { ImagenProducto, ImagenServicio } from "../../../interfaces/OrderInterfaces/ImagenOrder/ImagenOrderInterfaces";
import { useState } from 'react';
/*const getProductServiceImageId: FieldHook = async ({ data }) => {
    try {
        if (data && data.ProductoServicioPedido !== undefined) {
            const ImageProductServiceFieldId = data.ProductoServicioPedido.value
            if (data.TipoVentaPedido === 'product' && data.ProductoServicioPedido.relationTo === 'productos') {
                const responseImageProduct = await payload.find({
                    collection: 'productos',
                    where: {
                        id: ImageProductServiceFieldId
                    }
                })
                console.log('ARRAY IMAGEN PRODUCTO: ', responseImageProduct)
                if (responseImageProduct.docs && responseImageProduct.docs.length > 0) {
                    const resultImageProductId = responseImageProduct.docs[0]?.ImagenesProducto as ImagenProducto[];
                    console.log('OBJETO DE IMAGEN PRODUCTO: ', resultImageProductId)
                    const getImageProductStringId = resultImageProductId?.[0]?.ImagenProducto.id
                    console.log('ID DE IMAGEN PRODUCTO: ', getImageProductStringId)
                    return getImageProductStringId;
                }
            }
            if (data.TipoVentaPedido === 'service' && data.ProductoServicioPedido.relationTo === 'servicios') {
                const responseImageService = await payload.find({
                    collection: 'servicios',
                    where: {
                        id: ImageProductServiceFieldId
                    }
                })
                console.log('ARRAY IMAGEN SERVICIO: ', responseImageService)
                if (responseImageService.docs && responseImageService.docs.length > 0) {
                    const resultImageServiceId = responseImageService.docs[0]?.ImagenesServicio as ImagenServicio[];
                    console.log('OBJETO DE IMAGEN SERVICIO: ', resultImageServiceId)
                    const getImageServiceStringId = resultImageServiceId?.[0]?.ImagenServicio.id
                    console.log('ID DE IMAGEN SERVICIO: ', getImageServiceStringId)
                    return getImageServiceStringId;
                }
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION getProductServiceImageId: ', error)
    }
}*/


const useGetProductServiceImage: FieldHook = async ({ data }) => {
    try {
        if (data && data.ProductoServicioPedido !== undefined) {
            const ImageProductServiceFieldId = data.ProductoServicioPedido.value;
            let collection = ''
            if (data.TipoVentaPedido === 'product' && data.ProductoServicioPedido.relationTo === 'productos') {
                collection = 'productos'
            } else if (data.TipoVentaPedido === 'service' && data.ProductoServicioPedido.relationTo === 'servicios') {
                collection = 'servicios'
            }
            const responseImage = await payload.find({
                collection,
                where: {
                    id: ImageProductServiceFieldId,
                },
            })
            console.log('ARRAY IMAGEN PRODUCTO: ', responseImage)
            if (responseImage.docs && responseImage.docs.length > 0) {
                const resultImageId = data.TipoVentaPedido === 'product' ?
                    (responseImage.docs[0]?.ImagenesProducto as ImagenProducto[])?.[0]?.ImagenProducto.id :
                    (responseImage.docs[0]?.ImagenesServicio as ImagenServicio[])?.[0]?.ImagenServicio.id
                    console.log('ID DE IMAGEN de ',collection +':'+ resultImageId)
                return resultImageId
            }
        }
    } catch (error) {
        console.log('ERROR EN LA FUNCION useGetProductServiceImage: ', error);
    }
}



const ImagePreviewOrderField: Field = {
    name: "ImagenServicioProductoId",
    type: "upload",
    label: "ID de Producto - Servicio",
    required: false,
    relationTo: 'imagenes',
    admin: {
        readOnly: true,
        hidden: false,
        width: '100%',
    },
    access: {
        update: () => false,
        create: () => false
    },
    hooks: {
        beforeChange: [({ siblingData }) => {
            delete siblingData.VentaImagenOrder
        }],
        afterRead: [useGetProductServiceImage]
    }
}

export { ImagePreviewOrderField };
