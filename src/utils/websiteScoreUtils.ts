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
  const ui_ux = randomScore(55, 95);
  const speed = randomScore(55, 95);
  const seo = randomScore(55, 95);
  const total = Math.floor((ui_ux + speed + seo) / 3);
  
  return { ui_ux, speed, seo, total };
};
