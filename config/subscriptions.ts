import { ProductTier } from "@/types/subscriptions";

export const SUBSCRIPTION_TIERS: ProductTier[] = [
  {
    name: "Starter",
    id: "tier-hobby",
    productId: "prod_69mvcFolFoEov7DpBe6GwL", // $11 monthly subscription
    priceMonthly: "$11",
    description: "Perfect for individual developers and small projects.",
    features: [
      "Global authentication system",
      "Database integration",
      "Secure API routes",
      "Modern UI components",
      "Dark/Light mode",
      "Community forum access",
    ],
    featured: false,
    discountCode: "", // Optional discount code
  },
  {
    name: "Business",
    id: "tier-pro",
    productId: "prod_4EqFWtdtdhTujzZqyK4ab7", // $29 monthly subscription (测试产品)
    priceMonthly: "$29",
    description: "Ideal for growing businesses and development teams.",
    features: [
      "Everything in Starter",
      "Multi-currency payments",
      "Priority support",
      "Advanced analytics",
      "Custom branding options",
      "API usage dashboard",
    ],
    featured: true,
    discountCode: "", // Optional discount code - 临时移除
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    productId: "prod_5DujXQmWCPA9ePifaCZ47G", // $99 monthly subscription
    priceMonthly: "$99",
    description: "For large organizations with advanced requirements.",
    features: [
      "Everything in Business",
      "Dedicated account manager",
      "Custom implementation support",
      "High-volume transaction processing",
      "Advanced security features",
      "Service Level Agreement (SLA)",
    ],
    featured: false,
    discountCode: "", // Optional discount code
  },
];

export const CREDITS_TIERS: ProductTier[] = [
  {
    name: "Basic Package",
    id: "tier-3-credits",
    productId: "prod_7foku98IYiVVBLak0biXZw", // $9 one-time purchase
    priceMonthly: "$9",
    description: "3 credits for testing and small-scale projects.",
    creditAmount: 3,
    features: [
      "3 credits for use across all features",
      "No expiration date",
      "Access to standard features",
      "Community support"
    ],
    featured: false,
    discountCode: "", // Optional discount code
  },
  {
    name: "Standard Package",
    id: "tier-6-credits",
    productId: "prod_7EF8T3CBj5BqhUaF6M0KAS", // $13 one-time purchase
    priceMonthly: "$13",
    description: "6 credits for medium-sized applications.",
    creditAmount: 6,
    features: [
      "6 credits for use across all features",
      "No expiration date",
      "Priority processing",
      "Basic email support"
    ],
    featured: true,
    discountCode: "", // Optional discount code
  },
  {
    name: "Premium Package",
    id: "tier-9-credits",
    productId: "prod_7Vns2Qo4Ij4E94IcPcCCd9", // $29 one-time purchase
    priceMonthly: "$29",
    description: "9 credits for larger applications and production use.",
    creditAmount: 9,
    features: [
      "9 credits for use across all features",
      "No expiration date",
      "Premium support",
      "Advanced analytics access"
    ],
    featured: false,
    discountCode: "", // Optional discount code
  },
];
