"use client";

import { useRouter, useParams } from "next/navigation";
import { useGetTicketByIdQuery, useDeleteTicketMutation } from "@/lib/hooks/use-tickets";
// types not needed directly in this file
import TicketForm from "@/components/tickets/ticket-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { toast } from "sonner";

export default function TicketDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError, error, refetch } = useGetTicketByIdQuery(id);
  const deleteMut = useDeleteTicketMutation();

  const handleAfterUpdate = async () => {
    // refetch to show updated values
    await refetch();
  };

  const handleDelete = async () => {
    try {
      await deleteMut.mutate(id);
      toast.success("Ticket deleted");
      router.push("/dashboard/tickets");
    } catch (err: unknown) {
      toast.error((err as Error)?.message ?? "Failed to delete ticket");
      throw err;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-destructive">{(error as Error)?.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ticket</h1>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
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
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{data?.ticket.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{data?.ticket.description}</p>
          <TicketForm
            ticketId={id}
            mode="edit"
            initial={{
              title: data?.ticket.title,
              description: data?.ticket.description,
              status: data?.ticket.status,
              priority: data?.ticket.priority,
            }}
            onSuccess={handleAfterUpdate}
            submitLabel="Update"
          />
        </CardContent>
      </Card>
    </div>
  );
}
