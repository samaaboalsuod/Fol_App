const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;

export const getAIResponse = async (messages) => {
  try {
    const systemPrompt = {
      role: 'system',
      content: 'أنت خبير في العناية بالنباتات وتصميم الحدائق لتطبيق "فل" (FolApp). مهمتك هي تقديم نصائح دقيقة ومفيدة حول الري، الإضاءة، التسميد، وحل مشاكل النباتات. يجب أن تكون إجاباتك باللغة العربية، ودودة، ومبسطة للمبتدئين.'
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://folapp.example.com",
        "X-OpenRouter-Title": "FolApp Plant Assistant",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemma-4-26b-a4b-it:free", // Reliable free model
        "messages": [systemPrompt, ...messages],
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch AI response');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
};
