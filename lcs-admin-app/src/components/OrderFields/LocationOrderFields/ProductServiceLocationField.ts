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
        access: {
            update: () => false,
            create: () => false,
        },
        hooks: {
            beforeChange: [({ siblingData }) => {
                delete siblingData.UbicacionProductoServicio 
            }],
            afterRead: [getProductServiceLocation]
        }
}

export default ProductServiceLocationField