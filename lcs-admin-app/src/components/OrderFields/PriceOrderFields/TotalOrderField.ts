import { Field } from "payload/types"
import getTotalPriceOrder from "../../../hooks/OrderHooks/TotalPriceOrderHook"

const TotalOrderField: Field = {


    name: "TotalPricioPedido",
    label: "$ Total a Pagar:",
    type: "number",
    required: false,
    hooks: {
        beforeChange: [getTotalPriceOrder],
        afterRead: [getTotalPriceOrder]
    },
    admin: {
        readOnly: true,
        width: '30%',
        step: 1,
        placeholder: '0.00',
    }
}


export default TotalOrderField