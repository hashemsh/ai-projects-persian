/**
 * Multi-Language Code Snippet Generator (< 200 lines)
 */

window.RegexCodeGenerator = (function() {
  function escapeQuotes(str) {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  function generate(lang, pattern, flags, testString = 'sample_text') {
    const safePat = escapeQuotes(pattern);
    const safeTest = escapeQuotes(testString.split('\n')[0] || 'sample');

    switch (lang) {
      case 'javascript':
        return `// JavaScript / Node.js
const regex = /${pattern}/${flags};
const text = "${safeTest}";

// 1. Test Match (Boolean)
const isMatch = regex.test(text);
console.log("Matched:", isMatch);

// 2. Extract All Matches
const matches = [...text.matchAll(regex)];
matches.forEach(m => console.log("Found:", m[0], "at index:", m.index));`;

      case 'typescript':
        return `// TypeScript
const regex: RegExp = /${pattern}/${flags};
const text: string = "${safeTest}";

const isMatch: boolean = regex.test(text);
const matches: RegExpMatchArray[] = [...text.matchAll(regex)];`;

      case 'python':
        const pyFlags = [];
        if (flags.includes('i')) pyFlags.push('re.IGNORECASE');
        if (flags.includes('m')) pyFlags.push('re.MULTILINE');
        if (flags.includes('s')) pyFlags.push('re.DOTALL');
        const flagArg = pyFlags.length ? `, ${pyFlags.join(' | ')}` : '';
        return `# Python 3
import re

pattern = r"${pattern}"
text = """${testString}"""

# 1. Search first match
match = re.search(pattern, text${flagArg})
if match:
    print("Match found:", match.group())

# 2. Find all matches
all_matches = re.findall(pattern, text${flagArg})
print("All matches:", all_matches)`;

      case 'php':
        return `<?php
// PHP (PCRE)
$pattern = '/${safePat}/${flags}';
$text = "${safeTest}";

// 1. Preg Match
if (preg_match($pattern, $text, $matches)) {
    echo "Found: " . $matches[0] . "\\n";
}

// 2. Preg Match All
preg_match_all($pattern, $text, $allMatches);
print_r($allMatches[0]);`;

      case 'csharp':
        return `// C# (.NET)
using System;
using System.Text.RegularExpressions;

string pattern = @"${pattern.replace(/"/g, '""')}";
string input = "${safeTest}";

RegexOptions options = RegexOptions.Compiled${flags.includes('i') ? ' | RegexOptions.IgnoreCase' : ''}${flags.includes('m') ? ' | RegexOptions.Multiline' : ''};
Match match = Regex.Match(input, pattern, options);

if (match.Success) {
    Console.WriteLine($"Found: {match.Value} at index {match.Index}");
}`;

      case 'java':
        return `// Java
import java.util.regex.*;

public class RegexTest {
    public static void main(String[] args) {
        String pattern = "${safePat}";
        String text = "${safeTest}";
        
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(text);
        
        while (m.find()) {
            System.out.println("Match: " + m.group() + " at " + m.start());
        }
    }
}`;

      case 'go':
        return `// Go (Golang)
package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(\`${pattern}\`)
    text := "${safeTest}"
    
    // Check match
    fmt.Println("Matched:", re.MatchString(text))
    
    // Find all
    matches := re.FindAllString(text, -1)
    fmt.Println("Matches:", matches)
}`;

      case 'cpp':
        return `// C++11 (std::regex)
#include <iostream>
#include <string>
#include <regex>

int main() {
    std::string text = "${safeTest}";
    std::regex pattern(R"(${pattern})");

    if (std::regex_search(text, pattern)) {
        std::cout << "Matched successfully!" << std::endl;
    }
    return 0;
}`;

      default:
        return `/${pattern}/${flags}`;
    }
  }

  return { generate };
})();
