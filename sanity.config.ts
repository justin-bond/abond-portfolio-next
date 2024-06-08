/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
// import { deskTool } from 'sanity/desk'
import { structureTool } from 'sanity/structure'
import {
  defineUrlResolver,
  Iframe,
  IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '~/lib/sanity.api'
import { schema } from '~/schemas'

const iframeOptions = {
  url: defineUrlResolver({
    base: '/api/draft',
    requiresSlug: ['post'],
  }),
  urlSecretId: previewSecretId,
  reload: { button: true },
} satisfies IframeOptions

export default defineConfig({
  basePath: '/studio',
  name: 'aileen-portfolio',
  title: 'Aileen Portfolio',
  projectId,
  dataset,
  //edit schemas in './src/schemas'
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Base')
          .items([
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  // Sets a title for our new list
                  .title('Settings')
                  // Add items to the array
                  // Each will pull one of our new singletons
                  .items([
                    S.listItem()
                      .title('Metadata')
                      .child(
                        S.document()
                          .schemaType('metadata')
                          .documentId('metadata'),
                      ),
                  ]),
              ),
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Home')
                      .child(
                        S.document().schemaType('home').documentId('home'),
                      ),
                    S.listItem()
                      .title('About')
                      .child(
                        S.document().schemaType('about').documentId('about'),
                      ),
                  ]),
              ),

            // We also need to remove the new singletons from the main list
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['metadata', 'home', 'about'].includes(listItem.getId()),
            ),
          ]),
      defaultDocumentNode: (S, { schemaType }) => {
        return S.document().views([
          // Default form view
          S.view.form(),
          // Preview
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
      },
    }),
    // deskTool({
    //   //   // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
    //   //   // You can add any React component to `S.view.component` and it will be rendered in the pane
    //   //   // and have access to content in the form in real-time.
    //   //   // It's part of the Studio's “Structure Builder API” and is documented here:
    //   //   // https://www.sanity.io/docs/structure-builder-reference
    //   defaultDocumentNode: (S, { schemaType }) => {
    //     return S.document().views([
    //       // Default form view
    //       S.view.form(),
    //       // Preview
    //       S.view.component(Iframe).options(iframeOptions).title('Preview'),
    //     ])
    //   },
    // }),
    // Add the "Open preview" action
    previewUrl({
      base: '/api/draft',
      requiresSlug: ['post'],
      urlSecretId: previewSecretId,
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
