/**
 * Utility functions for handling JSON responses from LLMs
 */

export function cleanJsonResponse(response: string): string {
  // Remove markdown code blocks and extra whitespace
  let cleaned = response.trim();
  
  // Remove ```json at the start
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  }
  
  // Remove ``` at the start (in case it's just ```)
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  
  // Remove ``` at the end
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  
  // Additional cleaning for common LLM issues
  cleaned = cleaned.trim();
  
  // Fix common JSON issues
  cleaned = fixCommonJsonIssues(cleaned);
  
  return cleaned;
}

function fixCommonJsonIssues(jsonString: string): string {
  let fixed = jsonString;
  
  // Fix unescaped quotes in string values
  // This regex finds strings and escapes internal quotes
  fixed = fixed.replace(/"([^"]*)"(\s*:\s*)"([^"]*)"/g, (match, key, colon, value) => {
    // Escape any unescaped quotes in the value
    const escapedValue = value.replace(/(?<!\\)"/g, '\\"');
    return `"${key}"${colon}"${escapedValue}"`;
  });
  
  // Fix trailing commas
  fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
  
  // Fix missing commas between properties
  fixed = fixed.replace(/}(\s*)"([^"]+)":/g, '},$1"$2":');
  fixed = fixed.replace(/](\s*)"([^"]+)":/g, '],$1"$2":');
  
  return fixed;
}

export function parseJsonSafely<T>(jsonString: string): T {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(`❌ [JSON] Parse failed: ${(error as Error).message}`);
    console.error(`📝 [JSON] Problematic content: ${jsonString.substring(0, 200)}...`);
    
    // Try to fix and parse again
    try {
      console.log(`🔧 [JSON] Attempting to fix JSON...`);
      const fixed = attemptJsonFix(jsonString);
      const parsed = JSON.parse(fixed);
      console.log(`✅ [JSON] Successfully fixed and parsed JSON`);
      return parsed;
    } catch (fixError) {
      console.error(`❌ [JSON] Fix attempt failed: ${(fixError as Error).message}`);
      throw error; // Throw original error
    }
  }
}

function attemptJsonFix(jsonString: string): string {
  let fixed = jsonString;
  
  // More aggressive fixes
  // Remove any non-printable characters
  fixed = fixed.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  
  // Fix single quotes to double quotes (but be careful with contractions)
  fixed = fixed.replace(/'/g, '"');
  
  // Fix unescaped newlines in strings
  fixed = fixed.replace(/\n/g, '\\n');
  fixed = fixed.replace(/\r/g, '\\r');
  fixed = fixed.replace(/\t/g, '\\t');
  
  // Try to balance braces and brackets
  const openBraces = (fixed.match(/{/g) || []).length;
  const closeBraces = (fixed.match(/}/g) || []).length;
  const openBrackets = (fixed.match(/\[/g) || []).length;
  const closeBrackets = (fixed.match(/]/g) || []).length;
  
  // Add missing closing braces
  for (let i = 0; i < openBraces - closeBraces; i++) {
    fixed += '}';
  }
  
  // Add missing closing brackets
  for (let i = 0; i < openBrackets - closeBrackets; i++) {
    fixed += ']';
  }
  
  return fixed;
}