// Demo images for documentation examples
// Using a single reliable image for all examples

const SINGLE_IMAGE = "https://images.unsplash.com/photo-1741145018917-216c9275bc3a?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export const demoImages = {
  // All examples use the same image
  primary: SINGLE_IMAGE,
  secondary: SINGLE_IMAGE,
  avatar: SINGLE_IMAGE,
  background: SINGLE_IMAGE,
  
  // Different sizes of the same image
  small: SINGLE_IMAGE + "&w=400&h=400",
  medium: SINGLE_IMAGE + "&w=800&h=600", 
  large: SINGLE_IMAGE + "&w=1200&h=800",
  
  // Different aspect ratios of the same image
  square: SINGLE_IMAGE + "&w=400&h=400",
  landscape: SINGLE_IMAGE + "&w=800&h=600",
  portrait: SINGLE_IMAGE + "&w=600&h=800",
}

/**
 * Get demo image by ID
 */
export function getDemoImage(id: keyof typeof demoImages): string {
  return demoImages[id];
}

/**
 * Get all available demo images
 */
export function getAllDemoImages(): string[] {
  return Object.values(demoImages);
}

/**
 * Get random demo image
 */
export function getRandomDemoImage(): string {
  return SINGLE_IMAGE;
} 