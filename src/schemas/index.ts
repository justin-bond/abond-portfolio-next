import { SchemaTypeDefinition } from 'sanity'

import aboutSchema from './about'
import blockContent from './blockContent'
import homeSchema from './home'
import metadata from './metadata'
import post from './post'
import work from './work'

// export const schemaTypes = [work, post, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutSchema, homeSchema, metadata, work, post, blockContent],
}
