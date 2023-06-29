Before this demo: Stephen introduces Radix Themes

# Radix Themes demo

## Intro

Hi, I'm Benoît, a frontend engineer at WorkOS and maintainer of Radix UI.
I am super excited to take you through a demo of Radix Themes.

## Birds eye view

https://themes-playground.modulz-deploys.com/sink

- Let's first take a birds eye view by looking at this page where we showcase all the components with their different sizes, variants and colors.
- We've already added most of the Radix primitives. Overlay components such as: `AlertDialog`, `HoverCard`, `Popover`…
- …as well as our menu components: `DropdownMenu`, `ContextMenu` in multiple variants
- We've also made available all of form primitives such as: `Select`, `Switch`, `Slider`, and others
- But we've also added more components that didn't necessarily have a place in Radix primitives. For example you will find `Button` with many variants, `IconButton`, `TextField`, `TextArea`…
- …as well as other presentational components such as `Badge`, `Avatar`, typgraphic components and many more.

- You have probably noticed by now that all of the components I have shown you have a consistent look and feel. This is because they are configured to use a default Radix color scale, in this case indigo.
- Now let's take a look at how we can customize this and open the customization panel.
- Here we can see that we can pick any of the Radix color scales, and every single component adapts accordingly.
- I can also toggle dark mode and once again everything looks beautiful and accessible out of the box thanks to Radix colors.
- We can also configure a radius style globally, for example if we pick "full", we can see that all of the components are now fully rounded.
- Of course, each of those settings can also be configured per componenent instance.
- There are other options we can play with as well, but we will get back to that in the following live demo.

- Let's jump right in!

## Live coding demo

https://themes-playground.modulz-deploys.com/demo

In this demo we are going to build a screen which lists users and allows to edit them inside a dialog.

- I have prepared a Next.js 13 app with the new app router
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
    - Cancel (`soft` gray variant)
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
