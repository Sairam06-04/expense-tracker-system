import axios from 'axios';

// 1. Paste your API Key here!
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY;

export const analyzeExpensesWithAI = async (fileData, fileType) => {
  const prompt = `
    Analyze this bank statement/transaction list. 
    
    1. Calculate Total Income (credits/deposits).
    2. Calculate Total Expenses (debits/withdrawals).
    3. Calculate Savings (Income - Expenses).
    4. Group expenses into maximum 5 major categories for a donut chart.
    5. Count the Total Number of Transactions (both in and out).
    6. Identify the Largest Single Expense (give me the name and the amount).
    7. Group the spending by Payment Method (e.g., UPI, Bank Transfer, Credit Card, Cash) for a bar chart.
    
    You MUST respond ONLY with a valid JSON object in this exact format:
    {
      "metrics": {
        "income": 5000,
        "expenses": 3000,
        "savings": 2000,
        "totalTransactions": 45,
        "largestExpense": {"name": "Apple Store", "amount": 1200}
      },
      "recommendation": "A 2 sentence financial tip based on these specific habits.",
      "chartData": [
        {"name": "Category Name", "value": 100}
      ],
      "paymentData": [
        {"name": "UPI", "value": 800}
      ]
    }
  `;

  const parts = [{ text: prompt }];

  if (fileType === 'pdf') {
    parts.push({
      inlineData: { mimeType: "application/pdf", data: fileData }
    });
  } else {
    parts.push({ text: `\n\nHere is the data:\n${fileData}` });
  }

  try {
    const response = await axios.post(API_URL, {
      contents: [{ parts: parts }]
    });

    const aiText = response.data.candidates[0].content.parts[0].text;
    const cleanJsonString = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJsonString);

  } catch (error) {
    console.error("Error talking to AI:", error);
    return null; 
  }
};