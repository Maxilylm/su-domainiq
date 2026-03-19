export async function POST(request: Request) {
  const { domain } = await request.json();

  if (!domain || typeof domain !== "string") {
    return Response.json({ error: "Domain name is required" }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const cleanDomain = domain.trim().toLowerCase();

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 2048,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                'You are an expert domain name appraiser with deep knowledge of domain aftermarket sales, SEO value, and branding. Estimate the market value of domain names. Return JSON: { "domain": string, "estimatedValue": { "low": number, "mid": number, "high": number, "currency": "USD" }, "grade": string (A+ to F), "factors": [{ "name": string, "score": number (1-10), "explanation": string }], "summary": string, "comparables": [{ "domain": string, "soldPrice": number, "year": number }], "suggestions": [string] }. Factors MUST include exactly these 6: Length, Brandability, Keyword Value, Extension, Memorability, Market Demand. Each score is 1-10. Comparables should be real or realistic domain sales. Suggestions should be actionable ways to maximize the domain\'s value.',
            },
            {
              role: "user",
              content: `Appraise this domain name: ${cleanDomain}`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      return Response.json(
        { error: "AI service error. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return Response.json(
        { error: "No response from AI" },
        { status: 502 }
      );
    }

    const valuation = JSON.parse(content);
    return Response.json(valuation);
  } catch (error) {
    console.error("Valuation error:", error);
    return Response.json(
      { error: "Failed to valuate domain. Please try again." },
      { status: 500 }
    );
  }
}
