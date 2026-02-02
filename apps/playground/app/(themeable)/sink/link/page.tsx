import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Flex, Link, Separator, Text } from '@radix-ui/themes';
import { linkPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function LinkPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Link</DocsSectionHeading>
      <DocsSectionBody>
        <Flex gap="4" mb="5">
          <Link color="purple" href="/">
            This is a link
          </Link>
          <Link color="gray" href="/">
            This is a link
          </Link>
          <Link color="green" href="/">
            This is a link
          </Link>
          <Link color="red" href="/">
            This is a link
          </Link>
          <Link color="yellow" href="/">
            This is a link
          </Link>
          <Link color="blue" href="/">
            This is a link
          </Link>

          <Text as="p" color="gray">
            <Link href="/">This is a link</Link>
          </Text>
        </Flex>
        <Flex gap="4" mb="5">
          <Link color="purple" highContrast href="/">
            This is a link
          </Link>
          <Link color="gray" highContrast href="/">
            This is a link
          </Link>
          <Link color="green" highContrast href="/">
            This is a link
          </Link>
          <Link color="red" highContrast href="/">
            This is a link
          </Link>
          <Link color="yellow" highContrast href="/">
            This is a link
          </Link>
          <Link color="blue" highContrast href="/">
            This is a link
          </Link>
        </Flex>

        <Flex direction="column" align="start" gap="4" mb="5">
          {linkPropDefs.size.values
            .slice()
            .reverse()
            .map((size) => (
              <Link key={size} href="/" size={size}>
                This is a link
              </Link>
            ))}

          <Flex align="center" gap="1" asChild>
            <Link color="purple" href="/" size="3">
              This is a link
              <ArrowTopRightIcon />
            </Link>
          </Flex>

          <Flex align="center" gap="1" asChild>
            <Link color="gray" href="/" size="3">
              This is a link
              <ArrowTopRightIcon />
            </Link>
          </Flex>

          <Text as="p" size="6">
            Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
            organizations looking to adopt new SaaS applications. SSO enables authentication via an
            organization&apos;s Identity Provider (IdP), such as Google Workspace or Okta, as
            opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not thousands,
            of usernames and passwords. Facilitate greater security, easier account management, and
            accelerated application onboarding and adoption by{' '}
            <Link href="/">adding SSO to your app</Link>.
          </Text>

          <Text as="p" size="6">
            Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
            organizations looking to adopt new SaaS applications. SSO enables authentication via an
            organization&apos;s Identity Provider (IdP), such as Google Workspace or Okta, as
            opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not thousands,
            of usernames and passwords. Facilitate greater security, easier account management, and
            accelerated application onboarding and adoption by{' '}
            <Link href="/">adding SSO to your app</Link>.
          </Text>

          <Separator size="3" my="5" />

          <Text as="p" color="gray" size="6">
            Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
            organizations looking to adopt new SaaS applications. SSO enables authentication via an
            organization&apos;s Identity Provider (IdP), such as Google Workspace or Okta, as
            opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not thousands,
            of usernames and passwords. Facilitate greater security, easier account management, and
            accelerated application onboarding and adoption by{' '}
            <Link href="/">adding SSO to your app</Link>.
          </Text>

          <Text as="p" color="purple" size="6">
            Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
            organizations looking to adopt new SaaS applications. SSO enables authentication via an
            organization&apos;s Identity Provider (IdP), such as Google Workspace or Okta, as
            opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not thousands,
            of usernames and passwords. Facilitate greater security, easier account management, and
            accelerated application onboarding and adoption by{' '}
            <Link href="/">adding SSO to your app</Link>.
          </Text>

          <Text as="p" color="blue" size="6">
            Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
            organizations looking to adopt new SaaS applications. SSO enables authentication via an
            organization&apos;s Identity Provider (IdP), such as Google Workspace or Okta, as
            opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not thousands,
            of usernames and passwords. Facilitate greater security, easier account management, and
            accelerated application onboarding and adoption by{' '}
            <Link href="/">adding SSO to your app</Link>.
          </Text>

          <Text as="p" color="green" size="6">
            Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
            organizations looking to adopt new SaaS applications. SSO enables authentication via an
            organization&apos;s Identity Provider (IdP), such as Google Workspace or Okta, as
            opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not thousands,
            of usernames and passwords. Facilitate greater security, easier account management, and
            accelerated application onboarding and adoption by{' '}
            <Link href="/">adding SSO to your app</Link>.
          </Text>

          <Text as="p" color="yellow" size="6">
            Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
            organizations looking to adopt new SaaS applications. SSO enables authentication via an
            organization&apos;s Identity Provider (IdP), such as Google Workspace or Okta, as
            opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not thousands,
            of usernames and passwords. Facilitate greater security, easier account management, and
            accelerated application onboarding and adoption by{' '}
            <Link href="/">adding SSO to your app</Link>.
          </Text>

          <Text as="p" color="red" size="6">
            Single Sign-On (SSO) is the most frequently asked for requirement by enterprise
            organizations looking to adopt new SaaS applications. SSO enables authentication via an
            organization&apos;s Identity Provider (IdP), such as Google Workspace or Okta, as
            opposed to users or <Link href="/">IT admins</Link> managing hundreds, if not thousands,
            of usernames and passwords. Facilitate greater security, easier account management, and
            accelerated application onboarding and adoption by{' '}
            <Link href="/">adding SSO to your app</Link>.
          </Text>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
