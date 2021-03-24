# remark-gitlab

[![ci](https://github.com/justjavac/remark-gitlab/actions/workflows/ci.yml/badge.svg)](https://github.com/justjavac/remark-gitlab/actions/workflows/ci.yml)
[![Coverage][coverage-badge]][coverage]
[![npm][npm-badge]][npm-url]
[![Size][size-badge]][size]

[**remark**](https://github.com/remarkjs/remark) plugin to automatically
link references to commits, issues, merge-requests, and users, like in
gitlab issues, MRs, and comments.

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
*   Commit (repo): justjavac/remark-gitlab@e1aa9f6c02de18b9459b7d269712bcb50183ce89
*   Issue (`#`): #1
*   Issue (fork): foo#1
*   Issue (project): justjavac/remark-gitlab#1
*   Mention: @justjavac

Some links:

*   Commit: <https://gitlab.com/justjavac/remark-gitlab/commit/e1aa9f6c02de18b9459b7d269712bcb50183ce89>
*   Commit comment: <https://gitlab.com/justjavac/remark-gitlab/commit/ac63bc3abacf14cf08ca5e2d8f1f8e88a7b9015c#commitcomment-16372693>
*   Issue: <https://gitlab.com/justjavac/remark-gitlab/issues/182>
*   Issue: <https://gitlab.com/justjavac/remark-gitlab/issues/3#issue-151160339>
*   Mention: <https://gitlab.com/justjavac>
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

*   Commit: [`f808317`](https://gitlab.com/justjavac/remark-gitlab/commit/f8083175fe890cbf14f41d0a06e7aa35d4989587)
*   Commit (fork): [foo@`f808317`](https://gitlab.com/foo/remark-gitlab/commit/f8083175fe890cbf14f41d0a06e7aa35d4989587)
*   Commit (repo): [justjavac/remark@`e1aa9f6`](https://gitlab.com/justjavac/remark-gitlab/commit/e1aa9f6c02de18b9459b7d269712bcb50183ce89)
*   Issue (`#`): [#1](https://gitlab.com/justjavac/remark-gitlab/issues/1)
*   Issue (fork): [foo#1](https://gitlab.com/foo/remark-gitlab/issues/1)
*   Issue (project): [justjavac/remark#1](https://gitlab.com/justjavac/remark-gitlab/issues/1)
*   Mention: [**@justjavac**](https://gitlab.com/justjavac)

Some links:

*   Commit: [justjavac/remark@`e1aa9f6`](https://gitlab.com/justjavac/remark-gitlab/commit/e1aa9f6c02de18b9459b7d269712bcb50183ce89)
*   Commit comment: [justjavac/remark@`ac63bc3` (comment)](https://gitlab.com/justjavac/remark-gitlab/commit/ac63bc3abacf14cf08ca5e2d8f1f8e88a7b9015c#commitcomment-16372693)
*   Issue: [justjavac/remark#182](https://gitlab.com/justjavac/remark-gitlab/issues/182)
*   Issue comment: [#3 (comment)](https://gitlab.com/justjavac/remark-gitlab/issues/3#issue-151160339)
*   Mention: <https://gitlab.com/justjavac>
```

## API

### `remark.use(gitlab[, options])`

Automatically link references to commits, issues, merge-requests, and users,
like in gitlab issues, PRs, and comments.

###### Conversion

*   Commits:
    `f9c6cca3` → [`f9c6cca3`][sha]
*   Commits across forks:
    `justjavac@f9c6cca3` → [justjavac@`f9c6cca3`][sha]
*   Commits across projects:
    `user/project@f9c6cca3` → [user/project@`f9c6cca3`][sha]
*   Hash issues:
    `#1` → [#1][issue]
*   Issues across forks:
    `justjavac#1` → [justjavac#1][issue]
*   Issues across projects:
    `justjavac/remark-gitlab#1` → [justjavac#1][issue]
*   At-mentions:
    `@user` → [**[**@user**]**][mention]

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

## License

[remark-gitlab](https://github.com/justjavac/remark-gitlab) is released under
the MIT License.
See the bundled [LICENSE](./LICENSE) file for details.

[coverage-badge]: https://img.shields.io/codecov/c/github/justjavac/remark-gitlab.svg

[coverage]: https://codecov.io/github/justjavac/remark-gitlab

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-gitlab.svg

[size]: https://bundlephobia.com/result?p=remark-gitlab

[npm-badge]: https://img.shields.io/npm/v/remark-gitlab.svg

[npm-url]: https://npmjs.com/package/remark-gitlab

[sha]: https://gitlab.com/gitlab-org/gitlab/-/commit/f9c6cca3f9def676bea243be5c49498d6a9258fb

[issue]: https://gitlab.com/gitlab-org/gitlab/-/issues/1

[mention]: https://gitlab.com/justjavac
