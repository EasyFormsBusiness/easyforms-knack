## How to install this dependency:
Add the following to your dependencies:

`"easyforms-knack": "git+ssh://git@toolbox.easyforms.tech:easyforms/knack.git"`

Or enter the following command:

`npm i git+ssh://git@toolbox.easyforms.tech:easyforms/knack.git`

Note you will need to have your current user and your gitlab account hooked up 
via SSH to have it work

## How to use it:
1. Import the package: 
    - `const { Knack } = require('easyforms-knack')`
2. Create a new instance: 
    - `let knack = new Knack(key, id)`
3. Call methods!

__NB:__ if you are using a version of `npm` between 5.1 and 5.6 you may encounter 
a bug where every other module you install will remove this (and other git) 
modules. Upgrading `npm` to 5.7 or higher should fix this issue.