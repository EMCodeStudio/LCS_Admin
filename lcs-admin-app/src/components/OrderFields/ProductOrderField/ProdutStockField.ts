import { Field } from "payload/types"
import { getProductStockOrder } from "../../../hooks/OrderHooks/ProductStockHook"


const ProductStockField: Field = {

    name: "StockProductoPedido",
    label: "Stock Disponible:",
    type: "number",
    required: false,
    admin: {
        width: '50%',
        readOnly: true,
        step: 1,
        condition: ({ TipoVentaPedido }) => TipoVentaPedido === 'product'
    },
    access: {
        update: () => false,
        create: () => false
    },
    hooks: {
        beforeChange: [({ siblingData }) => {
            delete siblingData.StockProductoPedido
        }],
        afterRead: [getProductStockOrder]
    },
}

export default ProductStockField