
// Function to generate realistic-looking random scores
export const generateScores = (url: string) => {
  // Create a seed from the URL to keep results consistent
  let seed = 0;
  for (let i = 0; i < url.length; i++) {
    seed += url.charCodeAt(i);
  }
  
  // Generate scores between 55-95 to make them realistic
  const randomScore = (min: number, max: number) => {
    return Math.floor(((seed * (i++) * 9301 + 49297) % 233280) / 233280 * (max - min) + min);
  };
  
  let i = 1;
  
  // Domain factors that influence scores
  const hasDotCom = url.includes('.com');
  const hasDotOrg = url.includes('.org');
  const hasDotEdu = url.includes('.edu');
  const hasHttps = url.includes('https://');
  const domainLength = url.length;
  const isPopularSite = url.includes('google.') || 
                        url.includes('amazon.') || 
                        url.includes('facebook.') || 
                        url.includes('apple.');
  
  // Base scores with some intelligence based on domain
  let baseUiUx = 70 + (hasDotCom ? 5 : 0) + (hasDotOrg ? 3 : 0) + (hasDotEdu ? 7 : 0) + (isPopularSite ? 12 : 0);
  let baseSpeed = 65 + (hasHttps ? 8 : 0) + (domainLength < 15 ? 5 : 0) + (isPopularSite ? 10 : 0);
  let baseSeo = 60 + (hasDotCom ? 7 : 0) + (hasDotOrg ? 5 : 0) + (hasDotEdu ? 10 : 0) + (hasHttps ? 5 : 0) + (isPopularSite ? 15 : 0);
  
  // Add random variation while keeping scores in range
  const ui_ux = Math.min(95, Math.max(55, baseUiUx + randomScore(-10, 10)));
  const speed = Math.min(95, Math.max(55, baseSpeed + randomScore(-10, 10)));
  const seo = Math.min(95, Math.max(55, baseSeo + randomScore(-10, 10)));
  const total = Math.floor((ui_ux * 0.3 + speed * 0.4 + seo * 0.3)); // Weighted as per requirements
  
  // Generate detailed metrics for each category
  const uiUxMetrics = {
    mobileFriendliness: Math.min(100, Math.max(50, ui_ux + randomScore(-15, 15))),
    colorContrast: Math.min(100, Math.max(50, ui_ux + randomScore(-15, 15))),
    navigation: Math.min(100, Math.max(50, ui_ux + randomScore(-15, 15))),
    imageOptimization: Math.min(100, Math.max(50, ui_ux + randomScore(-15, 15))),
    interactiveElements: Math.min(100, Math.max(50, ui_ux + randomScore(-15, 15)))
  };
  
  const seoMetrics = {
    metaTags: Math.min(100, Math.max(50, seo + randomScore(-15, 15))),
    headingStructure: Math.min(100, Math.max(50, seo + randomScore(-15, 15))),
    keywordPresence: Math.min(100, Math.max(50, seo + randomScore(-15, 15))),
    robotsTxt: Math.min(100, Math.max(50, seo + randomScore(-15, 15))),
    linkStructure: Math.min(100, Math.max(50, seo + randomScore(-15, 15)))
  };
  
  const speedMetrics = {
    pageLoadTime: Math.min(100, Math.max(50, speed + randomScore(-15, 15))),
    imageCompression: Math.min(100, Math.max(50, speed + randomScore(-15, 15))),
    codeMinification: Math.min(100, Math.max(50, speed + randomScore(-15, 15))),
    serverResponseTime: Math.min(100, Math.max(50, speed + randomScore(-15, 15)))
  };
  
  return { 
    ui_ux, 
    speed, 
    seo, 
    total,
    metrics: {
      uiUx: uiUxMetrics,
      seo: seoMetrics,
      speed: speedMetrics
    } 
  };
};

// Generate improvement recommendations based on scores
export const generateRecommendations = (scores: any) => {
  const recommendations = {
    uiUx: [] as string[],
    seo: [] as string[],
    speed: [] as string[]
  };
  
  // UI/UX recommendations
  if (scores.metrics.uiUx.mobileFriendliness < 70) {
    recommendations.uiUx.push("Improve mobile responsiveness by using responsive design principles");
  }
  if (scores.metrics.uiUx.colorContrast < 70) {
    recommendations.uiUx.push("Enhance color contrast for better readability and accessibility");
  }
  if (scores.metrics.uiUx.navigation < 70) {
    recommendations.uiUx.push("Simplify navigation structure for better user experience");
  }
  if (scores.metrics.uiUx.imageOptimization < 70) {
    recommendations.uiUx.push("Optimize images for better display on various devices");
  }
  if (scores.metrics.uiUx.interactiveElements < 70) {
    recommendations.uiUx.push("Improve interactive elements for better engagement");
  }
  
  // SEO recommendations
  if (scores.metrics.seo.metaTags < 70) {
    recommendations.seo.push("Add proper meta tags including title, description, and keywords");
  }
  if (scores.metrics.seo.headingStructure < 70) {
    recommendations.seo.push("Implement proper heading structure (H1, H2, H3)");
  }
  if (scores.metrics.seo.keywordPresence < 70) {
    recommendations.seo.push("Enhance keyword usage in content without keyword stuffing");
  }
  if (scores.metrics.seo.robotsTxt < 70) {
    recommendations.seo.push("Create or optimize robots.txt file for search engine crawling");
  }
  if (scores.metrics.seo.linkStructure < 70) {
    recommendations.seo.push("Improve internal linking structure and add relevant external links");
  }
  
  // Speed recommendations
  if (scores.metrics.speed.pageLoadTime < 70) {
    recommendations.speed.push("Optimize page load time by reducing unnecessary resources");
  }
  if (scores.metrics.speed.imageCompression < 70) {
    recommendations.speed.push("Compress images further to reduce load time");
  }
  if (scores.metrics.speed.codeMinification < 70) {
    recommendations.speed.push("Minify CSS, JavaScript, and HTML code");
  }
  if (scores.metrics.speed.serverResponseTime < 70) {
    recommendations.speed.push("Improve server response time through caching or CDN");
  }
  
  return recommendations;
};
