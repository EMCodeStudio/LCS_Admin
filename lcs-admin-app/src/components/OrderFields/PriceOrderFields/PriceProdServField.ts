import { Field } from "payload/types"
import getProductServicePrice from "../../../hooks/OrderHooks/PriceProdServHook"

const PriceProdServField: Field = {

    name: "PrecioProductoServicio",
    type: "number",
    label: "Costo de Venta",
    required: false,
    admin: {
        readOnly: true,
        width: '30%',
        placeholder: '$ 0.00',
    },
    
    hooks: {
       // beforeChange: [({ siblingData }) => {
            //return siblingData.PrecioProductoServicio = undefined
            //delete siblingData.PrecioProductoServicio
        //}],
        beforeChange: [getProductServicePrice],
        afterRead: [getProductServicePrice]
    },
    /*  hooks: {
         beforeChange: [
          ({ data, value, operation }) => {
          data.PrecioProducto = typeof value === 'string' ? value.split(' ')[0] : '';
          return value;
                 },
            ],
     }, */
}

export default PriceProdServField