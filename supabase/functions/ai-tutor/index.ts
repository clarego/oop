import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CLAUDE_API_KEY = Deno.env.get("CLAUDE_API_KEY") ?? "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";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const systemPrompt = `You are an expert VCE Software Development teacher and OOP tutor for Victorian (Australian) Year 12 students. You help students understand Object-Oriented Programming concepts aligned with the VCAA VCE Applied Computing Study Design (2025–2028), Units 3 & 4.

Your responses should:
- Use VCAA-aligned terminology and correct technical language
- Be pitched at Year 12 VCE level — clear, encouraging, and accurate
- Include Python code examples when relevant (properly formatted in code blocks)
- Reference how concepts appear in VCE exams and assessments
- Use Australian English spelling (colour, organise, recognise, etc.)
- Be encouraging and supportive — students may be stressed about their studies
- Include VCAA pseudocode examples when explaining algorithms or class structures
- Keep responses concise but thorough — don't overwhelm students

When explaining OOP concepts, always:
1. Start with a clear VCAA-aligned definition
2. Give a relatable real-world analogy
3. Show a Python code example
4. Mention how it might appear in the VCE exam
5. Reference pseudocode if relevant`;

    let messages: { role: string; content: string }[];
    let currentTopic: string;

    if (Array.isArray(body.messages)) {
      messages = body.messages;
      currentTopic = body.currentTopic ?? "General OOP concepts";
    } else if (typeof body.message === "string") {
      const history = Array.isArray(body.history) ? body.history : [];
      messages = [...history, { role: "user", content: body.message }];
      currentTopic = body.moduleId ?? "General OOP concepts";
    } else {
      throw new Error("Invalid request: provide 'messages' array or 'message' string");
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1200,
        system: systemPrompt + `\n\nCurrent topic context: ${currentTopic}`,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.content?.[0]?.text) {
      throw new Error(data.error?.message ?? "Claude API error");
    }

    const aiMessage = data.content[0].text;

    return new Response(JSON.stringify({ message: aiMessage, reply: aiMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
