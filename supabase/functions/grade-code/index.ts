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
    const { code, challengeId, challengeDescription, expectedBehavior, hints } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        system: `You are an expert VCE Software Development teacher grading Python OOP code for Victorian (Australian) Year 12 students. You grade according to the VCAA VCE Applied Computing Study Design (2025). Be encouraging but accurate. Always relate feedback to VCAA exam expectations. Use Australian English spelling.

When grading, assess:
1. Correct use of OOP principles (classes, objects, attributes, methods, constructors, inheritance, encapsulation, abstraction)
2. Proper Python syntax and conventions (PEP 8 naming, docstrings)
3. Whether the code meets the challenge requirements
4. Use of appropriate naming conventions (as per VCAA: meaningful names, consistent style)
5. Internal documentation (comments explaining functionality)

Respond ONLY with raw JSON — no markdown, no code fences, no explanation. Just the JSON object:
{"score":<number 0-100>,"passed":<boolean>,"feedback":"<detailed encouraging feedback>","improvements":["<improvement 1>","<improvement 2>"],"vcaa_tip":"<a specific tip about how this concept appears in the VCE exam>","pseudocode_connection":"<how this code would look in VCAA pseudocode format>"}`,
        messages: [
          {
            role: "user",
            content: `Grade this Python code for the following challenge:

CHALLENGE: ${challengeDescription}
EXPECTED BEHAVIOR: ${expectedBehavior}
HINTS: ${hints}

STUDENT CODE:
\`\`\`python
${code}
\`\`\`

Respond with raw JSON only.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.content?.[0]?.text) {
      throw new Error(data.error?.message ?? "Claude API error");
    }

    let raw = data.content[0].text.trim();
    const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fence) raw = fence[1].trim();

    return new Response(raw, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
