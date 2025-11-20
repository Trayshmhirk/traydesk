"use client";

import { useGetTicketsQuery, useDeleteTicketMutation } from "@/lib/hooks/use-tickets";
import { toast } from "sonner";
import TicketCard from "@/components/tickets/ticket-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TicketsPage() {
  const { isLoading, isError, error, data, refetch } = useGetTicketsQuery();
  const deleteMut = useDeleteTicketMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteMut.mutate(id);
      toast.success("Ticket deleted");
      refetch();
    } catch (err: unknown) {
      toast.error((err as Error)?.message ?? "Failed to delete ticket");
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-primary text-2xl font-bold">Tickets</h1>
          <p className="text-muted-foreground">Create, view and manage your tickets.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/tickets/create">
            <Button>Create Ticket</Button>
          </Link>
        </div>
      </div>

      {/* creation moved to dedicated page */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <div>Loading...</div>}
        {isError && <div className="text-destructive">{(error as Error)?.message}</div>}
        {data?.tickets?.length === 0 && (
          <div className="text-muted-foreground">No tickets yet.</div>
        )}

        {data?.tickets?.map((t) => (
          <TicketCard key={t.id} ticket={t} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
