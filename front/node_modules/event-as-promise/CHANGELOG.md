# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.5] - 2018-10-31
### Changed
- Instead of importing `p-defer` package, we copied the code in
   - `p-defer` package published to NPM is not ES5-compliant
   - Non ES5-compliant package will fail build for `create-react-app@1`

## [1.0.4] - 2018-10-08
### Changed
- Updated to `@babel/core@7.1.2` and `jest@23.6.0`
- Use `p-defer` for deferred implementation

## [1.0.3] - 2018-06-28
### Fixed
- fix: uglify in create-react-app failed because not ES5-compliant

## [1.0.2] - 2018-03-27
### Fixed
- fix: bound `upcoming()`

## [1.0.1] - 2018-03-27
### Added
- `upcoming()` for upcoming event, regardless of futures

## [1.0.0] - 2018-03-26
### Added
- First public release
