const handleWebSearch = useCallback(async (query: string) => {
    if (!query.trim() || isLoading) return;

    // Add user message with just the query
    const userMessage = addMessage({
      role: 'user',
      content: query,
    });

    // Create assistant message for streaming response
    const assistantMessage = addMessage({
      role: 'assistant',
      content: '',
      metadata: { 
        model: 'web-search',
        source: 'search'
      },
    });

     try {
      let assistantContent = '';
       const searchResult = await webSearch(query);
       
      // Update the assistant message with the search result
      setMessages((prev: Message[]) => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: searchResult }
            : msg
        )
      );

       // Deduct credits for web search
       setCredits(Math.max(0, credits - 2));
     } catch (error) {
       console.error('Error performing web search:', error);
      // Update the assistant message with error
      setMessages((prev: Message[]) => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: `I encountered an issue with the web search. Please try again or check your backend server connection.` }
            : msg
        )
      );
     }
   }, [isLoading, addMessage, webSearch, setCredits, credits, setMessages]);

   const handleFunctionCall = useCallback(async (functionName: string, args: any) => {
     if (isLoading) return;

    // Add user message with just the function call
    const userMessage = addMessage({
       role: 'user',
      content: `${functionName}(${JSON.stringify(args)})`,
     });

    // Create assistant message for response
    const assistantMessage = addMessage({
      role: 'assistant',
      content: '',
      metadata: { 
        model: 'function-call',
        functionName: functionName
      },
    });

     try {
       const result = await callFunction(functionName, args);
       
      // Update the assistant message with the result
      setMessages((prev: Message[]) => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: result }
            : msg
        )
      );

       // Deduct credits for function calls
       setCredits(Math.max(0, credits - 1));
     } catch (error) {
       console.error('Error calling function:', error);
      // Update the assistant message with error
      setMessages((prev: Message[]) => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: `I encountered an issue executing the function. Please try again or check your backend server connection.` }
            : msg
        )
      );
     }
   }, [isLoading, addMessage, callFunction, setCredits, credits, setMessages]);