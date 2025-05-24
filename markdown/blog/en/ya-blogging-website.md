I've built three personal blogging websites so far—each one ended up being either too difficult to set up or too cumbersome to use. Hopefully, this next iteration will finally get it right.

# What Went Wrong with the Previous Iterations

First, the infrastructure was far too complex. They relied on a database, a WYSIWYG markdown editor, and even included an authentication workflow. Most of these were poorly implemented—slowing down development and eating up a lot of my time. Worse, these so-called "features" didn’t even add real value to the core purpose of a blog.

Then, I used a bizarre mix of technologies I had barely touched before. Not that these technologies were inherently bad—but combining advanced features with tools that had minimal community support made it feel like I was reinventing the wheel. In hindsight, it was more of a skill issue on my part. With the right experience, those features could definitely be implemented properly.

Hopefully with that experience. This project won't go fall to the same pitfalls that as the previous ones. 

# Goals, technologies, and limitation

As for the features, i will try to make it simple. Even if a feature ends up being somewhat complex, i'll try to make it robust and reliable. My goal is to have blogging website that can:

- Display blog post written in markdown files.
- Show the list of blog post in grid layout.
- Support 2 languages, which is English and Indonesian.

As for the technologies, i will choose [Deno Deploy](https://deno.com/deploy) as the primary way to host this project. This decision effectively locked me to deno ecosystem. Especially the [Deno](https://deno.com/) javascript runtime, while they claim that they support Node.js these days, I don't buy it and choose to play it safe by sticking to native tools. 

Beside the standard library they have, [Hono](https://hono.dev/) were the most reliable framework to use. It also works in different runtime - even in [cloudflare workers](https://workers.cloudflare.com/). Unlike the other frameworks that rely on templating engine like mustache, Hono is capable of rendering JSX and even support client side rendering (though i haven't be able to get CSR to works myself). This make Hono very pleasant to work with.

In the past, Deno had its own package registry and management system, which is awkward to use. The npm support were also poor in my experience. Things have been improved since they created another registry called [JSR](http://jsr.io/) that is a registry that aim to host package that works with any runtime. It also compatible with NPM packages, which pushes deno itself to maintain compability with NPM packages. I personally support this push of cross runtime library because as you know. We can't even track the count the number of javascript runtime by hand anymore.

With these core technologies in place, now the project finally has a clear direction: to be **easily portable to across diferent runtime**. Of course, this come with set of trade-off and limitation - But at the very least its give me solid guideline for what libraries and practices to adopt (or avoid). To support this goal, i've establised a few key rules:

1. Avoid using native node.js API.
2. Don't rely on filesystem access.
3. Only use JSR as package registry.

This give us indication to rely on build step and preprocessor approach. Which includes [tailwind](https://tailwindcss.com/) as our styling choice.

# The result

This entire website were the result of this approach. It might be not your usual blogging website but im happy with the current state. Besides, It is possible to add a few cool features in the future despite the unsual approach due that i know what actually happened under the hood.