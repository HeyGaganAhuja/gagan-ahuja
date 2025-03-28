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
  const total = Math.floor((ui_ux + speed + seo) / 3);
  
  return { ui_ux, speed, seo, total };
};
