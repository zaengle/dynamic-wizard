# Dynamic Wizard
A craftcms reactjs dynamic wizard.

## Requirements
- A local LAMP/LEMP stack ([DDEV](./docs/ddev-local-development.md) recommended )

## Setup
1. Start docker instance `colima start`
2. Start ddev `ddev start`
3. Install composer packages `ddev composer install`
4. Import db `ddev import-db --src=dynamc-wizard.sql.zip`
5. Install npm packages `ddev npm install`
6. Run build for assets `ddev npm run watch`