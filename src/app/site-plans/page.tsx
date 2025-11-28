"use client";

import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";

export default function SitePlansPage() {
  // In real implementation, you would fetch site plans from the database
  // For now, show empty state since demo mode is removed
  const sitePlans: never[] = [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-bold">My Site Plans</h1>
          <Link href="/site-plans/new">
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create New Site Plan
            </Button>
          </Link>
        </div>
      </div>

      {sitePlans.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-muted p-6">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No site plans yet</h3>
            <p className="text-muted-foreground max-w-md text-center">
              Get started by creating your first site plan
            </p>
            <Link href="/site-plans/new">
              <Button size="lg" className="mt-4">
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Site Plan
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
