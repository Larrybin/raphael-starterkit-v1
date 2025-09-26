import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SUBSCRIPTION_TIERS, CREDITS_TIERS } from "@/config/subscriptions";
import { createCheckoutSession } from "@/app/actions";

type Body = {
  productId?: string;
  productType?: string; // "subscription" | "credits" | custom labels like "chinese-name-credits"
  tierId?: string; // optional tier id to map from config
  quantity?: number; // optional credits quantity
  discountCode?: string;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as Body;

    // Resolve product type
    const normalizedType = (body.productType || "").toLowerCase();
    const isCredits =
      normalizedType === "credits" || normalizedType.includes("credits");
    const isSubscription = normalizedType === "subscription";

    // Prefer explicit productId if provided
    let productId = body.productId?.trim();
    let creditsAmount: number | undefined = undefined;

    if (!productId) {
      // Try to map by tierId from config
      if (body.tierId) {
        if (isCredits || !isSubscription) {
          const tier = CREDITS_TIERS.find((t) => t.id === body.tierId);
          if (tier) {
            productId = tier.productId;
            creditsAmount = tier.creditAmount;
          }
        } else if (isSubscription) {
          const tier = SUBSCRIPTION_TIERS.find((t) => t.id === body.tierId);
          if (tier) {
            productId = tier.productId;
          }
        }
      }

      // If still not found, pick a sensible default from config
      if (!productId) {
        if (isSubscription) {
          const tier =
            SUBSCRIPTION_TIERS.find((t) => t.featured) || SUBSCRIPTION_TIERS[0];
          productId = tier?.productId;
        } else {
          const tier = CREDITS_TIERS.find((t) => t.featured) || CREDITS_TIERS[0];
          productId = tier?.productId;
          creditsAmount = tier?.creditAmount;
        }
      }
    }

    if (!productId) {
      return NextResponse.json(
        {
          error:
            "Missing product mapping. Provide productId or configure tiers in config/subscriptions.ts.",
        },
        { status: 400 }
      );
    }

    // Determine final product type and credits amount
    const productType: "subscription" | "credits" = isSubscription
      ? "subscription"
      : "credits";
    if (productType === "credits") {
      // Allow request to override the credit amount if provided
      if (typeof body.quantity === "number" && body.quantity > 0) {
        creditsAmount = body.quantity;
      }
    }

    // Safety checks
    if (!user.email) {
      return NextResponse.json(
        { error: "User email not found for checkout" },
        { status: 400 }
      );
    }

    const checkoutUrl = await createCheckoutSession(
      productId,
      user.email,
      user.id,
      productType,
      creditsAmount,
      body.discountCode
    );

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Create checkout error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create checkout", details: message },
      { status: 500 }
    );
  }
}

