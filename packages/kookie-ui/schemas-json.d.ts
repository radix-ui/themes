// Ambient module declarations for JSON schema imports
// This file enables TypeScript to resolve JSON schema imports

declare module '@kushagradhawan/kookie-ui/schemas-json' {
  const schemaIndex: any;
  export default schemaIndex;
}

declare module '@kushagradhawan/kookie-ui/schemas-json/*' {
  const schema: any;
  export default schema;
}
