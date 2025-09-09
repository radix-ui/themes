/**
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

export interface KookieUIButtonSchemas {
  'base-button': BaseButtonJsonSchema;
  'button': ButtonJsonSchema;
  'icon-button': IconButtonJsonSchema;
  'toggle-button': ToggleButtonJsonSchema;
  'toggle-icon-button': ToggleIconButtonJsonSchema;
}

export type ButtonComponentName = keyof KookieUIButtonSchemas;
