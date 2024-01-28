import { Field } from "payload/types"
import getLocationPrice from "../../../hooks/OrderHooks/PriceLocationHook"


const PriceShippingField: Field = {

    name: "PrecioEnvioPedido",
    label: "$ Costo de Envio:",
    type: "number",
    required: false,
    access: {
        create: () => false
    },
    admin: {
        step: 1,
        width: '50%',
        readOnly: true,
        placeholder: '$ 0.00'
    },

    hooks: {
        beforeChange: [({ siblingData }) => {
            delete siblingData.PrecioEnvioPedido
        }],
        afterRead: [getLocationPrice]
    }
}

export default PriceShippingField