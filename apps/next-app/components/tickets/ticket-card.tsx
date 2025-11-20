"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Eye } from "lucide-react";
import Link from "next/link";
import type { Ticket } from "@/lib/mock-tickets";

export default function TicketCard({
  ticket,
  onDelete,
}: {
  ticket: Ticket;
  onDelete?: (id: string) => void;
}) {
  return (
    <Card className="bg-card border transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-4">
          <div>
            <div className="text-foreground font-semibold">{ticket.title}</div>
            <div className="text-muted-foreground text-xs">{ticket.id}</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                ticket.status === "open"
                  ? "default"
                  : ticket.status === "in_progress"
                    ? "secondary"
                    : "outline"
              }
            >
              {ticket.status.replace("_", " ")}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-3 text-sm">{ticket.description}</p>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/tickets/${ticket.id}/view`} className="ml-auto">
            <Button size="sm" variant="outline" asChild>
              <a className="flex items-center gap-2">
                <Eye className="size-4" />
                View
              </a>
            </Button>
          </Link>
          <Link href={`/dashboard/tickets/${ticket.id}`}>
            <Button size="sm" variant="ghost">
              {" "}
              <Edit className="size-4" /> Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Trash2 className="size-4" /> Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete ticket?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this ticket? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button size="sm" variant="destructive" onClick={() => onDelete?.(ticket.id)}>
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
