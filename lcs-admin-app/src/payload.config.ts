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

import Logo from './components/Logo/Logo'
import Icon from './components/Logo/Icon'
import Products from './collections/Products'
import Services from './collections/Services'
import Tags from './collections/Tags'
import Publications from './collections/Publications'
import Portraits from './collections/Portraits'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta:{
      titleSuffix: 'LCSoluciones',
      favicon: '/assets/Icons/Favicon.ico',
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
    Publications,
    Tags,
    Portraits,
    Images,
    Categories,
    Subcategories,
    Products,
    Services,
    Users
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
