import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'usuarios',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['Usuario'],
    group: 'SISTEMA'
  },
  labels: {
    plural: 'Usuarios',
    singular: 'Usuario'
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "Usuario", // required
      type: "text", // required
      label: "Nombre de Usuario",
      required: false,
      unique: true,
      admin: {
        placeholder: 'Nombre de Usuario aqui'
      }
    },
  ],
  timestamps: true
}

export default Users
