import { CollectionConfig } from "payload/types";
import { ImagePreviewOrderField } from "../components/Orders/ImagenOrderFields/PreviewImageOrderField";

const Orders: CollectionConfig = {
    slug: 'pedidos',
    labels: {
        singular: 'Pedido',
        plural: 'Pedidos',
    },
    admin: {
        useAsTitle: 'ClientePedido',
        defaultColumns: ['ClienteIdPedido', 'TipoVentaPedido', 'ProductoServicioPedido', 'EstadoPagoPedido', 'EstadoPedido'],
        group: 'VENTAS',
    },
    /*  endpoints: [
      {
        path: '/:id/tracking',
        method: 'get',
        handler: async (req, res, next) => {
          const tracking = await getTrackingInfo(req.params.id)
          if (tracking) {
            res.status(200).send({ tracking })
          } else {
            res.status(404).send({ error: 'not found' })
          }
        },
      },
    ],*/
    fields: [

        {
            name: 'ClienteIdPedido',
            label: 'Datos del Cliente',
            type: 'relationship',
            relationTo: 'clientes',
            required: true,
            admin: {
                description: 'Seleccion un busque un Cliente de la lista',
            }
        },
        {
            name: "TipoVentaPedido",
            label: "Tipo de Venta",
            type: 'radio',
            required: false,
            options: [
                {
                    label: 'Producto',
                    value: 'product',
                },
                {
                    label: 'Servicio',
                    value: 'service',
                },
            ],
            defaultValue: 'product',
            admin: {
                layout: 'horizontal',
            }
        },

        {
            type: 'row', fields: [
                {

                    name: "ProductoServicioPedido",
                    label: "Productos - Servicios",
                    type: 'relationship',
                    required: true,
                    relationTo: ['productos', 'servicios'],
                    hasMany: false,
                    maxDepth: 0,
                    filterOptions: ({ data, relationTo }) => {
                        if (relationTo === 'productos') {
                            if (data.TipoVentaPedido === 'product') {
                                return {
                                    CantidadProducto: { greater_than_equal: 1 },
                                }
                            }
                            return {
                                NombreProducto: { exists: false },
                            }
                        }
                        if (relationTo === 'servicios') {
                            if (data.TipoVentaPedido === 'service') {
                                return {
                                    EstadoServicio: { equals: 'published' },
                                }
                            }
                            return {
                                NombreServicio: { exists: false },
                            }
                        }
                    },
                    admin: {
                        description: 'Seleccione un Producto o Servicio de la Lista',
                        width: '50%',
                    }
                },
                ImagePreviewOrderField,
            ]
        }


    ],
    timestamps: true,
};

export default Orders;