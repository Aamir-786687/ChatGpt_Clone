// src/utils/openaiAPI.js
export const fetchOpenAIResponse = async (userMessage) => {
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    const endpoint = 'https://api.openai.com/v1/chat/completions';
  
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // or 'gpt-4'
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
        }),
      });
  
      const data = await res.json();
      return data?.choices?.[0]?.message?.content?.trim() || "No response from OpenAI";
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return "Error fetching response from OpenAI";
    }
  };
  