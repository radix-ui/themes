import { Box, Grid } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function GridPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Grid</DocsSectionHeading>
      <DocsSectionBody>
        {/* Ensure breakpoints work */}
        <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="3" mb="8">
          <Box style={{ height: 256 }}>
            {/* Ensure default value works */}
            <Grid gap="3" style={{ height: 256 }}>
              {Array.from(Array(4).keys()).map((i) => (
                <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
              ))}
            </Grid>
          </Box>

          <Box style={{ height: 256 }}>
            {/* Ensure plain strings works */}
            <Grid columns="5" gap="3" height="100%">
              {Array.from(Array(5).keys()).map((i) => (
                <Box key={i} style={{ background: 'var(--accent-9)' }} />
              ))}
            </Grid>
          </Box>

          <Box style={{ height: 256 }}>
            {/* Ensure initial is equal to plain strings */}
            <Grid columns={{ initial: '5' }} gap="3" height="100%">
              {Array.from(Array(20).keys()).map((i) => (
                <Box key={i} style={{ background: 'var(--accent-9)' }} />
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid gap="3" columns="4">
          {/* Ensure arbitrary values work */}
          <Grid gap="3" columns="1fr 1fr 2fr">
            {Array.from(Array(3).keys()).map((i) => (
              <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
            ))}
          </Grid>

          {/* Ensure arbitrary values work with theme values */}
          <Grid gap="3" columns={{ xs: '3', md: '1fr 1fr 2fr' }}>
            {Array.from(Array(3).keys()).map((i) => (
              <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
            ))}
          </Grid>

          {/* Ensure CSS source order is correct for arbitrary and theme values */}
          <Grid gap="3" columns={{ xs: '3', md: '1fr 1fr 2fr', lg: '3' }}>
            {Array.from(Array(3).keys()).map((i) => (
              <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
            ))}
          </Grid>

          {/* Ensure mapped values work*/}
          <Grid gap="1" columns={{ xs: '20' }}>
            {Array.from(Array(20).keys()).map((i) => (
              <Box key={i} style={{ height: 55, background: 'var(--accent-9)' }} />
            ))}
          </Grid>
        </Grid>
      </DocsSectionBody>
    </DocsSection>
  );
}
