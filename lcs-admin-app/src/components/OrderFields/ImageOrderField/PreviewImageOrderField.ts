import { Field } from "payload/types"
import getProductServiceImage from "../../../hooks/OrderHooks/ImageOrderHook"

const ImagePreviewOrderField: Field = {
    name: "ImagenServicioProductoId",
    type: "upload",
    label: "Imagen de Producto - Servicio",
    required: false,
    relationTo: 'imagenes',
    admin: {
        readOnly: true,
        hidden: false,
        width: '100%',
        condition: ({UbicacionProductoServicioPedido}) => UbicacionProductoServicioPedido !== undefined,
    },
    access: {
        update: () => false,
        create: () => false
    },
    hooks: {
        beforeChange: [({ siblingData }) => {
            delete siblingData.VentaImagenOrder
        }],
        afterRead: [getProductServiceImage]
    }
}

export { ImagePreviewOrderField }
