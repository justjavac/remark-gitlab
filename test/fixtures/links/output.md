# GitHub Links

This document tests transformation of links into references.
The behaviour used on GitHub is very lacking. E.g., commit comments
are not actually rendered “properly”, the hash of the URL is literally
shown next to the reference. Another by GitHub unsupported feature is
references for issues, merge requests, or commits on different projects.

remark-gitlab does support all these systems and makes things look
pretty.

## Non-references

An empty link: [this and that]().

A link to GH:
<https://gitlab.com>

A link to a user:
<https://gitlab.com/foo>

A link to a project:
<https://gitlab.com/foo/bar>

A link to a graphs:
<https://gitlab.com/foo/bar/graphs>

A link to a traffic:
<https://gitlab.com/foo/bar/graphs/traffic>

## Commit

Commits (should not render):
<https://gitlab.com/wooorm/remark/commit/>

A too long commit (should not render):
<https://gitlab.com/wooorm/remark/commit/1f2a4fb8f88a0a98ea9d0c0522cd538a9898f921a>

A valid commit:
[`1f2a4fb`](https://gitlab.com/wooorm/remark/commit/1f2a4fb8f88a0a98ea9d0c0522cd538a9898f921)

A valid abbreviated commit:
[`1f2a`](https://gitlab.com/wooorm/remark/commit/1f2a)

A too short commit (should not render):
<https://gitlab.com/wooorm/remark/commit/1f2>

Across users:
[foo/remark@`1f2a`](https://gitlab.com/foo/remark/commit/1f2a)

Across repositories:
[foo/bar@`1f2a`](https://gitlab.com/foo/bar/commit/1f2a)

Same user, different repository:
[bar@`1f2a`](https://gitlab.com/wooorm/bar/commit/1f2a)

Too long repo
<https://gitlab.com/user/1231231231231231231231231231231231231231231231231231231231231231231231231231231231231231231231231231/commit/1f2a>

## Commit comments

A commit comment:
[`1f2a` (comment)](https://gitlab.com/wooorm/remark/commit/1f2a#commitcomment-12312312)

Not a comment (should not render comment part):
[`1f2a`](https://gitlab.com/wooorm/remark/commit/1f2a#)

Across users:
[foo/remark@`1f2a` (comment)](https://gitlab.com/foo/remark/commit/1f2a#commitcomment-12312312)

Across repositories:
[foo/bar@`1f2a` (comment)](https://gitlab.com/foo/bar/commit/1f2a#commitcomment-12312312)

Same user, different repository:
[bar@`1f2a` (comment)](https://gitlab.com/wooorm/bar/commit/1f2a#commitcomment-12312312)

## Issues

Issues (should not render):
<https://gitlab.com/wooorm/remark/issues/>

Pulls (should not render):
<https://gitlab.com/wooorm/remark/merge_requests/>

An issue:
[#2](https://gitlab.com/wooorm/remark/issues/2)

Not an issue, no HTTPS (should not render):
[#2](http://gitlab.com/wooorm/remark/issues/2)

A merge_requests:
[#2](https://gitlab.com/wooorm/remark/merge_requests/2)

Not a merge_requests, no HTTPS (should not render):
[#2](http://gitlab.com/wooorm/remark/merge_requests/2)

Issues across users:
[foo/remark#2](https://gitlab.com/foo/remark/issues/2)

Issues across repositories:
[foo/bar#2](https://gitlab.com/foo/bar/issues/2)

Issues on same user, different repository:
[bar#2](https://gitlab.com/wooorm/bar/issues/2)

Pulls across users:
[foo/remark#2](https://gitlab.com/foo/remark/merge_requests/2)

Pulls across repositories:
[foo/bar#2](https://gitlab.com/foo/bar/merge_requests/2)

Pull on same user, different repository:
[bar#2](https://gitlab.com/wooorm/bar/merge_requests/2)

Issue with non-digit:
<https://gitlab.com/wooorm/bar/issues/2a>

Pull with non-digit:
<https://gitlab.com/wooorm/bar/merge_requests/2a>

## Issue comments

Not a comment, no HTTPS (should not render):
[#2 (comment)](http://gitlab.com/wooorm/remark/issues/2#note-123123)

A commit comment:
[#2 (comment)](https://gitlab.com/wooorm/remark/issues/2#note-123123)

Not a comment (should not render comment part):
[#2](https://gitlab.com/wooorm/remark/issues/2#)

Issues comment across users:
[foo/remark#2 (comment)](https://gitlab.com/foo/remark/issues/2#note-123123)

Issues comment across repositories:
[foo/bar#2 (comment)](https://gitlab.com/foo/bar/issues/2#note-123123)

Issues comment on same user, different repository:
[bar#2 (comment)](https://gitlab.com/wooorm/bar/issues/2#note-123123)

Pull comment across users:
[foo/remark#2 (comment)](https://gitlab.com/foo/remark/merge_requests/2#note-123123)

Pull comment across repositories:
[foo/bar#2 (comment)](https://gitlab.com/foo/bar/merge_requests/2#note-123123)

Pull comment on same user, different repository:
[bar#2 (comment)](https://gitlab.com/wooorm/bar/issues/2#note-123123)

## Users

Users (should not render):
<https://gitlab.com/wooorm>
