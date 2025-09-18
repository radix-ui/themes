import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { Shell } from '../../../src/components/index';
import { RenderCounter } from '../../helpers/render-counter';
import { getMainContent } from '../../helpers/a11y';

describe('Shell smoke', () => {
  it('renders Root and Content without crashing', () => {
    const renderCount = { current: 0 };

    renderWithProviders(
      <Shell.Root>
        <Shell.Content>
          hello
          <RenderCounter counter={renderCount} label="ContentRenderCounter" />
        </Shell.Content>
      </Shell.Root>,
    );

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(getMainContent()).toBeInTheDocument();
    expect(renderCount.current).toBe(1);
  });
});
