@@ .. @@
   const handleWebSearch = () => {
     if (input.trim() && onWebSearch && !isLoading) {
       onWebSearch(input.trim());
       setInput('');
     }
   };

   const handleFunctionCall = () => {
     if (input.trim() && onFunctionCall && !isLoading) {
       // Simple function call parsing - in a real app, you'd have more sophisticated parsing
       const match = input.match(/^(\w+)\((.*)\)$/);
       if (match) {
         const functionName = match[1];
-        const args = match[2] ? JSON.parse(match[2]) : {};
+        try {
+          const args = match[2] ? JSON.parse(match[2]) : {};
+          onFunctionCall(functionName, args);
+        } catch (error) {
+          // If JSON parsing fails, treat as string argument
+          onFunctionCall(functionName, { query: match[2] });
+        }
-        onFunctionCall(functionName, args);
       } else {
         // Default function call
         onFunctionCall('demo_function', { query: input.trim() });
       }
       setInput('');
     }
   };