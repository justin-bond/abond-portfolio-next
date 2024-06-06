import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import work from './work'

export const schemaTypes = [work, post, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [work, post, blockContent],
}
