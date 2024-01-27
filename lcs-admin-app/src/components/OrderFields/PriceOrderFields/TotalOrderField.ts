import { Field } from "payload/types"
import getTotalPrice from "../../../hooks/OrderHooks/TotalPriceOrderHook"

const TotalOrderField: Field = {


    name: "TotalPricioPedido",
    label: "$ Total a Pagar:",
    type: "number",
    required: false,
    hooks: {
        beforeChange: [getTotalPrice],
        afterRead: [getTotalPrice]
    },
    access: {
        update: () => true,
        read: () => true
    },
    admin: {
        readOnly: true,
        width: '50%',
        step: 1,
        placeholder: '0.00',
    }
}


export default TotalOrderField