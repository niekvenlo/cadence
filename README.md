# Cadence App

This is app created for Move, in response to their coding challenge.

It is a to-do app, but with a twist: it is specifically designed for repetitive actions, like replacing your toothbrush, that we all _know_ we should do [every three months](https://www.google.com/search?q=how+often+should+you+replace+your+toothbrush), but who can remember when they last changed their toothbrush?

So in Cadence, when you mark a task as completed, it doesn't disappear. Instead, it is automatically rescheduled to sometime in the future.

This project can be run with the default CLI commands:

> $ npm run build
> $ npm run start
> $ npm run dev

See the About page in the app for tips on using the app.

## Features

As per the assignment, it:

- fetches a list from a mocked API; NextJS api routes.
- lists the tasks in a sensible manner.
- allows the user to add, edit, and complete tasks locally.

## Tech stack

As requested, it uses:

- NextJS
- TypeScript
- Styled Components
- Jest + Testing Library

as well as

- Tanstack Query for mirroring server state.
- react-flip-toolkit for animating list reorders.

# Tests

I added a couple of tests, but I have nowhere near complete coverage. I ran out of time.
