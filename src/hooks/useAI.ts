@@ .. @@
   const webSearch = useCallback(async (query: string) => {
     setIsLoading(true);

     try {
       // Demo mode when no API key or not in Chrome extension
       if (!config.apiKey || typeof chrome === 'undefined' || !chrome.runtime) {
        return `⚡ **Function Executed: ${functionName}**

Arguments: ${JSON.stringify(args, null, 2)}

Result: Function executed successfully in demo mode.

*In the full implementation, this would execute real functions with your backend server.*`;
+        return `Here are the search results for your query:
+
+🔍 **Search Results**
+
+Based on the search for "${query}", here's what I found:
+
+• **Result 1**: Relevant information about ${query}
+• **Result 2**: Additional details and context
+• **Result 3**: Related reso
       }
       )
     }
   }
   )urces and links
+
+*This is a demo search response. In the full implementation, this would connect to real search APIs to provide current, accurate information from the web.*`;
       }

       const response = await fetch('http://localhost:3000/web-search', {