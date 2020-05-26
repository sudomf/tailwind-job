# Tailwind UI Fullstack Position

https://hiremayke.netlify.app


Hi. This is my way to show my interest in the job position and some of my skills to you guys.

As I don't have much time available, I made a simple website using TaiwindCSS, AlpineJS and a static page compiler that handles components, expressions, and html and css optimizations.

I made this to show that I really like and know how to build development tools and components. I did it from zero in 13 hours according to wakatime.


## Getting Started

You can play with it at https://codesandbox.io/.

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

All components should be at `src/components`. You just need to create a file with `.html`extenssion.

Example:

```html
<!-- src/components/card.html -->

<div class="bg-white p-5 rounded-lg shadow-md {{ ctx.class }}">
  {{ ctx.children }}
</div>
```

To use a component, you just need to call it with `c-` prefix in any another html file.

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

I made a very simple template language using double curly brace. You can pass any valid JavaScript beetween `{{ }}`.

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

I really hope that you guys will apreciate this simple project. If you give me a chance, I can show a lot of more things that I can do. I really belive that I can help you with all that awesome comming features and tools of Tailwind UI.

Take care folks. Good luck for us. See ya :)




