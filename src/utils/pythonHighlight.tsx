type TokenType =
  | 'keyword' | 'string' | 'comment' | 'number'
  | 'function' | 'class-name' | 'builtin' | 'self'
  | 'operator' | 'decorator' | 'plain' | 'param';

export const VS: Record<TokenType, string> = {
  keyword:      '#C586C0',
  string:       '#CE9178',
  comment:      '#6A9955',
  number:       '#B5CEA8',
  function:     '#DCDCAA',
  'class-name': '#4EC9B0',
  builtin:      '#DCDCAA',
  self:         '#9CDCFE',
  param:        '#9CDCFE',
  operator:     '#D4D4D4',
  decorator:    '#DCDCAA',
  plain:        '#D4D4D4',
};

const KEYWORDS = new Set([
  'False','None','True','and','as','assert','async','await','break',
  'class','continue','def','del','elif','else','except','finally',
  'for','from','global','if','import','in','is','lambda','nonlocal',
  'not','or','pass','raise','return','try','while','with','yield',
]);

const BUILTINS = new Set([
  'print','len','range','list','dict','set','tuple','str','int','float',
  'bool','type','isinstance','issubclass','super','object','input','open',
  'enumerate','zip','map','filter','sorted','reversed','abs','max','min',
  'sum','round','repr','id','hex','bin','oct','chr','ord','hash','dir',
  'vars','getattr','setattr','hasattr','callable','iter','next','any','all',
]);

interface Token { type: TokenType; text: string }

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let afterDef = false;
  let afterClass = false;

  while (i < code.length) {
    if ((code[i] === '"' || code[i] === "'") && code.slice(i, i + 3) === code[i].repeat(3)) {
      const q = code.slice(i, i + 3);
      const end = code.indexOf(q, i + 3);
      const text = end === -1 ? code.slice(i) : code.slice(i, end + 3);
      tokens.push({ type: 'string', text });
      i += text.length;
      afterDef = afterClass = false;
      continue;
    }
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q && code[j] !== '\n') {
        if (code[j] === '\\') j++;
        j++;
      }
      tokens.push({ type: 'string', text: code.slice(i, j + 1) });
      i = j + 1;
      afterDef = afterClass = false;
      continue;
    }
    if (code[i] === '#') {
      const end = code.indexOf('\n', i);
      const text = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ type: 'comment', text });
      i += text.length;
      afterDef = afterClass = false;
      continue;
    }
    if (code[i] === '@') {
      const m = code.slice(i).match(/^@[\w.]+/);
      if (m) {
        tokens.push({ type: 'decorator', text: m[0] });
        i += m[0].length;
        continue;
      }
    }
    if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i - 1]))) {
      const m = code.slice(i).match(/^\d+(\.\d+)?([eE][+-]?\d+)?/);
      if (m) {
        tokens.push({ type: 'number', text: m[0] });
        i += m[0].length;
        continue;
      }
    }
    const wm = code.slice(i).match(/^[a-zA-Z_]\w*/);
    if (wm) {
      const word = wm[0];
      i += word.length;
      if (afterDef) {
        tokens.push({ type: 'function', text: word });
        afterDef = false;
      } else if (afterClass) {
        tokens.push({ type: 'class-name', text: word });
        afterClass = false;
      } else if (word === 'self' || word === 'cls') {
        tokens.push({ type: 'self', text: word });
      } else if (KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', text: word });
        if (word === 'def') afterDef = true;
        if (word === 'class') afterClass = true;
      } else if (BUILTINS.has(word)) {
        tokens.push({ type: 'builtin', text: word });
      } else {
        tokens.push({ type: 'plain', text: word });
      }
      continue;
    }
    const opM = code.slice(i).match(/^[+\-*/%=<>!&|^~:,.;()[\]{}]+/);
    if (opM) {
      tokens.push({ type: 'operator', text: opM[0] });
      i += opM[0].length;
      afterDef = afterClass = false;
      continue;
    }
    tokens.push({ type: 'plain', text: code[i] });
    i++;
  }
  return tokens;
}

export function highlightPython(code: string): React.ReactNode[] {
  const tokens = tokenize(code);
  return tokens.map((tok, idx) => (
    <span key={idx} style={{ color: VS[tok.type] }}>{tok.text}</span>
  ));
}
