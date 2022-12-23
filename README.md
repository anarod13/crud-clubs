# Crud-clubs

Crud clubs is an English Football Clubs CRUD API that allows you to edit, delete or add teams to file system. It is built in Node.js with Express and Typescript, uses filesystem to keep record and is tested with Vitest

You can access to it [here] (https://crud-clubs-api.onrender.com)
Or you can see it fully deploy with an interface here [Premier League UI](https://premier-league-crud.onrender.com)

If instead you wanna run it locally, take a look at the following instructions

## How to run it

<table>
    <thead>
        <tr>
            <th>npm run</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>build&&dev</td>
        <td>Runs the app in dev mode</td>
    </tr>
    <tr>
        <td>test</td>
        <td>Runs Vitest tests</td>
    </tr>
    </tbody>
</table>


## Folder structure

    ├── src           # Source files
      ├── data        # Teams info and crests images
      ├── entities    # Interfaces and classes
      ├── helpers     # Helpers as data base helper
      ├── mappers     # Mappers
      ├── services    # Service of crud-clubs-aṕi
      app.ts          # Endpoints and express implementation  
