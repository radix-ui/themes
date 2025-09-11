#!/usr/bin/env node

/**
 * Generate JSON schemas from Zod schemas for AI/Copilot integration
 *
 * This script converts Zod schemas to JSON Schema format that can be consumed by:
 * - Cursor/Copilot for better autocomplete
 * - RAG systems for semantic search
 * - Documentation generation tools
 * - API validation systems
 *
 * Usage: node scripts/generate-json-schemas.js
 */

import { zodToJsonSchema } from 'zod-to-json-schema';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import schemas
const {
  BaseButtonSchema,
  ButtonSchema,
  IconButtonSchema,
  ToggleButtonSchema,
  ToggleIconButtonSchema,
  ShellRootSchema,
  ShellHeaderSchema,
  ShellRailSchema,
  ShellPanelSchema,
  ShellSidebarSchema,
  ShellContentSchema,
  ShellInspectorSchema,
  ShellBottomSchema,
  ShellTriggerSchema,
  ShellHandleSchema,
} = await import('../src/components/schemas/index.ts');

// Create output directory
const outputDir = join(__dirname, '../schemas');
mkdirSync(outputDir, { recursive: true });

// Schema mapping
const schemas = {
  'base-button': BaseButtonSchema,
  button: ButtonSchema,
  'icon-button': IconButtonSchema,
  'toggle-button': ToggleButtonSchema,
  'toggle-icon-button': ToggleIconButtonSchema,
  'shell-root': ShellRootSchema,
  'shell-header': ShellHeaderSchema,
  'shell-rail': ShellRailSchema,
  'shell-panel': ShellPanelSchema,
  'shell-sidebar': ShellSidebarSchema,
  'shell-content': ShellContentSchema,
  'shell-inspector': ShellInspectorSchema,
  'shell-bottom': ShellBottomSchema,
  'shell-trigger': ShellTriggerSchema,
  'shell-handle': ShellHandleSchema,
};

// Generate JSON schemas
const generatedSchemas = {};

for (const [name, schema] of Object.entries(schemas)) {
  try {
    const jsonSchema = zodToJsonSchema(schema, {
      name: `${name.charAt(0).toUpperCase() + name.slice(1)}Schema`,
      description: `JSON Schema for ${name} component props`,
      target: 'jsonSchema7',
      strictUnions: true,
    });

    // Add metadata
    jsonSchema.$schema = 'https://json-schema.org/draft/2020-12/schema';
    jsonSchema.title = `${name.charAt(0).toUpperCase() + name.slice(1)} Component Props`;
    jsonSchema.description = `Props schema for the ${name} component in Kookie UI`;
    jsonSchema.version = '1.0.0';
    jsonSchema.generatedAt = new Date().toISOString();
    jsonSchema.source = 'Zod schema';

    // Write individual schema file
    const filePath = join(outputDir, `${name}.json`);
    writeFileSync(filePath, JSON.stringify(jsonSchema, null, 2));

    generatedSchemas[name] = jsonSchema;

    console.log(`✅ Generated ${name}.json`);
  } catch (error) {
    console.error(`❌ Failed to generate ${name}.json:`, error.message);
  }
}

// Generate combined schema index
const combinedSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'Kookie UI Components',
  description: 'Complete JSON Schema collection for all components in Kookie UI',
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  source: 'Zod schemas',
  components: generatedSchemas,
};

const indexPath = join(outputDir, 'index.json');
writeFileSync(indexPath, JSON.stringify(combinedSchema, null, 2));

console.log(`✅ Generated index.json with ${Object.keys(generatedSchemas).length} schemas`);
console.log(`📁 Schemas saved to: ${outputDir}`);

// Generate TypeScript definitions for the schemas
const tsDefinitions = `/**
 * Generated TypeScript definitions for JSON schemas
 * This file is auto-generated - do not edit manually
 */

export interface BaseButtonJsonSchema {
  $schema: string;
  title: string;
  description: string;
  type: 'object';
  properties: Record<string, any>;
  required?: string[];
  additionalProperties: boolean;
}

export interface ButtonJsonSchema extends BaseButtonJsonSchema {}
export interface IconButtonJsonSchema extends BaseButtonJsonSchema {}
export interface ToggleButtonJsonSchema extends BaseButtonJsonSchema {}
export interface ToggleIconButtonJsonSchema extends BaseButtonJsonSchema {}
export interface ShellRootJsonSchema extends BaseButtonJsonSchema {}
export interface ShellHeaderJsonSchema extends BaseButtonJsonSchema {}
export interface ShellRailJsonSchema extends BaseButtonJsonSchema {}
export interface ShellPanelJsonSchema extends BaseButtonJsonSchema {}
export interface ShellSidebarJsonSchema extends BaseButtonJsonSchema {}
export interface ShellContentJsonSchema extends BaseButtonJsonSchema {}
export interface ShellInspectorJsonSchema extends BaseButtonJsonSchema {}
export interface ShellBottomJsonSchema extends BaseButtonJsonSchema {}
export interface ShellTriggerJsonSchema extends BaseButtonJsonSchema {}
export interface ShellHandleJsonSchema extends BaseButtonJsonSchema {}

export interface KookieUIComponentSchemas {
  'base-button': BaseButtonJsonSchema;
  'button': ButtonJsonSchema;
  'icon-button': IconButtonJsonSchema;
  'toggle-button': ToggleButtonJsonSchema;
  'toggle-icon-button': ToggleIconButtonJsonSchema;
  'shell-root': ShellRootJsonSchema;
  'shell-header': ShellHeaderJsonSchema;
  'shell-rail': ShellRailJsonSchema;
  'shell-panel': ShellPanelJsonSchema;
  'shell-sidebar': ShellSidebarJsonSchema;
  'shell-content': ShellContentJsonSchema;
  'shell-inspector': ShellInspectorJsonSchema;
  'shell-bottom': ShellBottomJsonSchema;
  'shell-trigger': ShellTriggerJsonSchema;
  'shell-handle': ShellHandleJsonSchema;
}

export type ComponentName = keyof KookieUIComponentSchemas;
`;

const tsPath = join(outputDir, 'schemas.d.ts');
writeFileSync(tsPath, tsDefinitions);

console.log(`✅ Generated TypeScript definitions`);
console.log(`🎉 JSON schema generation complete!`);
