#!/usr/bin/env node

/**
 * Rebranding script: Compiel → Compiel
 * This script updates all references throughout the codebase
 */

const fs = require('fs');
const path = require('path');

const replacements = [
  // Package names
  { from: /@compiel\//g, to: '@compiel/' },
  { from: /@comp\//g, to: '@compiel/' },

  // Display names
  { from: /Compiel/g, to: 'Compiel' },
  { from: /Compiel/g, to: 'Compiel' },
  { from: /compiel/g, to: 'compiel' },

  // URLs and domains
  { from: /compiel/g, to: 'compiel' },
  { from: /comp\.ai/g, to: 'compiel.com' },
];

// Files and directories to exclude
const excludePatterns = [
  'node_modules',
  '.next',
  '.turbo',
  'dist',
  'build',
  '.git',
  'scripts/rebrand-to-compiel.js', // Don't modify this script itself
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => filePath.includes(pattern));
}

function isTextFile(filePath) {
  const textExtensions = [
    '.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.mdx',
    '.txt', '.yml', '.yaml', '.prisma', '.sql', '.env',
    '.html', '.css', '.scss', '.config.ts', '.config.js',
    '.mjs', '.cjs', '.gitignore', 'Dockerfile'
  ];

  return textExtensions.some(ext => filePath.endsWith(ext)) ||
    path.basename(filePath) === 'Dockerfile' ||
    path.basename(filePath) === 'README' ||
    path.basename(filePath) === 'CONTRIBUTING' ||
    path.basename(filePath) === 'CHANGELOG';
}

function processFile(filePath) {
  if (!isTextFile(filePath)) {
    return { processed: false };
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let changesCount = 0;

    // Apply all replacements
    replacements.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        changesCount += matches.length;
        content = content.replace(from, to);
      }
    });

    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { processed: true, changes: changesCount };
    }

    return { processed: false };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { processed: false, error: true };
  }
}

function walkDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);

    if (shouldExclude(filePath)) {
      return;
    }

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDirectory(filePath, results);
    } else {
      results.push(filePath);
    }
  });

  return results;
}

function main() {
  console.log('🚀 Starting rebranding from "Compiel" to "Compiel"...\n');

  const rootDir = path.join(__dirname, '..');
  const allFiles = walkDirectory(rootDir);

  let processedCount = 0;
  let totalChanges = 0;
  let errorCount = 0;

  allFiles.forEach(file => {
    const result = processFile(file);
    if (result.processed) {
      processedCount++;
      totalChanges += result.changes || 0;
      console.log(`✓ ${path.relative(rootDir, file)} (${result.changes} changes)`);
    }
    if (result.error) {
      errorCount++;
    }
  });

  console.log(`\n✨ Rebranding complete!`);
  console.log(`   Files processed: ${processedCount}`);
  console.log(`   Total changes: ${totalChanges}`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount}`);
  }

  console.log('\n📝 Next steps:');
  console.log('   1. Review the changes with: git diff');
  console.log('   2. Test the build: bun run build');
  console.log('   3. Run tests: bun run test');
  console.log('   4. Commit the changes: git commit -am "rebrand: Compiel → Compiel"');
}

main();
