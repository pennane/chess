import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: ['../backend/src/server/graphql/schema.graphql'],
  documents: 'src/**/*.graphql',
  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript']
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'graphql/types.ts'
      },
      plugins: ['typescript-operations', 'typescript-react-apollo']
    }
  }
}

export default config
