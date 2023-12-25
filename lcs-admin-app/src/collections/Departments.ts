import { CollectionConfig } from "payload/types";

const Departments: CollectionConfig = {
    slug: 'departamentos',
    access:{
        read: ()=> true
    },
    admin: {
        useAsTitle: 'NombreDepartamento',
        group: 'SISTEMA'
    },
   labels: {
      singular: 'Departmento',
      plural: 'Departmentos',
    },
    fields: [
        //example text field
        {
            name: 'NombreDepartamento',
            label: 'Nombre del Departamento',
            type: 'text',
            unique: true,
            required: true,
            admin:{
                placeholder:  'Nombre aqui'
            }
        },
    ],
   
    timestamps: true,
};

export default Departments;