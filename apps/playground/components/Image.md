# Image Component

Display images with responsive sizing, object-fit control, shadows, and advanced visual effects.

## Import

```tsx
import { Image } from '@kushagradhawan/kookie-ui';
```

## Basic Usage

```tsx
<Image src="/path/to/image.jpg" alt="Description of image" width="200px" height="150px" />
```

## API Reference

### Props

| Prop        | Type                                                       | Default     | Description                                                            |
| ----------- | ---------------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `src`       | `string`                                                   | -           | **Required.** The image source URL                                     |
| `alt`       | `string`                                                   | -           | Alternative text for accessibility (required when not using `asChild`) |
| `variant`   | `'surface' \| 'blur'`                                      | `'surface'` | Visual variant of the image                                            |
| `fit`       | `'cover' \| 'contain' \| 'fill' \| 'scale-down' \| 'none'` | `'cover'`   | Controls how the image is resized to fit its container                 |
| `radius`    | `'none' \| 'small' \| 'medium' \| 'large' \| 'full'`       | -           | Border radius of the image                                             |
| `shadow`    | `'1' \| '2' \| '3' \| '4' \| '5' \| '6'`                   | -           | Box shadow intensity                                                   |
| `loading`   | `'eager' \| 'lazy'`                                        | `'lazy'`    | Image loading behavior                                                 |
| `asChild`   | `boolean`                                                  | `false`     | Render as a child element (for links/buttons)                          |
| `width`     | `string \| ResponsiveObject`                               | -           | Image width                                                            |
| `height`    | `string \| ResponsiveObject`                               | -           | Image height                                                           |
| `maxWidth`  | `string \| ResponsiveObject`                               | -           | Maximum width                                                          |
| `maxHeight` | `string \| ResponsiveObject`                               | -           | Maximum height                                                         |

### Responsive Props

All sizing props support responsive objects:

```tsx
<Image
  width={{ initial: '100px', sm: '200px', md: '300px' }}
  height={{ initial: '75px', sm: '150px', md: '225px' }}
/>
```

## Variants

### Surface (Default)

Standard image display with optional shadows and radius.

```tsx
<Image src="/image.jpg" alt="Standard image" variant="surface" shadow="2" radius="medium" />
```

### Blur

Creates a sophisticated layered effect with a blurred background offset.

```tsx
<Image src="/image.jpg" alt="Blur effect image" variant="blur" radius="large" />
```

The blur variant automatically creates:

- A sharp foreground image
- A blurred, saturated background image offset by 8px
- Layered composition for depth

## Object Fit Options

Controls how the image resizes to fit its container:

### Cover (Default)

Scales to cover the entire container, may crop parts of the image.

```tsx
<Image src="/image.jpg" alt="Cover fit" fit="cover" />
```

### Contain

Scales to fit entirely within the container, may leave empty space.

```tsx
<Image src="/image.jpg" alt="Contain fit" fit="contain" />
```

### Fill

Stretches to fill the container exactly, may distort the image.

```tsx
<Image src="/image.jpg" alt="Fill fit" fit="fill" />
```

### Scale Down

Same as `contain` but never scales up beyond original size.

```tsx
<Image src="/image.jpg" alt="Scale down fit" fit="scale-down" />
```

### None

Displays at original size, may be cropped or leave empty space.

```tsx
<Image src="/image.jpg" alt="No fit" fit="none" />
```

## Shadow System

Add depth with design system shadows:

```tsx
{
  /* Light shadow */
}
<Image src="/image.jpg" alt="Light shadow" shadow="1" />;

{
  /* Medium shadow */
}
<Image src="/image.jpg" alt="Medium shadow" shadow="3" />;

{
  /* Strong shadow */
}
<Image src="/image.jpg" alt="Strong shadow" shadow="6" />;
```

## Radius Options

Control border radius with design system values:

```tsx
{
  /* Small radius */
}
<Image src="/image.jpg" alt="Small radius" radius="small" />;

{
  /* Medium radius */
}
<Image src="/image.jpg" alt="Medium radius" radius="medium" />;

{
  /* Large radius */
}
<Image src="/image.jpg" alt="Large radius" radius="large" />;

{
  /* Fully rounded */
}
<Image src="/image.jpg" alt="Full radius" radius="full" />;
```

## Interactive Images (asChild)

Transform images into interactive elements like links or buttons:

### As Link

```tsx
<Image src="/image.jpg" alt="Clickable image" width="300px" height="200px" asChild>
  <a href="/product/123" />
</Image>
```

### As Button

```tsx
<Image src="/image.jpg" alt="Button image" variant="blur" shadow="3" asChild>
  <button onClick={() => handleImageClick()} />
</Image>
```

### Interactive States

When using `asChild`, images automatically get interactive states:

- **Hover**: Slight scale up (1.02x) with enhanced shadow
- **Focus**: Visible focus outline for accessibility
- **Active**: Scale down (0.98x) for press feedback

## AspectRatio Integration

Use with AspectRatio component for consistent proportions:

```tsx
import { AspectRatio, Image } from '@kushagradhawan/kookie-ui';

<AspectRatio ratio={16 / 9}>
  <Image src="/image.jpg" alt="16:9 image" width="100%" height="100%" fit="cover" />
</AspectRatio>;
```

## Common Patterns

### Hero Image

```tsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  width="100%"
  height="400px"
  fit="cover"
  variant="blur"
  shadow="4"
/>
```

### Profile Picture

```tsx
<Image
  src="/profile.jpg"
  alt="User profile"
  width="80px"
  height="80px"
  radius="full"
  fit="cover"
  shadow="2"
/>
```

### Product Card

```tsx
<Image
  src="/product.jpg"
  alt="Product image"
  width="100%"
  height="200px"
  radius="medium"
  shadow="3"
  asChild
>
  <a href="/product/123" />
</Image>
```

### Gallery Thumbnail

```tsx
<Image
  src="/thumbnail.jpg"
  alt="Gallery image"
  width="150px"
  height="150px"
  fit="cover"
  radius="small"
  asChild
>
  <button onClick={openLightbox} />
</Image>
```

## Performance Considerations

### Lazy Loading

Images use `loading="lazy"` by default for better performance:

```tsx
{
  /* Lazy loaded (default) */
}
<Image src="/image.jpg" alt="Lazy image" />;

{
  /* Eager loading for above-the-fold images */
}
<Image src="/hero.jpg" alt="Hero image" loading="eager" />;
```

### Responsive Images

Use responsive widths for different screen sizes:

```tsx
<Image
  src="/image.jpg"
  alt="Responsive image"
  width={{
    initial: '100%',
    sm: '300px',
    md: '400px',
    lg: '500px',
  }}
  height="200px"
/>
```

## Accessibility

### Alt Text

Always provide meaningful alt text:

```tsx
{
  /* Good */
}
<Image src="/sunset.jpg" alt="Golden sunset over mountain lake" />;

{
  /* Avoid */
}
<Image src="/sunset.jpg" alt="Image" />;
```

### Decorative Images

For decorative images, use empty alt:

```tsx
<Image src="/decoration.jpg" alt="" />
```

### Interactive Images

When using `asChild`, ensure the wrapper element has proper accessibility:

```tsx
<Image src="/action.jpg" alt="Start action" asChild>
  <button aria-label="Start the action process" />
</Image>
```

## Styling

### CSS Custom Properties

The blur variant exposes CSS variables for customization:

```css
.custom-blur {
  --blur-filter: blur(20px) saturate(1.8);
  --blur-opacity: 0.7;
  --blur-offset-y: 12px;
}
```

### Style Overrides

Direct style customization:

```tsx
<Image
  src="/image.jpg"
  alt="Custom styled"
  style={{
    border: '2px solid var(--blue-6)',
    transform: 'rotate(2deg)',
  }}
/>
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Progressive enhancement for older browsers
- Automatic fallbacks for unsupported features

## Related Components

- `AspectRatio` - Maintain consistent image proportions
- `Card` - Container component for image cards
- `Avatar` - Specialized component for user profile images
- `Button` - For interactive image buttons
