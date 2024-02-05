import { Field } from "payload/types";
import getProdServUnitPrice from "../../../hooks/OrderHooks/UnitProdServPriceHook";

const ProdServUnitPriceField: Field = {

    name: "PrecioProductoServicioUnidad",
    label: "$ Precio Unitario :",
    type: "number",
    required: false,
    admin: {
        readOnly: true,
        width: '50%',
        placeholder: '$ 0.00',
    },
    hooks: {
         beforeChange: [getProdServUnitPrice],
         afterRead: [getProdServUnitPrice]
     },

}


export default ProdServUnitPriceField