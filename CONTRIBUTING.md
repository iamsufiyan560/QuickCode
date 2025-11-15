# Contributing

Contributions are welcome! To contribute:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature/your-feature`).

3. Go to `components/ui/` and locate the component file. If the component is not yet built, write the component code in this directory.

4. In `components/ui/examples/`, create a file with the component name suffixed with `Example` (e.g., `ButtonExample.tsx`). Write example usage of the component and wrap it in the `SnippetPreview` component, as shown below:

   ```tsx
   "use client";

   import React from "react";
   import { Button } from "@/components/ui/Button";
   import { SnippetPreview } from "@/components/helpers/SnippetPreview";

   export const DefaultButtonExample = () => {
     const defaultButtonCode = `
      import { Button } from "@/components/ui/Button";
   
      export const DefaultButtonExample = () => {
        return <Button>Default Button</Button>;
      };
      `;

     return (
       <SnippetPreview title="Default Button" code={defaultButtonCode}>
         <Button>Default Button</Button>
       </SnippetPreview>
     );
   };
   ```

5. In `docs/<component-name>/page.mdx`, write detailed steps on how to use the component and provide example usage instructions (without including code directly in the MDX file).

6. Updating the Component Map

After creating your component file (e.g., `Checkbox.tsx`), add an entry to the `component-map.js` in your project:

```js
Checkbox: {
  url: `${BASE_URL}Checkbox.tsx`,
  deps: {},
  requires: ["Label"],
}
```

- `url`: Points to the file location in your repo.
- `deps`: List npm packages if needed (empty if none or used framer or lucide-react).
- `requires`: List other components that this component depends on.
- `hooks`: Include if your component uses custom hooks.

7. Make your changes and commit (`git commit -m 'Add your feature'`).

8. Push to the branch (`git push origin feature/your-feature`).

9. Open a pull request.

Please ensure your code follows the existing style, includes TypeScript types, and adheres to the project's structure.
