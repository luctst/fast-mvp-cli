<div align="center">
  <br>
  <br>
  <p>
    <b>fast-mvp-cli</b>
  </p>
  <p>
     <i>Create your new mvp with the help of fast-mvp repo template</i>
  </p>
  <p>

[![Build Status](https://travis-ci.com/luctst/fast-mvp-cli.svg?branch=master)](https://travis-ci.com/luctst/fast-mvp-cli)
[![NPM version](https://img.shields.io/npm/v/fast-mvp-cli?style=flat-square)](https://img.shields.io/npm/v/fast-mvp-cli?style=flat-square)
[![Package size](https://img.shields.io/bundlephobia/min/fast-mvp-cli)](https://img.shields.io/bundlephobia/min/fast-mvp-cli)
[![Dependencies](https://img.shields.io/david/luctst/fast-mvp-cli.svg?style=popout-square)](https://david-dm.org/luctst/fast-mvp-cli)
[![devDependencies Status](https://david-dm.org/luctst/fast-mvp-cli/dev-status.svg?style=flat-square)](https://david-dm.org/luctst/fast-mvp-cli?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/twitter/follow/luctstt.svg?label=Follow&style=social)](https://twitter.com/luctstt)

  </p>
</div>

---

## Why ?
Starting a project today is fastidious you must initiate repo, devtools, container, server etc...

This project tends to resolve this problem with one command you get:

* Repo created with [https://github.com/luctst/fast-mvp](https://github.com/luctst/fast-mvp) template.
* API with (nodejs, mongodb, mongoose, express) running on port `9229`.
* Web app with (vuejs, scss, vue-router, vuex) running on port `8080`.
* Redis instance running on port `6379`.
* Docker container with docker-compose to isolate all your services.

> **Note** - If your database is hosted with mongodb atlas you can run `bdd.sh` script who will create a dumb of your database in the mongodb container.

## What you need
You must have on your computer:

* Docker.
* MacOs operating system.
* vue-cli installed globally.
* Nodejs >= 12.0.0.

## Install 🐙
**Globally**
```
npm i -g fast-mvp-cli
```

**npx**
```
npx fast-mvp-cli
```
> Required npm >= 5.2


## Usage 💡
Run in your terminal app.
```
fast-mvp-cli
```

Once installed do not hesitate to read the README.md file then you can run in your new folder created `docker-compose up -d` that will create and start your containers.

> **Note** If you want use the `bdd.sh` script, you must create at the root `.env` file with `$DB_URL` variable who contains the endpoint of your mongodb atlas database, then replace all `<database>` by your database name.

## Contributing 🍰
Please make sure to read the [Contributing Guide](https://github.com/luctst/fast-mvp-cli/blob/main/.github/CONTRIBUTING.md) before making a pull request.

Thank you to all the people who already contributed to this project!

## Maintainers 👷
List of maintainers, replace all `href`, `src` attributes by your maintainers datas.
<table>
  <tr>
    <td align="center"><a href="https://lucastostee.now.sh/"><img src="https://avatars3.githubusercontent.com/u/22588842?s=460&v=4" width="100px;" alt="Tostee Lucas"/><br /><sub><b>Tostee Lucas</b></sub></a><br /><a href="#" title="Code">💻</a></td>
  </tr>
</table>

## License ⚖️
@MIT

---
<div align="center">
	<b>
		<a href="https://www.npmjs.com/package/get-good-readme">File generated with get-good-readme module</a>
	</b>
</div>
