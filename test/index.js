'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape')
var remark = require('remark')
var remarkGitHub = require('..')

var join = path.join
var read = fs.readFileSync
var readdir = fs.readdirSync

var root = join(__dirname, 'fixtures')

var fixtures = readdir(root)

test('remark-gitlab()', function (t) {
  t.equal(typeof remarkGitHub, 'function', 'should be a function')

  t.doesNotThrow(function () {
    remark().use(remarkGitHub).freeze()
  }, 'should not throw if not passed options')

  t.equal(
    gitlab('@wooorm'),
    '[**@wooorm**](https://gitlab.com/wooorm)\n',
    'should wrap mentions in `strong` by default'
  )

  t.equal(
    gitlab('@wooorm', {mentionStrong: false}),
    '[@wooorm](https://gitlab.com/wooorm)\n',
    'should support `mentionStrong: false`'
  )

  t.end()
})

test('Fixtures', function (t) {
  fixtures
    .filter(function (basename) {
      return basename.charAt(0) !== '.'
    })
    // .filter(function (basename) {
    //   return basename === 'sha-user-reloaded'
    // })
    .forEach(function (fixture) {
      var filepath = join(root, fixture)
      var output = read(join(filepath, 'output.md'), 'utf-8')
      var input = read(join(filepath, 'input.md'), 'utf-8')
      var result = gitlab(input, 'wooorm/remark')

      t.equal(result, output, 'should work on `' + fixture + '`')
      // Fs.writeFileSync(join(filepath, 'output.md'), result)
    })

  t.end()
})

// List of repo references possible in `package.json`s.
var repositories = [
  ['component/emitter', 'component', 'emitter'],
  ['https://gitlab.com/component/emitter', 'component', 'emitter'],
  ['git://gitlab.com/component/emitter.git', 'component', 'emitter'],
  [
    'https://gitlab.com/component/emitter/tarball',
    'component',
    'emitter'
  ],
  [
    'https://gitlab.com/component/emitter/zipball',
    'component',
    'emitter'
  ],
  [
    'https://codeload.gitlab.com/component/emitter/legacy.zip',
    'component',
    'emitter'
  ],
  [
    'https://codeload.gitlab.com/component/emitter/legacy.tar.gz',
    'component',
    'emitter'
  ],
  ['component/emitter#1', 'component', 'emitter'],
  ['component/emitter@1', 'component', 'emitter'],
  ['component/emitter#"1"', 'component', 'emitter'],
  ['component/emitter@"1"', 'component', 'emitter'],
  ['git://gitlab.com/component/emitter.git#1', 'component', 'emitter'],
  [
    'https://gitlab.com/component/emitter/tarball/1',
    'component',
    'emitter'
  ],
  [
    'https://gitlab.com/component/emitter/zipball/1',
    'component',
    'emitter'
  ],
  [
    'https://codeload.gitlab.com/component/emitter/legacy.zip/1',
    'component',
    'emitter'
  ],
  [
    'https://codeload.gitlab.com/component/emitter/legacy.tar.gz/1',
    'component',
    'emitter'
  ],
  [
    'https://gitlab.com/component/emitter/archive/1.tar.gz',
    'component',
    'emitter'
  ],
  ['mame/_', 'mame', '_'],
  ['gitlab/.gitignore', 'gitlab', '.gitignore'],
  ['gitlab/.gitc', 'gitlab', '.gitc'],
  ['Qix-/color-convert', 'Qix-', 'color-convert'],
  ['example/example.gitlab.io', 'example', 'example.gitlab.io']
]

test('Repositories', function (t) {
  repositories.forEach(function (repo) {
    var user = repo[1]
    var project = repo[2]

    repo = repo[0]

    if (project === '_') project = '\\_'

    t.equal(
      gitlab(
        [
          '*   SHA: a5c3785ed8d6a35868bc169f07e40e889087fd2e',
          '*   User@SHA: wooorm@a5c3785ed8d6a35868bc169f07e40e889087fd2e',
          '*   # Num: #26',
          '*   User#Num: wooorm#26',
          ''
        ].join('\n'),
        repo
      ),
      [
        '*   SHA: [`a5c3785`](https://gitlab.com/' +
          user +
          '/' +
          project +
          '/commit/a5c3785ed8d6a35868bc169f07e40e' +
          '889087fd2e)',
        '*   User@SHA: [wooorm@`a5c3785`](https://gitlab.com/wooorm/' +
          project +
          '/commit/a5c3785ed8d6a35868bc169f07e40e' +
          '889087fd2e)',
        '*   # Num: [#26](https://gitlab.com/' +
          user +
          '/' +
          project +
          '/issues/26)',
        '*   User#Num: [wooorm#26](https://gitlab.com/wooorm/' +
          project +
          '/issues/26)',
        ''
      ].join('\n'),
      'should work on `' + repo + '`'
    )
  })

  t.end()
})

test('Miscellaneous', function (t) {
  var original = process.cwd()

  t.equal(
    gitlab('test@12345678', null),
    '[test@`1234567`](https://gitlab.com/' +
      'test/remark-gitlab/commit/12345678)\n',
    'should load a `package.json` when available'
  )

  process.chdir(__dirname)

  t.equal(
    gitlab('12345678', null),
    '[`1234567`](https://gitlab.com/wooorm/remark/commit/12345678)\n',
    'should accept a `repository.url` in a `package.json`'
  )

  process.chdir(join(__dirname, 'fixtures'))

  t.throws(
    function () {
      gitlab('1234567', null)
    },
    /Missing `repository`/,
    'should throw without `repository`'
  )

  process.chdir(original)

  t.end()
})

// Shortcut to process.
function gitlab(value, repo) {
  var options

  options =
    typeof repo === 'string' || !repo ? {repository: repo || null} : repo

  return remark().use(remarkGitHub, options).processSync(value).toString()
}
