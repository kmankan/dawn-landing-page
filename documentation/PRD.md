# Project Overview

## Composer Agent Demo

We need to create a component that demo's the Composer Agent functionality.

### Structure of the Demo Window

This will consist of a div taking up most of the screen width, with a fixed height. This div will contain agent boxes.

The agent boxes will each contain specific information about a given agent, its name, its price, its availability, its latency, and its trust.
The agents will be displayed in grid columns.

### Animation of the Demo Window

Adjacent columns will be both fading in and fading out vertically. One column will track downwards, while the adjacent column will track upwards. This will have the effect of introducing new agents while removing old ones from view.

### Query Input Modal

Underneath the agent boxes in the area where they have faded out there will be a query input modal where the user can input a query. This will auto-populate with a given string in a typed-out animation. And the composer selection process will initiate.

### Composer Selection Process

Three Agent Boxes will be selected. Scrolling of the Agent Box columns will stop and the selected Agent Boxes will outline and will fade to glow with borders and glow shadows. Every other modal will reduce opacity simultaneously.

### Composer Modal Appears

A composer modal will fade in. This will be a black rectangular box that will contain the three selected agent boxes that will move into place.
This will be three layers of z-index to stack layers. Columns of agent boxes, composer modal and three selected agent boxes

### Composer Modal

The three selected Agent Boxes will float into place. These can generically fit into the composer window as long as they are within the same vertical line and go from left to right. The grey vertical lines in between each Agent Box will fade in.

#### Scroll Action

Upon scrolling, each box slowly gets completed. This means the agent box opacity is reduced and check marks appear simultaneously. The vertical lines adjacent to the box will sequentially become orange and light up to show progress moving right. The same progress happens with the other two agent boxes.

#### Completion of the Composer Modal

When each box is completed, the notification bubble will slide in using a slight bounce effect. It will stay present for the same amount of time as a regular phone notification. This will be a Telegram-like notification.
