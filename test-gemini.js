// Simple script to test Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get API key from environment variable
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("ERROR: NEXT_PUBLIC_GEMINI_API_KEY is not set");
  process.exit(1);
}

console.log("API Key found:", API_KEY.substring(0, 10) + "...");

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini() {
  try {
    console.log("Testing Gemini API with model: gemini-1.5-pro");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = "Write a short greeting in 10 words or less";
    console.log("Sending prompt:", prompt);
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log("Response:", text);
    console.log("Test successful!");
  } catch (error) {
    console.error("ERROR:", error);
    
    // Let's also try with gemini-pro as a fallback
    try {
      console.log("\nTrying fallback with model: gemini-pro");
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = "Write a short greeting in 10 words or less";
      console.log("Sending fallback prompt:", prompt);
      
      const result = await fallbackModel.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      console.log("Fallback response:", text);
      console.log("Fallback test successful!");
    } catch (fallbackError) {
      console.error("FALLBACK ERROR:", fallbackError);
    }
  }
}

testGemini(); 