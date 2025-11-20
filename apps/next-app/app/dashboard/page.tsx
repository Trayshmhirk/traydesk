"use client";

import StatCard from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, FolderOpen, Loader, Users, Clock, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Mocked recent tickets
  const recentTickets = [
    { id: "TCK-234", title: "Server downtime on EU region", status: "open" },
    { id: "TCK-221", title: "UI glitch on mobile dashboard", status: "in_progress" },
    { id: "TCK-210", title: "Password reset issue resolved", status: "closed" },
    { id: "TCK-208", title: "Request for billing clarification", status: "open" },
    { id: "TCK-199", title: "Email notifications delay", status: "in_progress" },
  ];

  return (
    <div className="space-y-10">
      {/* Page Title */}
      <div>
        <h1 className="text-primary mb-2 text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground max-w-2xl">
          Get a quick overview of your team&apos;s performance and ticket statuses at a glance.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tickets"
          value="128"
          subtitle="Across all categories"
          icon={<BarChart3 className="text-primary size-6" />}
        />
        <StatCard
          title="Open Tickets"
          value="34"
          subtitle="Pending review"
          icon={<FolderOpen className="size-6 text-blue-500" />}
        />
        <StatCard
          title="In Progress"
          value="19"
          subtitle="Currently being handled"
          icon={<Loader className="size-6 text-amber-500" />}
        />
        <StatCard
          title="Closed"
          value="75"
          subtitle="Successfully resolved"
          icon={<CheckCircle className="size-6 text-green-500" />}
        />
      </div>

      {/* Secondary Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="bg-card border shadow-sm transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-primary text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border-border/50 flex items-start justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-foreground font-medium">{ticket.title}</p>
                  <p className="text-muted-foreground text-xs">{ticket.id}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                    ticket.status === "open"
                      ? "bg-blue-50 text-blue-600"
                      : ticket.status === "in_progress"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-green-50 text-green-600"
                  }`}
                >
                  {ticket.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card border shadow-sm transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-primary text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/tickets">
              <Button
                className="bg-primary w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                size="lg"
              >
                Create New Ticket
              </Button>
            </Link>

            <Button
              className="text-primary hover:bg-primary/10 w-full rounded-lg border bg-transparent px-4 py-2 text-sm font-medium transition"
              size="lg"
            >
              View All Tickets
            </Button>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="bg-card border shadow-sm transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-primary text-lg font-semibold">Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="text-primary h-4 w-4" />
                <span>Avg. Resolution Time</span>
              </div>
              <span className="text-foreground font-medium">2h 43m</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="text-primary h-4 w-4" />
                <span>Active Agents</span>
              </div>
              <span className="text-foreground font-medium">8</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="text-primary h-4 w-4" />
                <span>Customer Satisfaction</span>
              </div>
              <span className="text-foreground font-medium">94%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
