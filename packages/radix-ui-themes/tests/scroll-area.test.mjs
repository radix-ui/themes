import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Theme, ScrollArea } from '../dist/esm/index.js';

test('ScrollArea dir is applied to the primitive root', () => {
  const html = renderToString(
    createElement(Theme, null, createElement(ScrollArea, { dir: 'rtl' }, 'content')),
  );
  const root = html.match(/<[^>]*rt-ScrollAreaRoot[^>]*>/)?.[0];
  assert.ok(root, 'expected a ScrollArea root');
  assert.match(root, /dir="rtl"/);
});
