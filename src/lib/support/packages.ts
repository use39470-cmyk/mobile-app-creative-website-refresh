export type ServicePackage = { name: string; price: number; service?: string; billing?: string };
export const packages: Record<string, ServicePackage> = {
  "starter": {
    "name": "Basic Animation Package",
    "price": 499
  },
  "professional": {
    "name": "Professional Animation Package",
    "price": 999
  },
  "premium": {
    "name": "Premium 2D & 3D Animation Package",
    "price": 1999
  },
  "mobile-app-starter": {
    "name": "Starter App Package",
    "service": "Mobile App",
    "price": 7500
  },
  "mobile-app-professional": {
    "name": "Professional App Package",
    "service": "Mobile App",
    "price": 15000
  },
  "mobile-app-premium": {
    "name": "Enterprise App Package",
    "service": "Mobile App",
    "price": 35000
  },
  "3d-website-design-starter": {
    "name": "Starter Website Package",
    "service": "3D Website Design",
    "price": 1500
  },
  "3d-website-design-professional": {
    "name": "Professional 3D Website Package",
    "service": "3D Website Design",
    "price": 4500
  },
  "3d-website-design-premium": {
    "name": "Premium Immersive Website Package",
    "service": "3D Website Design",
    "price": 12000
  },
  "video-production-starter": {
    "name": "Starter Video Package",
    "service": "Video Production",
    "price": 1500
  },
  "video-production-professional": {
    "name": "Professional Video Package",
    "service": "Video Production",
    "price": 4500
  },
  "video-production-premium": {
    "name": "Premium Campaign Package",
    "service": "Video Production",
    "price": 10000
  },
  "digital-marketing-starter": {
    "name": "Starter Marketing Package",
    "service": "Digital Marketing",
    "price": 1000,
    "billing": "month"
  },
  "digital-marketing-professional": {
    "name": "Growth Marketing Package",
    "service": "Digital Marketing",
    "price": 2500,
    "billing": "month"
  },
  "digital-marketing-premium": {
    "name": "Premium Marketing Package",
    "service": "Digital Marketing",
    "price": 5000,
    "billing": "month"
  },
  "paid-ads-starter": {
    "name": "Starter Ads Package",
    "service": "Paid Ads",
    "price": 750,
    "billing": "month"
  },
  "paid-ads-professional": {
    "name": "Professional Ads Package",
    "service": "Paid Ads",
    "price": 1500,
    "billing": "month"
  },
  "paid-ads-premium": {
    "name": "Premium Ads Package",
    "service": "Paid Ads",
    "price": 3500,
    "billing": "month"
  },
  "ai-automation-starter": {
    "name": "Starter Automation Package",
    "service": "AI Automation",
    "price": 2500
  },
  "ai-automation-professional": {
    "name": "Professional AI Package",
    "service": "AI Automation",
    "price": 6500
  },
  "ai-automation-premium": {
    "name": "Enterprise AI Package",
    "service": "AI Automation",
    "price": 15000
  }
};
export function resolvePackage(id: string | undefined) { return id && Object.hasOwn(packages, id) ? packages[id] : undefined; }
