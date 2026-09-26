export const PATTERNS = [
  {
    id: 'ROLE-001',
    label: 'Role override / persona hijack',
    severity: 'high',
    regex: /\b(you are now|forget (you are|your instructions)|act as (if )?(you|a)|pretend (to be|you are)|from now on you are)\b/i,
    description: 'Attempts to replace the model\'s assigned role or persona with a new one, bypassing original instructions.',
    fixSuggestion: 'Add an explicit instruction that the system role cannot be reassigned by user input.',
  },
  {
    id: 'ROLE-002',
    label: 'DAN-style jailbreak',
    severity: 'high',
    regex: /\b(DAN|do anything now|jailbroken?|no restrictions|without (any )?limitations|unfiltered (mode|version))\b/i,
    description: 'References a known jailbreak persona designed to remove safety constraints.',
    fixSuggestion: 'Filter for known jailbreak persona names before passing input to the model.',
  },
  {
    id: 'INST-001',
    label: 'Instruction override',
    severity: 'high',
    regex: /\b(ignore (all |the )?(previous|prior|above) (instructions?|rules?|prompts?)|disregard (previous|prior|above)|override (your|the) (instructions?|rules?))\b/i,
    description: 'Directly instructs the model to discard its original system instructions.',
    fixSuggestion: 'Place system instructions after user input in the prompt structure.',
  },
  {
    id: 'DELIM-001',
    label: 'Delimiter / injection break-out',
    severity: 'medium',
    regex: /(```|"""|<\|.*?\|>|\[\[.*?\]\]|###\s*(system|instruction))/i,
    description: 'Uses fake delimiters or special tokens to trick the model into treating injected text as a new system block.',
    fixSuggestion: 'Strip or escape delimiter-like sequences from user input.',
  },
  {
    id: 'EXFIL-001',
    label: 'System prompt exfiltration',
    severity: 'medium',
    regex: /\b(repeat|reveal|print|show|output) (your|the) (system prompt|instructions|initial prompt)\b/i,
    description: 'Attempts to get the model to leak its own system prompt.',
    fixSuggestion: 'Add an explicit instruction never to repeat the system prompt.',
  },
  {
    id: 'EXFIL-002',
    label: 'Encoding / obfuscation bypass',
    severity: 'medium',
    regex: /\b(base64|rot13|reverse the string|decode this|hex decode)\b/i,
    description: 'Uses an encoding trick to smuggle instructions past naive filters.',
    fixSuggestion: 'Decode and re-scan any encoded payload before it reaches the model.',
  },
  {
    id: 'AUTH-001',
    label: 'False authority claim',
    severity: 'medium',
    regex: /\b(as (an? )?(admin|developer|system administrator)|i (am|have) (root|admin|elevated) (access|permission)|this is (a |an )?(authorized|official) (request|override))\b/i,
    description: 'Claims elevated authority to convince the model to bypass restrictions.',
    fixSuggestion: 'Never grant elevated behavior based on claims made in user text.',
  },
  {
    id: 'HYPO-001',
    label: 'Hypothetical / fictional framing bypass',
    severity: 'low',
    regex: /\b(hypothetically|in a fictional (world|story)|for a (novel|movie|screenplay) i'?m writing|purely (theoretical|academic))\b/i,
    description: 'Wraps a disallowed request in fictional framing to lower the model\'s guard.',
    fixSuggestion: 'Apply the same content policy regardless of fictional framing.',
  },
];

export function severityWeight(sev) {
  return { low: 1, medium: 2, high: 3 }[sev] ?? 0;
}