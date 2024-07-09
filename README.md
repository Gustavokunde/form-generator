## Description
This project was created in order to show a Page Layout builder to create dynamic forms.

The structure is configured by using Nx with React.js in order to make a fast start with an already built good structure.

## Tools
- pnpm for package management
- NxJS for basic monorepo structure
- vite as the web application builder
- tailwind for styling
- fluent ui as the ui library
- react hook form + yup for form handler and validation

## Installation

First you need to have pnpm installed globally in the environment and then run

```bash
$ pnpm install
```


## Project structure

Our metadata has nested objects and arrays so it was separated based on levels

```json
    { // layout description level
        "label": "string", 
        "viewType": "string",
        "sections": [ // sections level
            {
                "name": "string",
                "rows": [{ // rows level
                        "fields": [ // columns fields level
                            {
                                "fieldType": "string",
                                "size": "string"
                            }
                        ]}
                ],
            },
        ],
  }
```

So in order to make it more readable, the forms were handled in each level

```bash
├── src
│   ├── app
│   │     ├── forms --> store each form handler
│   │     │     ├── LayoutDescriptionFormHandler --> layout description level form handler
│   │     │     ├── SectionFormHandler --> sections array fields level handler
│   │     │     ├── RowFormHandler --> rows array level handler
│   │     │     └── RowFieldsColumnFormHandler --> fields level form handler
│   │     │ 
│   │     ├── hooks --> metadata hook and validation
│   │     ├── interfaces --> metadata interfaces
│   │     └── pages
│   │     
│   ├── assets --> external services and controllers
│   │     
│   ├── components --> shared components
│   └── utils --> helper functions  (used to work with width size and options)
├── app.ts --> Pages content
├── main.ts --> main file
└── README.md
```
## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Start the application

Run `pnpm start` to start the development server.


## Challenges faced
First time working with fluent ui so I had to spend some time reading fluent ui documentation.
Also had to remember functionalities of React Hook Form as it has been some time that I don't use this tool.
Had to understand the business logic so I did some questions via email and watched the video presentation demo a hundred times.

## Future improvements

unit tests
api integration
better ui experience and design implementation
