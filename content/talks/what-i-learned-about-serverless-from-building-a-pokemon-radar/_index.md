---
title: "What I learned about Serverless from building a Pokémon Radar"
description: "Build Serverless system with lambdas running in seven different parts of the world."
day: "19"
track: "B"
start: "15:00"
end: "15:35"
outputs:
- html
- calendar
---

In 2017 I had been playing Pokémon on and off for about a year and had a few left to catch! Though pokemon tracking maps helped, I wondered, what if THE pokemon I wanted popped up when I wasn't looking? So I set out to build a service that would send me push notifications every time there was an important pokemon around. I had a few constraints. Whatever I built had to:

- Be free: I have one rule with this game, and it's to _never_ spend money on it. Paying a cent to build this was off-limits.
- Be reliable: The goal of this service was to make sure I never missed a pokemon I cared about. That meant no downtime.
- Not overwhelm external dependencies
- Be performant

In this talk I share how I built this service: how, to meet those constraints, it went from a free Heroku app with a scheduler to a serverless system with lambdas running in 7 different parts of the world. We'll also go over how this experience shaped real-life decisions in my team at The Financial Times, where speed, reliability and cost play a big role in our architectural decisions.