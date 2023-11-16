# e commerce

### usage

- `npm run dev` to start development server

### naming

- underscore(_) for naming files - example_file.ts
- PascalCase for naming tsx components - Example.tsx
- use single quotes(''), not double quotes(""), and not semi-colons ; - this has been configured with eslint anyway to autocorrect
- always use arrow functions, and export modularly(is that even a word?) -

```
export const MyComponent = () => {
    return(
        <Box>Hola Welt<Box>
    )
}
```

### types

- use interface definitions unless type definition is needed(union types etc.), interface types will be named with I at the start - IExample
- when extending types use extends keyword even though interfaces can be just reassigned with same name, I think it's better readability wise

### folder structure

- each component will live in it's own folder with a sperate file for types - for example `components/demo/Demo.tsx & demo_types.ts` etc.

### importing

- use module importing, prefer `import {example} from "example` rather than `import something from 'something'`
- when importing, import first react stuff/mantine stuff/our custom components/external library(I think I already broke with rule, maybe I'll try set up lint to do this for us) -

```
import {useEffect} from 'react';
import ReactDOM from 'react-dom';

import MantineButton from '@mantine/core/Button';

import {LoginForm} from "../components/LoginForm.tsx"

import axios from 'axios';

```


### stripe payment in local dev environment
To test and manage your Stripe integration from command line, install the Stripe CLI: 'https://stripe.com/docs/stripe-cli'

Than login and authenticate your Stripe user Account
- `stripe login` to connect with stripe in cmd

And test your webhook endpoint function 
To forward events to your local endpoint, run the following command with the the CLI to set up a local listener
- `stripe listen --forward-to localhost:3000/stripe/webhook` to call the local test endpoint
- `4242 4242 4242 4242` dummy credit card number