import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    const { term, context } = await req.json();

    if (!term || typeof term !== "string" || term.trim().length === 0) {
      return new Response(JSON.stringify({ error: "term is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("CLAUDE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "CLAUDE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are an expert VCE Software Development teacher explaining OOP concepts to Year 11/12 students in Australia. Give clear, concise explanations. Always respond ONLY with a valid JSON object — no markdown, no code blocks, no additional text before or after the JSON.`;

    const userPrompt = `Explain this term or concept for a VCE Software Development student: "${term.trim()}"${context ? `\n\nContext where it appeared: "${context}"` : ""}

Respond with ONLY this JSON object (no other text):
{
  "explanation": "2-3 sentence plain English VCAA-aligned explanation",
  "analogy": "A real-world analogy that makes it click",
  "code_example": "A short Python code snippet (4-8 lines max, no markdown formatting)",
  "exam_tip": "One key VCAA exam tip about this concept"
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 700,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      throw new Error("Could not reach AI service. Please try again.");
    }

    const data = await response.json();
    const raw: string = data.content?.[0]?.text ?? "";

    if (!raw) {
      throw new Error("No explanation available. Please try again.");
    }

    let parsed: Record<string, string>;
    try {
      const stripped = raw
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();

      if (stripped.startsWith("{")) {
        parsed = JSON.parse(stripped);
      } else {
        const jsonMatch = stripped.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          parsed = {
            explanation: raw.trim(),
            analogy: "",
            code_example: "",
            exam_tip: "",
          };
        }
      }
    } catch {
      parsed = {
        explanation: raw.trim(),
        analogy: "",
        code_example: "",
        exam_tip: "",
      };
    }

    const result = {
      explanation: (parsed.explanation || "").trim(),
      analogy: (parsed.analogy || "").trim(),
      code_example: (parsed.code_example || "").trim(),
      exam_tip: (parsed.exam_tip || "").trim(),
    };

    if (!result.explanation) {
      throw new Error("No explanation in response");
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
