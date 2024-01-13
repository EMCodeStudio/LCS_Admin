import { Field } from "payload/types"
import getProductServiceLocation from "../../../hooks/OrderHooks/ProductServiceLocationHook"

const ProductServiceLocationField: Field ={
        name: 'UbicacionProductoServicioPedido',
        label: 'Ubicaciones Disponibles',
        type: 'textarea',
        admin: {
            readOnly: true,
            width: '50%'
        },
        hooks: {
            beforeChange: [getProductServiceLocation],
            afterRead: [getProductServiceLocation]
        }
}

export default ProductServiceLocationField