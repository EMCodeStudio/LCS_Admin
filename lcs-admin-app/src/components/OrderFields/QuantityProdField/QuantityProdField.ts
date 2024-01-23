import { Field } from "payload/types"
import validateProductRequest from "../../../hooks/OrderHooks/QuantityProdHook"


const QuantityProdField: Field = {

    name: "CantidadProductoPedido",
    label: "Cantidad Solicitada",
    type: "number",
    required: true,
    //defaultValue: 0,
    hooks: {
        beforeChange: [validateProductRequest],
        afterRead: [validateProductRequest]
        /*hooks: {
            beforeChange: [(args) => {
              // Aquí puedes restringir la actualización del campo
              // Por ejemplo, solo permitir la actualización una vez cada X horas
              const lastUpdateTime = args.previousDoc.updatedAt
              const currentTime = new Date()
              const timeDifferenceInHours = (currentTime - lastUpdateTime) / 1000 / 60 / 60
              if (timeDifferenceInHours < X) {
                throw new Error('No se puede actualizar el campo más de una vez cada X horas')
              }
            }],
          },*/
    },
    admin: {
        placeholder: '0',
        width: '50%',
        condition: (data) => {
            if (data.TipoVentaPedido === 'product') {
                return true
            } else {
                return false
            }
        }
    }
}
export default QuantityProdField