# Tailwind UI Fullstack Position

https://hiremayke.netlify.app


Hi folks. This is my way to show my interest in the job position and some of my skills to you guys.

As I don't have much time available, I made a simple website using TaiwindCSS, AlpineJS, and a static page compiler that handles components, expressions, HTML, and CSS optimizations.

I made this to show that I like and I know how to build development tools and components. I did it from zero in 13 hours according to Wakatime.


## Getting Started

You can play with it at https://codesandbox.io/s/priceless-violet-jl5li.

#### Commands

Development:

```bash
yarn dev
```

Build Production

```bash
build:production
```

#### How to create and use a component

All components should be at `src/components`. You just need to create a file with `.html` extension.

Example:

```html
<!-- src/components/card.html -->

<div class="bg-white p-5 rounded-lg shadow-md {{ ctx.class }}">
  {{ ctx.children }}
</div>
```

To use a component, you just need to call it with `c-` prefix in any other HTML file.

Example:


```html
<!-- src/components/home.html -->

<div>
  <h1>Home Page</h1>

  <c-card class="my-8">
    My awesome content
  </c-card>
</div>
```

#### The template language

I made a very simple template language using the double curly brace. You can pass any valid JavaScript between `{{ }}`.

Example:

```html
<ul>
  {{ [1, 2, 3].map(i => `<li>Item ${i}</li>`) }}
</ul>
```

Result:

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```


#### Component props

You can access a component prop using the special keyword `ctx` as you can see in the card component in the example above. You can forward the component body content using `ctx.children`.

#### Final words

I really hope that you guys will appreciate this simple project. If you give me a chance, I can show you a lot more things that I can do. I really believe that I can help you with all those awesome coming features and tools of Tailwind UI.

Take care. Good luck to us. See ya :)
