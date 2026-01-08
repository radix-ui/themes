import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, fireEvent, waitFor } from '../../test-utils';
import { Image } from '../../../src/components/image';

describe('Image', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic rendering', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test image" />,
      );
      expect(container.querySelector('.rt-Image')).toBeInTheDocument();
    });

    it('renders with correct src and alt attributes', () => {
      renderWithProviders(
        <Image src="/photo.jpg" alt="A beautiful photo" data-testid="image" />,
      );
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/photo.jpg');
      expect(img).toHaveAttribute('alt', 'A beautiful photo');
    });

    it('warns when src is missing', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      renderWithProviders(
        // @ts-expect-error - testing missing required prop
        <Image alt="Test" />,
      );
      expect(consoleSpy).toHaveBeenCalledWith('Image component: src prop is required');
      consoleSpy.mockRestore();
    });

    it('does not render image when src is missing', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = renderWithProviders(
        // @ts-expect-error - testing missing required prop
        <Image alt="Test" />,
      );
      expect(container.querySelector('.rt-Image')).not.toBeInTheDocument();
      consoleSpy.mockRestore();
    });

    it('applies className to container', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" className="custom-class" />,
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('applies style to container', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" style={{ maxWidth: '500px' }} />,
      );
      // The container with the image should have the style
      const imageContainer = container.querySelector('.rt-Image')?.parentElement;
      expect(imageContainer).toHaveStyle({ maxWidth: '500px' });
    });
  });

  describe('Loading behavior', () => {
    it('defaults to lazy loading', () => {
      renderWithProviders(<Image src="/test.jpg" alt="Test" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    it('supports eager loading', () => {
      renderWithProviders(<Image src="/test.jpg" alt="Test" loading="eager" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('loading', 'eager');
    });
  });

  describe('Fit prop', () => {
    it('accepts fit prop without error', () => {
      expect(() =>
        renderWithProviders(<Image src="/test.jpg" alt="Test" fit="cover" />),
      ).not.toThrow();
    });

    it('accepts contain fit value', () => {
      expect(() =>
        renderWithProviders(<Image src="/test.jpg" alt="Test" fit="contain" />),
      ).not.toThrow();
    });

    it('accepts all fit values', () => {
      const fitValues = ['cover', 'contain', 'fill', 'scale-down', 'none'] as const;
      fitValues.forEach((fit) => {
        expect(() =>
          renderWithProviders(<Image src="/test.jpg" alt="Test" fit={fit} />),
        ).not.toThrow();
      });
    });
  });

  describe('Radius prop', () => {
    it('applies radius data attribute', () => {
      renderWithProviders(<Image src="/test.jpg" alt="Test" radius="medium" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('data-radius', 'medium');
    });
  });

  describe('Caption', () => {
    it('renders caption when provided', () => {
      renderWithProviders(
        <Image src="/test.jpg" alt="Test" caption="Photo by John Doe" />,
      );
      expect(screen.getByText('Photo by John Doe')).toBeInTheDocument();
    });

    it('caption has correct class', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" caption="Test caption" />,
      );
      expect(container.querySelector('.rt-Image-caption')).toBeInTheDocument();
    });

    it('renders nested structure when caption is present', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" caption="Test caption" />,
      );
      // When caption is present, there's a caption element
      expect(container.querySelector('.rt-Image-caption')).toHaveTextContent('Test caption');
      // And the image
      expect(container.querySelector('.rt-Image')).toBeInTheDocument();
    });

    it('renders flat structure when caption is absent', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" />,
      );
      // When no caption, the structure is flatter
      const imageContainer = container.firstChild as HTMLElement;
      // Should contain: sr-only announcements (conditionally), skeleton, placeholder, img
      expect(imageContainer.querySelector('.rt-Image')).toBeInTheDocument();
    });
  });

  describe('Skeleton loading', () => {
    it('shows skeleton when showSkeleton is true and loading', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" showSkeleton />,
      );
      expect(container.querySelector('.rt-Skeleton')).toBeInTheDocument();
    });

    it('does not show skeleton by default', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" />,
      );
      expect(container.querySelector('.rt-Skeleton')).not.toBeInTheDocument();
    });
  });

  describe('Placeholder', () => {
    it('renders placeholder image when provided', () => {
      const { container } = renderWithProviders(
        <Image src="/high-res.jpg" alt="Test" placeholder="/low-res.jpg" />,
      );
      const placeholderImg = container.querySelector('.rt-Image--placeholder');
      expect(placeholderImg).toBeInTheDocument();
      expect(placeholderImg).toHaveAttribute('src', '/low-res.jpg');
    });

    it('placeholder has blur effect', () => {
      const { container } = renderWithProviders(
        <Image src="/high-res.jpg" alt="Test" placeholder="/low-res.jpg" />,
      );
      const placeholderImg = container.querySelector('.rt-Image--placeholder');
      expect(placeholderImg).toHaveStyle({ filter: 'blur(4px)' });
    });

    it('placeholder has empty alt for accessibility', () => {
      const { container } = renderWithProviders(
        <Image src="/high-res.jpg" alt="Test" placeholder="/low-res.jpg" />,
      );
      const placeholderImg = container.querySelector('.rt-Image--placeholder');
      expect(placeholderImg).toHaveAttribute('alt', '');
    });
  });

  describe('Fade in animation', () => {
    it('has opacity transition by default', () => {
      renderWithProviders(<Image src="/test.jpg" alt="Test" />);
      const img = screen.getByRole('img');
      expect(img).toHaveStyle({ transition: 'opacity 0.3s ease-out' });
    });

    it('has no transition when fadeIn is false', () => {
      renderWithProviders(<Image src="/test.jpg" alt="Test" fadeIn={false} />);
      const img = screen.getByRole('img');
      expect(img).toHaveStyle({ transition: 'none' });
    });
  });

  describe('Accessibility', () => {
    it('has aria-busy=true during loading', () => {
      renderWithProviders(<Image src="/test.jpg" alt="Test" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('aria-busy', 'true');
    });

    it('shows loading announcement for screen readers', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" />,
      );
      const announcement = container.querySelector('.rt-sr-only[role="status"]');
      expect(announcement).toBeInTheDocument();
      expect(announcement).toHaveTextContent('Loading image...');
    });

    it('uses custom loadingAriaLabel', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" loadingAriaLabel="Loading photo..." />,
      );
      const announcement = container.querySelector('.rt-sr-only[role="status"]');
      expect(announcement).toHaveTextContent('Loading photo...');
    });

    it('has aria-live="polite" on loading announcement', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" />,
      );
      const announcement = container.querySelector('.rt-sr-only[role="status"]');
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Load and error callbacks', () => {
    it('calls onLoad when image loads', () => {
      const handleLoad = vi.fn();
      renderWithProviders(
        <Image src="/test.jpg" alt="Test" onLoad={handleLoad} />,
      );
      const img = screen.getByRole('img');
      fireEvent.load(img);
      expect(handleLoad).toHaveBeenCalledTimes(1);
    });

    it('calls onError when image fails to load', () => {
      const handleError = vi.fn();
      renderWithProviders(
        <Image src="/broken.jpg" alt="Test" onError={handleError} />,
      );
      const img = screen.getByRole('img');
      fireEvent.error(img);
      expect(handleError).toHaveBeenCalledTimes(1);
    });

    it('updates aria-busy to false after load', () => {
      renderWithProviders(<Image src="/test.jpg" alt="Test" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('aria-busy', 'true');
      fireEvent.load(img);
      expect(img).toHaveAttribute('aria-busy', 'false');
    });

    it('sets aria-invalid to true on error', () => {
      renderWithProviders(<Image src="/broken.jpg" alt="Test" />);
      const img = screen.getByRole('img');
      fireEvent.error(img);
      expect(img).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows error announcement for screen readers on error', () => {
      const { container } = renderWithProviders(
        <Image src="/broken.jpg" alt="Test" />,
      );
      const img = screen.getByRole('img');
      fireEvent.error(img);
      const errorAnnouncement = container.querySelector('.rt-sr-only[role="alert"]');
      expect(errorAnnouncement).toBeInTheDocument();
      expect(errorAnnouncement).toHaveTextContent('Failed to load image');
    });

    it('uses custom errorAriaLabel', () => {
      const { container } = renderWithProviders(
        <Image src="/broken.jpg" alt="Test" errorAriaLabel="Image could not be loaded" />,
      );
      const img = screen.getByRole('img');
      fireEvent.error(img);
      const errorAnnouncement = container.querySelector('.rt-sr-only[role="alert"]');
      expect(errorAnnouncement).toHaveTextContent('Image could not be loaded');
    });

    it('hides placeholder after load', () => {
      const { container } = renderWithProviders(
        <Image src="/high-res.jpg" alt="Test" placeholder="/low-res.jpg" />,
      );
      expect(container.querySelector('.rt-Image--placeholder')).toBeInTheDocument();
      const img = screen.getByRole('img');
      fireEvent.load(img);
      expect(container.querySelector('.rt-Image--placeholder')).not.toBeInTheDocument();
    });

    it('hides skeleton after load', () => {
      const { container } = renderWithProviders(
        <Image src="/test.jpg" alt="Test" showSkeleton />,
      );
      expect(container.querySelector('.rt-Skeleton')).toBeInTheDocument();
      const img = screen.getByRole('img');
      fireEvent.load(img);
      expect(container.querySelector('.rt-Skeleton')).not.toBeInTheDocument();
    });
  });

  describe('Polymorphic as prop', () => {
    it('renders as img by default', () => {
      renderWithProviders(<Image src="/test.jpg" alt="Test" />);
      const img = screen.getByRole('img');
      expect(img.tagName).toBe('IMG');
    });

    it('renders as custom component when as prop is provided', () => {
      const CustomImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
        (props, ref) => <img ref={ref} data-custom="true" {...props} />,
      );
      CustomImage.displayName = 'CustomImage';

      renderWithProviders(
        <Image as={CustomImage} src="/test.jpg" alt="Test" />,
      );
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('data-custom', 'true');
    });

    it('passes additional props to custom component', () => {
      const CustomImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }>(
        ({ priority, ...props }, ref) => (
          <img ref={ref} data-priority={priority ? 'true' : 'false'} {...props} />
        ),
      );
      CustomImage.displayName = 'CustomImage';

      renderWithProviders(
        <Image as={CustomImage} src="/test.jpg" alt="Test" priority />,
      );
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('data-priority', 'true');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the image element', () => {
      const ref = React.createRef<HTMLImageElement>();
      renderWithProviders(<Image ref={ref} src="/test.jpg" alt="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLImageElement);
      expect(ref.current?.tagName).toBe('IMG');
    });

    it('works with callback ref', () => {
      let imgElement: HTMLImageElement | null = null;
      const callbackRef = (el: HTMLImageElement | null) => {
        imgElement = el;
      };
      renderWithProviders(<Image ref={callbackRef} src="/test.jpg" alt="Test" />);
      expect(imgElement).toBeInstanceOf(HTMLImageElement);
    });
  });

  describe('Layout props', () => {
    it('accepts width prop without error', () => {
      expect(() =>
        renderWithProviders(<Image src="/test.jpg" alt="Test" width="300px" />),
      ).not.toThrow();
    });

    it('accepts height prop without error', () => {
      expect(() =>
        renderWithProviders(<Image src="/test.jpg" alt="Test" height="200px" />),
      ).not.toThrow();
    });

    it('accepts margin props without error', () => {
      expect(() =>
        renderWithProviders(<Image src="/test.jpg" alt="Test" m="4" />),
      ).not.toThrow();
    });

    it('accepts multiple layout props', () => {
      expect(() =>
        renderWithProviders(
          <Image
            src="/test.jpg"
            alt="Test"
            width="300px"
            height="200px"
            m="4"
            p="2"
          />,
        ),
      ).not.toThrow();
    });
  });
});

describe('Next.js Image fill compatibility', () => {
  it('wrapper uses absolute positioning when fill prop is true', () => {
    const { container } = renderWithProviders(
      <Image src="/test.jpg" alt="Test" fill />,
    );
    const wrapper = container.querySelector('.rt-Image')?.parentElement as HTMLElement;
    expect(wrapper.style.position).toBe('absolute');
    // jsdom may return '0' or '0px' depending on version
    expect(['0', '0px']).toContain(wrapper.style.inset);
  });

  it('wrapper uses relative positioning when fill is not used', () => {
    const { container } = renderWithProviders(
      <Image src="/test.jpg" alt="Test" />,
    );
    const wrapper = container.querySelector('.rt-Image')?.parentElement as HTMLElement;
    expect(wrapper.style.position).toBe('relative');
  });

  it('does not add position style to image element when fill is true', () => {
    renderWithProviders(<Image src="/test.jpg" alt="Test" fill />);
    const img = screen.getByRole('img');
    // When fill is used, position should not be relative (Next.js sets it to absolute)
    expect(img.style.position).not.toBe('relative');
  });

  it('passes width/height to custom component when provided as numbers', () => {
    const CustomImage = React.forwardRef<
      HTMLImageElement,
      React.ImgHTMLAttributes<HTMLImageElement> & { width?: number; height?: number }
    >(({ width, height, ...props }, ref) => (
      <img
        ref={ref}
        data-width={width}
        data-height={height}
        {...props}
      />
    ));
    CustomImage.displayName = 'CustomImage';

    renderWithProviders(
      <Image as={CustomImage} src="/test.jpg" alt="Test" width={600} height={400} />,
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('data-width', '600');
    expect(img).toHaveAttribute('data-height', '400');
  });

  it('works with fill and custom component without conflicting styles', () => {
    const CustomImage = React.forwardRef<
      HTMLImageElement,
      React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }
    >(({ fill, ...props }, ref) => (
      <img
        ref={ref}
        data-fill={fill ? 'true' : 'false'}
        style={fill ? { position: 'absolute', inset: 0 } : undefined}
        {...props}
      />
    ));
    CustomImage.displayName = 'CustomImage';

    const { container } = renderWithProviders(
      <Image as={CustomImage} src="/test.jpg" alt="Test" fill />,
    );

    // Wrapper should be absolute
    const wrapper = container.querySelector('.rt-Image')?.parentElement as HTMLElement;
    expect(wrapper.style.position).toBe('absolute');

    // Custom component receives fill prop
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('data-fill', 'true');
  });

  it('user style is merged with wrapper style when fill is used', () => {
    const { container } = renderWithProviders(
      <Image src="/test.jpg" alt="Test" fill style={{ zIndex: 10 }} />,
    );
    const wrapper = container.querySelector('.rt-Image')?.parentElement as HTMLElement;
    expect(wrapper.style.position).toBe('absolute');
    // jsdom may return '0' or '0px' depending on version
    expect(['0', '0px']).toContain(wrapper.style.inset);
    expect(wrapper.style.zIndex).toBe('10');
  });
});

describe('Image type exports', () => {
  it('exports ImageProps type', () => {
    // This test verifies TypeScript types are exported correctly
    const _props: import('../../../src/components/image').ImageProps = {
      src: '/test.jpg',
      alt: 'Test',
    };
    expect(_props.src).toBe('/test.jpg');
  });
});
