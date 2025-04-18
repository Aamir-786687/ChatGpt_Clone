import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const PRIMARY_MODEL = "llama-3.3-70b-versatile";
const FALLBACK_MODEL = "llama-3.3-8b-instant";

export const sendMessage = async (message, useFallback = false) => {
  try {
    const selectedModel = useFallback ? FALLBACK_MODEL : PRIMARY_MODEL;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: selectedModel,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (
      error.response?.data?.error?.message?.includes("decommissioned") ||
      error.response?.status === 404
    ) {
      console.warn(
        `Model ${useFallback ? FALLBACK_MODEL : PRIMARY_MODEL} failed, retrying with fallback...`
      );
      if (!useFallback) {
        return await sendMessage(message, true);
      }
    }

    console.error("Groq API Error:", error.response?.data || error.message);
    return `Groq Error: ${
      error.response?.data?.error?.message || "Something went wrong"
    }`;
  }
};
