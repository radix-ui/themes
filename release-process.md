# Release process

> This is a work-in-progress document and will be updated as we refine our release process.

## Release strategy

We track versions during the pull request process. As features are added, modified or improved it's important to keep track of these via versioning.

### Tracking version changes

PRs that fix bugs or add features should include an addition to `packages/radix-ui-themes/CHANGELOG.md` under a new version heading. The actual release version may differ, so be sure to double check this at publish time.

### Publishing a stable release

> You must be a maintainer of the repository and have write access to publish a release.

1. Create a new branch for the release. We recommend the branch naming convention `release/<version>` for this (e.g. `release/3.3.0`).
2. Update the version in `packages/radix-ui-themes/package.json` and ensure the changelog is up to date.
3. Add and commit with the commit message of `v<version>` (e.g. `v3.3.0`).
4. Push the branch to the repository and create a pull request.
5. When checks pass and the pull request is approved, merge it into `main`.
6. Create a new tag for the release with the format `<version>` (e.g. `3.3.0`).
   - If you do this locally, be sure to pull the latest changes from `main` to ensure you have the new version changes from the previous step.
7. Create a new GitHub release from the tag. Use the changelog entry for the version as its release notes.
8. The GitHub action will be triggered by the `publish` workflow and will automatically publish the package to npm.

> To publish a pre-release you must build and publish manually. Use `pnpm publish -r --tag <tag>`, where `<tag>` is the pre-release tag (e.g. `alpha`, `beta`, `rc`)

## Updating documentation

Our documentation is in a [separate repository](https://github.com/radix-ui/website) and updating it is a three step process:

1. Write and update the [change log](https://github.com/radix-ui/website/blob/main/data/themes/docs/overview/releases.mdx)
2. Bump package version/s and create / update the pages for each version change
3. Perform documentation updates and remove live demos from previous versions
