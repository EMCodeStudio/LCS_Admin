import { Field } from "payload/types";
import getTotalProductsOrder from "../../../hooks/OrderHooks/TotalProductsPriceHook";

const TotalProductsField: Field = {
    name: "TotalProductosPedido", 
    type: "number", 
    label: "$ Total Productos :",
    required: false,
    admin: {
        readOnly: true,
        width: '30%',
        placeholder: '$ 0.00',
    },
    hooks:{
        beforeChange: [getTotalProductsOrder],
        afterRead: [getTotalProductsOrder]
    }
}

export default TotalProductsField