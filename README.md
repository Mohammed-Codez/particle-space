<!-- ./README.md -->
# Particle Space

![A set of 1000 multicolored atoms flinging away with a sidebar to... the side of course.](./docs/Particle%20Space%20img-1.png)

This space simulator uses atoms that are predefined in code as a list. This documentation will show how to use it, as well as some tricks that will be implemented. For now, there will only be a few tricks.

**NOTE:** I'm just an indie guy who likes making silly projects for fun. It's not meant for research on space as there are unreal circumstances like atoms having a weight of 1 something.

The link to the website is right over [here](https://mohammed-codez.github.io/particle-space/), Not me, just look slightly to the left

## Versions

- **April 25th Fri, 2025 - v1.0.0** — Just released
- **April 30th Wed, 2025 - v1.0.1** — Added the _trail_ toggle alongside a _trail multiplier_ parameter

## Controls

- **WASD Keys** — Move the camera
- **[+] / [-]** — Zoom in/out. Shift not used of course.
- **[R] Key** — Reset simulation to start. Does not work.

## Sidebar

![A sidebar of course.](./docs/Sidebar%20img-2.png)

You can use the sidebar on the left of the screen to edit the simulation. It's open by default. Use the "menu" checkbox on the top-right of the screen to toggle sidebar visibility. Options are listed below.

**NOTE:** The image may differ from the final result

### Simulation Info

- **gravity constant** — Changes the force applied on each atom to each other. Default is 0.1. 0 means no gravity, and a negative value means the atoms will repel away from each other

- **friction** — Cuuently a WIP. Is supposed to cause a friction when one body slides on top of another to prevet an extremely fast spinning body to have one chunk slide off. 0 means the sliding will immediately stop, and 1 means it's ice. More than 1 will cause it to break like anything

- **collision radius** — Sets the radius of an atom collision. It must be a number greater than zero. A number 0 means it possibly will collapse into a black hole. Maybe everything will be a black hole.

### Camera Info
what do you think you are? an idiot?

### Draw Type

- **draw type** — A dropdown menu that shows two options: "color" and "dyamic". The "color" mode is set as default

  - **color** — Sets the atoms color to the specified. If no color is given, then the atom will be rendered as black

  - **dynamic** — Coloring method is shown on the sidebar, but still, here's a brief explanation.

    - **black** — light & stationary
    - **blue** — heavy & stationary
    - **red** — light & moving
    - **magenta** — heavy & moving

- **outline** — Gives a white outline of the atoms to make it easier to see. On by default

- **trail** — Gives a trail tail to show the atom's current velocity. Off by default

- **trail multiplier** — Changes the length of the trail for easier view. 1 by default

