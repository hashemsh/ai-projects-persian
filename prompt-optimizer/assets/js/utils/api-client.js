/**
 * Optional Direct AI LLM Call Handler
 */
export async function enhanceWithGemini(apiKey, promptText) {
  if (!apiKey) {
    throw new Error('کلید API وارد نشده است.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const systemInstruction = `You are an elite AI Prompt Engineer. The user will provide a draft or basic prompt in Persian.
Your task is to transform it into a world-class prompt with:
1. Clear System Persona & Capabilities
2. Detailed Context & Exact Objectives
3. Constraints & Negative Instructions
4. Clean Markdown structure.
Respond directly with the enhanced prompt only.`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `${systemInstruction}\n\nDraft Prompt:\n${promptText}` }]
      }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'خطا در ارتباط با سرور هوش مصنوعی');
  }

  const data = await response.json();
  const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!resultText) {
    throw new Error('پاسخی از مدل دریافت نشد.');
  }

  return resultText;
}
