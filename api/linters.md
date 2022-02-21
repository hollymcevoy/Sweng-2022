The following JSON files are linting configurations for the application. 
- tslint.json
- .prettierrc

Linting code configuration is a way that you can enforce a style standard across code. 
These include things like the use of "" vs '', line wrapping, use of functions etc. 

Rules for TsLint can be found [here](https://palantir.github.io/tslint/rules/)

tslint.json uses the majority of the typescript linting rules using tsLint
TsLint is no longer maintained but should still function. 
Migration to ESlint with typescript parsing is ideal. 

Prettier is an additional code format that does things like wrapping. 
The tslint-config-prettier plugin handles conflicts. 
Rules for prettier config can be found [here](https://github.com/prettier/tslint-config-prettier)

