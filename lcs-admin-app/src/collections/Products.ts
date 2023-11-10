import { CollectionConfig } from "payload/types";


const Products: CollectionConfig = {
    slug: 'productos',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'Producto',
        defaultColumns: ['Producto', 'Modelo', 'Codigo', 'Precio', 'Cantidad', 'Imagen', 'Estado', 'FechaIngreso'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Producto',
        plural: 'Productos',
    },
    fields: [
        {
            name: 'Producto',
            label: 'Nombre del Producto',
            type: 'text',
            required: true,
            unique:true,
            admin: {
                width: '50%',
                placeholder:'Nombre de Producto aqui'
            }
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'Modelo',
                    label: 'Modelo del Producto',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                        placeholder:'Modelo aqui'
                    }
                },
                {
                    name: 'Codigo',
                    label: 'Codigo del Producto',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                        placeholder: 'SKU'

                    }
                },
            ]
        },
        //example text field
        {
            type: 'row',
            fields: [
                {
                    name: "Precio", // required
                    label: "Precio del Producto",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '$ 0.00',
                        width: '50%'
                    }
                },
                {
                    name: "Cantidad", // required
                    label: "Cantidad Disponible",
                    type: "number", // required
                    required: true,
                    admin: {
                        step: 1,
                        placeholder: '0',
                        width: '50%'
                    }
                },
            ]
        },
       {
         name: "Imagen", // required
         type: "upload", // required
         relationTo:'imagenes',  //required eg:media
         label: "Imgen de Producto",
         required: true,
         unique: true,
         hooks: {
            beforeValidate: [
                (req): void => {
                    const image = req.data
                    if (image && image.width < 420) {
                        throw new Error('La Imagen debe ser Igual o Mayor a 420px de Ancho')
                    }
                }
            ]
        },
        admin:{
            description:'Sube Imagen de Minimo 420px de ancho',
        }
       },
       
        {
            name: "Estado", // required
            type: "select", // required
            label: "Estado de Producto",
            hasMany: false, /// set to true if you want to select multiple
            options: [
                {
                    label: "Nuevo",
                    value: "new",
                },
                {
                    label: "Reacondicionado",
                    value: "reconditioned",
                },
            ],
            defaultValue: 'new',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "FechaIngreso", // required
            type: "date", // required
            label: "Fecha de Ingreso",
            //defaultValue: '1988-11-05T8:00:00.000+05:00',
            admin: {
                date: {
                    //Options: dayAndTime, timeOnly, dayOnly
                    pickerAppearance: 'dayAndTime',
                },
                position: "sidebar"
            }
        }
    ],

    timestamps: true,
};

export default Products;