"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SitePlanDetailPage() {
  // In real implementation, you would fetch the site plan from the database
  // using params.id and the database connection
  // For now, always show not found since demo mode is removed

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Site Plan Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The site plan you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/site-plans">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </Link>
      </div>
    </div>
  );
}
