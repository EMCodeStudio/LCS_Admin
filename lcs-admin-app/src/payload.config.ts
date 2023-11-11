import path from 'path'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import Users from './collections/Users'
import Categories from './collections/Categories'
import Subcategories from './collections/Subcategories'
import Images from './collections/Images'
import Products from './collections/Products'
import Services from './collections/Services'
import Tags from './collections/Tags'
import Publications from './collections/Publications'
import Portraits from './collections/Portraits'
import Company from './collections/Company'
import Logo from './components/Logo/Logo'
import Icon from './components/Logo/Icon'
import Clients from './collections/Clients'
import Orders from './collections/Orders'
import Reviews from './collections/Reviews'
import Colors from './collections/Colors'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta:{
      titleSuffix: 'LC Soluciones',
      favicon: '/public/assets/Icons/Favicon.ico',
    },
    components: {
      graphics: {
        Logo,
        Icon
      }
    },
  },
  editor: slateEditor({}),
  collections: [
    Orders,
    Clients,
    Publications,
    Tags,
    Portraits,
    Images,
    Categories,
    Subcategories,
    Colors,
    Products,
    Services,
    Company,
    Users,
  ],
  
 
  localization: {
    defaultLocale: 'es',
    locales: ['es']
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),

})
