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
