import payload from "payload";
import { FieldHook } from "payload/types"

const getProductStockOrder: FieldHook = async ({ data }) => {
    try {
        if (data) {
            const fieldProductId = data.ProductoServicioPedido.value;
            //  console.log('ID DEL PRODUCTO getProductStockOrder: ', fieldProductId)
            const responseProductoStock = await payload.find({
                collection: 'productos',
                where: {
                    id: fieldProductId,
                }
            })
            if (responseProductoStock.docs && responseProductoStock.docs.length > 0) {
                const productStockData = responseProductoStock.docs[0].CantidadProducto;
                return productStockData
            } else {
                console.log('SIN STOCK DE PRODUCTOS!')
            }
        }
         
    } catch (error) {
        console.log('Error en la Funcion getProductStockOrder: ', error)
    }
    return 0
}
export { getProductStockOrder }