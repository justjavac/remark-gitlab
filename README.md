# remark-gitlab

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[**remark**](https://github.com/remarkjs/remark) plugin to automatically link references to commits, issues,
merge-requests, and users, like in gitlab issues, MRs, and comments.

## Install

```sh
npm install remark-gitlab
```

## Use

Say we have the following file, `example.md`:

```markdown
Some references:

*   Commit: f8083175fe890cbf14f41d0a06e7aa35d4989587
*   Commit (fork): foo@f8083175fe890cbf14f41d0a06e7aa35d4989587
*   Commit (repo): remarkjs/remark@e1aa9f6c02de18b9459b7d269712bcb50183ce89
*   Issue or PR (`#`): #1
*   Issue or PR (`GH-`): GH-1
*   Issue or PR (fork): foo#1
*   Issue or PR (project): remarkjs/remark#1
*   Mention: @wooorm

Some links:

*   Commit: <https://gitlab.com/remarkjs/remark/commit/e1aa9f6c02de18b9459b7d269712bcb50183ce89>
*   Commit comment: <https://gitlab.com/remarkjs/remark/commit/ac63bc3abacf14cf08ca5e2d8f1f8e88a7b9015c#commitcomment-16372693>
*   Issue or PR: <https://gitlab.com/remarkjs/remark/issues/182>
*   Issue or PR comment: <https://gitlab.com/remarkjs/remark-gitlab/issues/3#issue-151160339>
*   Mention: <https://gitlab.com/ben-eb>
```

And our script, `example.js`, looks as follows:

```js
var vfile = require('to-vfile')
var remark = require('remark')
var gitlab = require('remark-gitlab')

remark()
  .use(gitlab)
  .process(vfile.readSync('example.md'), function (err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
Some references:

*   Commit: [`f808317`](https://gitlab.com/remarkjs/remark-gitlab/commit/f8083175fe890cbf14f41d0a06e7aa35d4989587)
*   Commit (fork): [foo@`f808317`](https://gitlab.com/foo/remark-gitlab/commit/f8083175fe890cbf14f41d0a06e7aa35d4989587)
*   Commit (repo): [remarkjs/remark@`e1aa9f6`](https://gitlab.com/remarkjs/remark/commit/e1aa9f6c02de18b9459b7d269712bcb50183ce89)
*   Issue or PR (`#`): [#1](https://gitlab.com/remarkjs/remark-gitlab/issues/1)
*   Issue or PR (`GH-`): [GH-1](https://gitlab.com/remarkjs/remark-gitlab/issues/1)
*   Issue or PR (fork): [foo#1](https://gitlab.com/foo/remark-gitlab/issues/1)
*   Issue or PR (project): [remarkjs/remark#1](https://gitlab.com/remarkjs/remark/issues/1)
*   Mention: [**@wooorm**](https://gitlab.com/wooorm)

Some links:

*   Commit: [remarkjs/remark@`e1aa9f6`](https://gitlab.com/remarkjs/remark/commit/e1aa9f6c02de18b9459b7d269712bcb50183ce89)
*   Commit comment: [remarkjs/remark@`ac63bc3` (comment)](https://gitlab.com/remarkjs/remark/commit/ac63bc3abacf14cf08ca5e2d8f1f8e88a7b9015c#commitcomment-16372693)
*   Issue or PR: [remarkjs/remark#182](https://gitlab.com/remarkjs/remark/issues/182)
*   Issue or PR comment: [#3 (comment)](https://gitlab.com/remarkjs/remark-gitlab/issues/3#issue-151160339)
*   Mention: <https://gitlab.com/ben-eb>
```

## API

### `remark.use(gitlab[, options])`

Automatically link references to commits, issues, pull-requests, and users, like
in gitlab issues, PRs, and comments.

###### Conversion

*   Commits:
    `1f2a4fb` → [`1f2a4fb`][sha]
*   Commits across forks:
    `remarkjs@1f2a4fb` → [remarkjs@`1f2a4fb`][sha]
*   Commits across projects:
    `remarkjs/remark-gitlab@1f2a4fb` → [remarkjs/remark-gitlab@`1f2a4fb`][sha]
*   Prefix issues:
    `GH-1` → [GH-1][issue]
*   Hash issues:
    `#1` → [#1][issue]
*   Issues across forks:
    `remarkjs#1` → [remarkjs#1][issue]
*   Issues across projects:
    `remarkjs/remark-gitlab#1` → [remarkjs/remark-gitlab#1][issue]
*   At-mentions:
    `@wooorm` → [**@wooorm**][mention]

###### Repository

These links are generated relative to a project.
In Node this is detected automatically by loading `package.json` and looking for
a `repository` field.
In the browser, or when overwriting this, you can pass a `repository` in
`options`.
The value of `repository` should be a URL to a gitlab repository, such as
`'https://gitlab.com/user/project.git'`, or only `'user/project'`.

###### Mentions

By default, mentions are wrapped in `strong` nodes (that render to `<strong>` in
HTML), to simulate the look of mentions on gitlab.
However, this creates different HTML markup, as the gitlab site applies these
styles using CSS.
Pass `mentionStrong: false` to turn off this behavior.

## Security

Use of `remark-gitlab` does not involve [**rehype**][rehype] ([**hast**][hast]).
It does inject links based on user content, but those links only go to gitlab.
There are no openings for [cross-site scripting (XSS)][xss] attacks.

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.gitlab`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-gitlab/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-gitlab/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-gitlab.svg

[coverage]: https://codecov.io/github/remarkjs/remark-gitlab

[downloads-badge]: https://img.shields.io/npm/dm/remark-gitlab.svg

[downloads]: https://www.npmjs.com/package/remark-gitlab

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-gitlab.svg

[size]: https://bundlephobia.com/result?p=remark-gitlab
