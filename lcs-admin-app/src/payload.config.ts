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
    Images,
    Subcategories,
    Categories,
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
