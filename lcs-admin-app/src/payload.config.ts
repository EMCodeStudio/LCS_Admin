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
import Colors from './collections/Colors'
import Trademarks from './collections/Trademarks'
import Logo from './components/Logo/Logo'
import Icon from './components/Logo/Icon'
import Orders from './collections/Orders'
import Locations from './collections/Locations'
import Customers from './collections/Customers'
import Departments from './collections/Departments'
import Municipalities from './collections/Municipalities'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
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
    Customers,
    Orders,
    Publications,
    Tags,
    Images,
    Portraits,
    Trademarks,
    Colors,
    Categories,
    Subcategories,
    Products,
    Services,
    Company,
    Users,
    Locations,
    Departments,
    Municipalities,
  ],

  i18n: {
    fallbackLng: 'es', // default
    debug: false, // default
    /*    resources: {
         en: {
           custom: {
             // namespace can be anything you want
             key1: 'Translation with {{variable}}', // translation
           },
           // override existing translation keys
           general: {
             dashboard: 'Home',
           },
         },
       }, */
  },

  localization: {
    defaultLocale: 'es',
    locales: ['es','en']
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
