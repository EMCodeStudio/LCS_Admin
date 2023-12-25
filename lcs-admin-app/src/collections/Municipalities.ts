const Municipalities = {
    slug: 'municipios',
   labels: {
      singular: 'Municipio',
      plural: 'Municipios',
    },
    fields: [
        //example text field
        {
            name: 'NombreMunicipio',
            label: 'Nombre Municipio / Ciudad',
            type: 'text',
            unique: true,
            required: true,
            admin:{
                placeholder:  'Nombre aqui'
            }
        },
    ],
    admin: {
        useAsTitle: 'fieldName',
    },
    timestamps: true,
};

export default Municipalities;