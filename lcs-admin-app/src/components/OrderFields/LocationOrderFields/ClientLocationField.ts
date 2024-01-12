import { Field } from "payload/types"
import getClientLocation from "../../../hooks/OrderHooks/ClientLocationHook"


const ClientLocationField: Field = {
    name: "UbicacionClientePedido",
    type: "textarea",
    label: "Ubicacion del Cliente",
    required: false,
    admin: {
        width: '50%',
        readOnly: true,
    },
    access: {
        update: () => false,
        create: () => false
    },
      hooks: {
          beforeChange: [({ siblingData }) => {
              delete siblingData.UbicacionProductoServicio 
          }],
          afterRead: [getClientLocation]
      }
}

export default ClientLocationField