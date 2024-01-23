import { FieldHook } from "payload/types"

const validateProductRequest: FieldHook = async ({ data, originalDoc }) => {
    if (data && data.AprobacionEstadoPedido === 'approved') {
        const { CantidadProductoPedido } = originalDoc.DetallesPagoPedido
        return CantidadProductoPedido
    }
}


export default validateProductRequest