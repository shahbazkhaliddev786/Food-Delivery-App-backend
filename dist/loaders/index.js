import expressLoader from "./express.js";
export default async function ({ app }) {
    await expressLoader({ app });
}
// - The purpose of using express loaders is to modularize and organize 
//   the setup of your Express application. This approach promotes 
//   separation of concerns, making the application more maintainable 
//   and easier to manage.
//   1. Modular
//   2. Reusable
//   3. Maintenance
//   4. Scalability
//# sourceMappingURL=index.js.map