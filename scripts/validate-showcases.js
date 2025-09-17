#!/usr/bin/env node

/**
 * Script to validate all showcase projects
 * Usage: npm run showcase:validate
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(process.cwd(), 'src', 'content', 'projects');

function validateProject(frontMatter, filename) {
  const errors = [];
  
  // Required fields
  if (!frontMatter.title?.trim()) errors.push("Title is required");
  if (!frontMatter.summary?.trim()) errors.push("Summary is required");
  if (!frontMatter.aiRole?.trim()) errors.push("AI Role is required");
  
  // Status validation
  if (!frontMatter.status || !["live", "wip"].includes(frontMatter.status)) {
    errors.push("Status must be 'live' or 'wip'");
  }
  
  // Tags validation
  if (!Array.isArray(frontMatter.tags) || frontMatter.tags.length === 0) {
    errors.push("At least one tag is required");
  } else {
    const validCategories = ["AI-built", "Tooling", "Infra", "Experiment"];
    const hasValidCategory = frontMatter.tags.some(tag => validCategories.includes(tag));
    if (!hasValidCategory) {
      errors.push(`Must include at least one category: ${validCategories.join(", ")}`);
    }
  }
  
  // Date validation (support both publishedAt and legacy date)
  const dateField = frontMatter.publishedAt || frontMatter.date;
  if (!dateField) {
    errors.push("publishedAt is required");
  } else {
    const date = new Date(dateField);
    if (isNaN(date.getTime())) {
      errors.push("publishedAt must be a valid date");
    }
  }
  
  // Links validation (optional but if present should be valid URLs)
  if (frontMatter.links) {
    Object.entries(frontMatter.links).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        try {
          new URL(value);
        } catch {
          errors.push(`${key} must be a valid URL`);
        }
      }
    });
  }
  
  // Metrics validation (optional but should be proper format)
  if (frontMatter.metrics) {
    if (frontMatter.metrics.stars && typeof frontMatter.metrics.stars !== 'number') {
      errors.push("metrics.stars must be a number");
    }
  }
  
  return errors;
}

function validateAllProjects() {
  if (!fs.existsSync(contentDir)) {
    console.error(`❌ Projects directory not found: ${contentDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'));
  
  if (files.length === 0) {
    console.log('⚠️  No project files found');
    return;
  }
  
  let totalErrors = 0;
  let validProjects = 0;
  
  console.log(`🔍 Validating ${files.length} showcase projects...\n`);
  
  files.forEach(filename => {
    const filePath = path.join(contentDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    try {
      const { data: frontMatter } = matter(fileContents);
      const errors = validateProject(frontMatter, filename);
      
      if (errors.length === 0) {
        console.log(`✅ ${filename} - Valid`);
        validProjects++;
      } else {
        console.log(`❌ ${filename} - ${errors.length} error(s):`);
        errors.forEach(error => console.log(`   • ${error}`));
        totalErrors += errors.length;
      }
    } catch (error) {
      console.log(`💥 ${filename} - Parse error: ${error.message}`);
      totalErrors++;
    }
  });
  
  console.log(`\n📊 Validation Summary:`);
  console.log(`   Valid projects: ${validProjects}/${files.length}`);
  console.log(`   Total errors: ${totalErrors}`);
  
  if (totalErrors > 0) {
    console.log(`\n❌ Found ${totalErrors} validation errors`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All projects are valid!`);
  }
}

validateAllProjects();