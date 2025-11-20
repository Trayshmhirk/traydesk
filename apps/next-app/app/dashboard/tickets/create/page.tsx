"use client";

import { useRouter } from "next/navigation";
import TicketForm from "@/components/tickets/ticket-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CreateTicketPage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Ticket</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create</CardTitle>
        </CardHeader>
        <CardContent>
          <TicketForm
            mode="create"
            onSuccess={() => {
              // navigate back to list after creation
              router.push("/dashboard/tickets");
            }}
            submitLabel="Create"
          />
        </CardContent>
      </Card>
    </div>
  );
}
