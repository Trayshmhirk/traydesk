"use client";

import { useParams } from "next/navigation";
import { useGetTicketByIdQuery } from "@/lib/hooks/use-tickets";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TicketViewPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError, error } = useGetTicketByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-destructive">{(error as Error)?.message}</div>;

  const ticket = data?.ticket;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">View Ticket</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ticket?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{ticket?.description}</p>
          <div className="flex gap-4">
            <div>
              Status: <strong>{ticket?.status}</strong>
            </div>
            <div>
              Priority: <strong>{ticket?.priority}</strong>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
