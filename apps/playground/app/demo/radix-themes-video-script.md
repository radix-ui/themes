Before this demo: Stephen introduces Radix Themes

# Radix Themes demo

## Intro

Hi, I'm Benoît, a frontend engineer at WorkOS and maintainer of Radix UI.
I am super excited to take you through a demo of Radix Themes.

## Birds eye view

https://themes-playground.modulz-deploys.com/sink

Go through the components with their variants/colors, …

- Talk about the available variants
- Show off dark mode
- Show off the colors
- Show off customisation

## Live coding demo

https://themes-playground.modulz-deploys.com/demo

In this demo we are going to build a simple screen which lists users and allows to edit them inside a dialog.

- I have prepared a simple Next.js 13 app with the new app router
- Here I have a blank page shell to get us started
- Let's install Radix Themes (video of `npm install @radix-ui/themes`)
- I also have some data for a list of users we can pull in, let's render them:
  - Map over users
  - Add fragment with key
  - Add `Avatar` with `src` and `fallback`
  - Add `Flex`, name, handle
  - Wrap name & handle in another `Flex` to stack them vertically
  - Let's add a `Separator` in between each user
  - And just like that we've already got a beautiful list of users
- Now we want to add a dialog to edit the user
  - Let's first add a button, we'll use `IconButton` to keep things clean
  - We want it to be at the end of the row, so let's use another `Flex` (with `justify="end"`)
  - Let's wrap a `Dialog` around our button and add a title and description (`DialogRoot`, `DialogContent`, `DialogTitle`, `DialogDescription`)
  - Let's add some buttons to operate our `Dialog`
    - `Flex` wrapper (with `justify="end"`, `gap="3"`, `mt="5"`)
    - Cancel (`subtle-mono` variant)
    - Save
  - Let's add a `TextField` and `Label` for the name
  - Now we can copy this block and display the user's role
  - A `Select` would be more appropriate here, so let's use that instead (`SelectRoot`, `SelectItem`)
  - And just like that we have built a complex UI with beautiful components and accessibility baked in
  - But there's more, let's see how we can now customize the overall look, or even specific components
    - Pull up the customisation panel
    - Turn on dark mode
    - Pick a different color scale, background/foreground feel (I like dark / lime / natural)
    - Show off radius: none, then radius: full, then back to medium
    - Let's make everything larger too
    - We'd like Avatar to be a circle regardless, let's override it
    - We've now tailored the style to our needs!

## Outro

video of https://themes-playground.modulz-deploys.com/showcase in the background

This was just a small taste of what Radix Themes can do for you.
We hope you'll give it a try and let us know what you think!

<!-- slide showing install and link -->

You can install it today with `npm install @radix-ui/themes` and learn more about it on our website at radix-ui.com/themes.
