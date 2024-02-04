import { Field } from "payload/types";
import getTotalShippingOrder from "../../../hooks/OrderHooks/TotalShippingPriceHook";

const TotalShippingField: Field = {
    name: "TotalEnvioPedido", 
    type: "number", 
    label: "$ Total Envio :",
    required: false,
    admin: {
        readOnly: true,
        width: '30%',
        placeholder: '$ 0.00',
    },
    hooks:{
        beforeChange: [getTotalShippingOrder],
        afterRead: [getTotalShippingOrder]
    }
}

export default TotalShippingField