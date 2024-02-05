import { Field } from "payload/types"
import getLocationPrice from "../../../hooks/OrderHooks/PriceLocationHook"

const PriceShippingField: Field = {
    name: "PrecioEnvioPedido",
    label: "$ Costo de Envio :",
    type: "number",
    required: false,
    admin: {
        step: 1,
        width: '30%',
        readOnly: true,
        placeholder: '$ 0.00',
        condition: (data) => {
            if (data.TipoVentaPedido === 'product') {
                return true
            } else {
                return false
            }
        }
    },
    hooks: {
        beforeChange: [getLocationPrice],
        afterRead: [getLocationPrice]
    }
}

export default PriceShippingField