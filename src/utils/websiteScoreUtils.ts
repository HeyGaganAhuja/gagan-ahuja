// Function to generate realistic-looking random scores
export const generateScores = (url: string) => {
  // Create a seed from the URL to keep results consistent
  let seed = 0;
  for (let i = 0; i < url.length; i++) {
    seed += url.charCodeAt(i);
  }
  
  // Generate scores between 50-95 to make them realistic
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
  // Adjusted to make good sites score 90+ and poor sites in the 50-60 range
  let baseUiUx = 65 + (hasDotCom ? 5 : 0) + (hasDotOrg ? 3 : 0) + (hasDotEdu ? 10 : 0) + (isPopularSite ? 20 : 0);
  let baseSpeed = 60 + (hasHttps ? 8 : 0) + (domainLength < 15 ? 5 : 0) + (isPopularSite ? 20 : 0);
  let baseSeo = 55 + (hasDotCom ? 7 : 0) + (hasDotOrg ? 5 : 0) + (hasDotEdu ? 15 : 0) + (hasHttps ? 5 : 0) + (isPopularSite ? 20 : 0);
  
  // Add random variation while keeping scores in range
  const ui_ux = Math.min(98, Math.max(50, baseUiUx + randomScore(-8, 8)));
  const speed = Math.min(98, Math.max(50, baseSpeed + randomScore(-8, 8)));
  const seo = Math.min(98, Math.max(50, baseSeo + randomScore(-8, 8)));
  
  // Calculate total score with weighted formula
  const total = Math.floor((ui_ux * 0.3 + speed * 0.4 + seo * 0.3)); 
  
  // Generate detailed metrics for each category
  const uiUxMetrics = {
    mobileFriendliness: Math.min(100, Math.max(50, ui_ux + randomScore(-12, 12))),
    colorContrast: Math.min(100, Math.max(50, ui_ux + randomScore(-12, 12))),
    navigation: Math.min(100, Math.max(50, ui_ux + randomScore(-12, 12))),
    imageOptimization: Math.min(100, Math.max(50, ui_ux + randomScore(-12, 12))),
    interactiveElements: Math.min(100, Math.max(50, ui_ux + randomScore(-12, 12)))
  };
  
  const seoMetrics = {
    metaTags: Math.min(100, Math.max(50, seo + randomScore(-12, 12))),
    headingStructure: Math.min(100, Math.max(50, seo + randomScore(-12, 12))),
    keywordPresence: Math.min(100, Math.max(50, seo + randomScore(-12, 12))),
    robotsTxt: Math.min(100, Math.max(50, seo + randomScore(-12, 12))),
    linkStructure: Math.min(100, Math.max(50, seo + randomScore(-12, 12)))
  };
  
  const speedMetrics = {
    pageLoadTime: Math.min(100, Math.max(50, speed + randomScore(-12, 12))),
    imageCompression: Math.min(100, Math.max(50, speed + randomScore(-12, 12))),
    codeMinification: Math.min(100, Math.max(50, speed + randomScore(-12, 12))),
    serverResponseTime: Math.min(100, Math.max(50, speed + randomScore(-12, 12)))
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
  if ((scores.metrics?.uiUx?.mobileFriendliness || 0) < 80) {
    recommendations.uiUx.push("Improve mobile responsiveness by using responsive design principles and ensuring all elements adapt to different screen sizes.");
  }
  if ((scores.metrics?.uiUx?.colorContrast || 0) < 80) {
    recommendations.uiUx.push("Enhance color contrast for better readability and accessibility, especially for text elements against background colors.");
  }
  if ((scores.metrics?.uiUx?.navigation || 0) < 80) {
    recommendations.uiUx.push("Simplify navigation structure for better user experience and make important pages accessible within 3 clicks.");
  }
  if ((scores.metrics?.uiUx?.imageOptimization || 0) < 80) {
    recommendations.uiUx.push("Optimize images for better display on various devices and resolutions without losing quality.");
  }
  if ((scores.metrics?.uiUx?.interactiveElements || 0) < 80) {
    recommendations.uiUx.push("Improve interactive elements with better hover states, focus indicators, and feedback mechanisms.");
  }
  
  // SEO recommendations
  if ((scores.metrics?.seo?.metaTags || 0) < 80) {
    recommendations.seo.push("Add proper meta tags including title, description, and keywords that accurately describe your content.");
  }
  if ((scores.metrics?.seo?.headingStructure || 0) < 80) {
    recommendations.seo.push("Implement proper heading structure (H1, H2, H3) to organize content and help search engines understand page hierarchy.");
  }
  if ((scores.metrics?.seo?.keywordPresence || 0) < 80) {
    recommendations.seo.push("Enhance keyword usage in content strategically without resorting to keyword stuffing.");
  }
  if ((scores.metrics?.seo?.robotsTxt || 0) < 80) {
    recommendations.seo.push("Create or optimize robots.txt file for search engine crawling and consider implementing a sitemap.");
  }
  if ((scores.metrics?.seo?.linkStructure || 0) < 80) {
    recommendations.seo.push("Improve internal linking structure and add relevant external links to increase authority and relevance.");
  }
  
  // Speed recommendations
  if ((scores.metrics?.speed?.pageLoadTime || 0) < 80) {
    recommendations.speed.push("Optimize page load time by reducing unnecessary resources and leveraging browser caching.");
  }
  if ((scores.metrics?.speed?.imageCompression || 0) < 80) {
    recommendations.speed.push("Compress images further to reduce load time while maintaining visual quality.");
  }
  if ((scores.metrics?.speed?.codeMinification || 0) < 80) {
    recommendations.speed.push("Minify CSS, JavaScript, and HTML code to reduce file sizes and speed up loading times.");
  }
  if ((scores.metrics?.speed?.serverResponseTime || 0) < 80) {
    recommendations.speed.push("Improve server response time through caching, using a CDN, or upgrading hosting infrastructure.");
  }
  
  return recommendations;
};
