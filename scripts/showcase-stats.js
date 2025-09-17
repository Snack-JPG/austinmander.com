#!/usr/bin/env node

/**
 * Script to show portfolio showcase statistics
 * Usage: npm run showcase:stats
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(process.cwd(), 'src', 'content', 'projects');

function getProjectStats() {
  if (!fs.existsSync(contentDir)) {
    console.error(`❌ Projects directory not found: ${contentDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'));
  
  if (files.length === 0) {
    console.log('⚠️  No project files found');
    return;
  }
  
  const projects = [];
  const stats = {
    total: 0,
    live: 0,
    wip: 0,
    featured: 0,
    categories: {},
    totalUsers: 0,
    totalStars: 0,
    hasRevenue: 0,
  };
  
  files.forEach(filename => {
    const filePath = path.join(contentDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    try {
      const { data: frontMatter } = matter(fileContents);
      projects.push({ filename, frontMatter });
      
      stats.total++;
      
      if (frontMatter.status === 'live') stats.live++;
      if (frontMatter.status === 'wip') stats.wip++;
      if (frontMatter.featured) stats.featured++;
      
      // Count categories
      if (frontMatter.tags) {
        frontMatter.tags.forEach(tag => {
          if (['AI-built', 'Tooling', 'Infra', 'Experiment'].includes(tag)) {
            stats.categories[tag] = (stats.categories[tag] || 0) + 1;
          }
        });
      }
      
      // Count users
      if (frontMatter.metrics?.users) {
        const users = frontMatter.metrics.users;
        if (users && users !== 'N/A') {
          const numericUsers = parseInt(users.replace(/[^0-9]/g, ''), 10);
          if (!isNaN(numericUsers)) {
            stats.totalUsers += numericUsers;
          }
        }
      }
      
      // Count stars
      if (frontMatter.metrics?.stars && typeof frontMatter.metrics.stars === 'number') {
        stats.totalStars += frontMatter.metrics.stars;
      }
      
      // Count revenue projects
      if (frontMatter.metrics?.revenue && frontMatter.metrics.revenue !== 'N/A') {
        stats.hasRevenue++;
      }
      
    } catch (error) {
      console.log(`⚠️  Error parsing ${filename}: ${error.message}`);
    }
  });
  
  // Display stats
  console.log('📊 Portfolio Showcase Statistics\n');
  
  console.log('📋 Project Overview:');
  console.log(`   Total Projects: ${stats.total}`);
  console.log(`   Live Projects: ${stats.live}`);
  console.log(`   WIP Projects: ${stats.wip}`);
  console.log(`   Featured Projects: ${stats.featured}`);
  
  if (Object.keys(stats.categories).length > 0) {
    console.log('\n🏷️  Categories:');
    Object.entries(stats.categories)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count} projects`);
      });
  }
  
  console.log('\n📈 Impact Metrics:');
  if (stats.totalUsers > 0) {
    console.log(`   Total Users Served: ${stats.totalUsers.toLocaleString()}`);
  }
  if (stats.totalStars > 0) {
    console.log(`   Total GitHub Stars: ${stats.totalStars.toLocaleString()}`);
  }
  if (stats.hasRevenue > 0) {
    console.log(`   Projects with Revenue: ${stats.hasRevenue}`);
  }
  
  // Recent activity
  const recentProjects = projects
    .filter(p => p.frontMatter.publishedAt || p.frontMatter.date)
    .sort((a, b) => {
      const dateA = new Date(a.frontMatter.publishedAt || a.frontMatter.date);
      const dateB = new Date(b.frontMatter.publishedAt || b.frontMatter.date);
      return dateB - dateA;
    })
    .slice(0, 3);
  
  if (recentProjects.length > 0) {
    console.log('\n🕒 Recent Projects:');
    recentProjects.forEach(({ frontMatter }, index) => {
      const date = new Date(frontMatter.publishedAt || frontMatter.date);
      const dateStr = date.toLocaleDateString();
      const status = frontMatter.status === 'live' ? '🚀' : '🚧';
      console.log(`   ${index + 1}. ${status} ${frontMatter.title} (${dateStr})`);
    });
  }
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  if (stats.featured === 0) {
    console.log('   • Consider marking some projects as featured for homepage display');
  }
  if (stats.live < stats.total * 0.5) {
    console.log('   • Consider completing more WIP projects to increase live portfolio');
  }
  if (stats.totalUsers === 0) {
    console.log('   • Add user metrics to showcase project impact');
  }
  
  console.log('\n🛠️  Quick Actions:');
  console.log('   • Create new showcase: npm run showcase:new "Project Name"');
  console.log('   • Validate all projects: npm run showcase:validate');
}

getProjectStats();