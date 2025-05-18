# Introduction

Power Platform Javascript scripts (Client-side and Ribbon button) for **Sales Configuration** solution - **Sales Hub** Customization application.

Use `Dataverse REST Builder` from the `XrmToolBox` to build the Javascript script that calls the Custom Action. Use `namespace` is the best practice to run the script.

# Development Note

_Ordered from newest to oldest_

## 2025-05-01

The test version of the ribbon button script has the button on the ribbon of the homepage grid, so I used `selectedControlSelectedItemIds` and `selectedControl`. After receiving further instructions, the button has been moved to the ribbon of the record's main form, so the input arguments have been changed to `primaryControl` only.

Additionally, here are some tools you will also need to download:

- Plugin Registration Tool
- Early-bound Generator v2
- FetchXML Tool, I used ChatGPT to generate this.
