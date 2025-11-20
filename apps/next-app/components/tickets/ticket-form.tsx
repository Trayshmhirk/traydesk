"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { TicketPriority, TicketStatus } from "@/lib/mock-tickets";
import { useCreateTicketMutation, useUpdateTicketMutation } from "@/lib/hooks/use-tickets";

const ticketSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["open", "in_progress", "closed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

type TicketFormData = z.infer<typeof ticketSchema>;

type Props = {
  initial?: Partial<TicketFormData>;
  // optional: if provided, TicketForm will call this instead of its internal mutations
  onSubmit?: (payload: TicketFormData) => Promise<unknown>;
  // when provided, TicketForm will perform update for this id when onSubmit is omitted
  ticketId?: string;
  // 'create' | 'edit' to force behavior; if omitted it's inferred from ticketId/onSubmit
  mode?: "create" | "edit";
  onSuccess?: () => void;
  submitLabel?: string;
};

export default function TicketForm({
  initial,
  onSubmit,
  ticketId,
  mode,
  onSuccess,
  submitLabel = "Save",
}: Props) {
  const resolver = useMemo(() => zodResolver(ticketSchema), []);

  const createMut = useCreateTicketMutation();
  const updateMut = useUpdateTicketMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TicketFormData>({
    resolver,
    defaultValues: {
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      status: (initial?.status as TicketStatus) ?? "open",
      priority: (initial?.priority as TicketPriority) ?? "low",
    },
  });

  const submit = async (data: TicketFormData) => {
    // If an external onSubmit is provided, prefer it (keeps compatibility)
    if (onSubmit) {
      try {
        await onSubmit(data);
        toast.success("Saved");
        reset();
        onSuccess?.();
      } catch (err: unknown) {
        toast.error((err as Error)?.message ?? "Failed to save ticket");
        throw err;
      }
      return;
    }

    // Infer action: update when mode==='edit' or ticketId present; otherwise create
    const shouldUpdate = mode === "edit" || (!!ticketId && mode !== "create");

    try {
      if (shouldUpdate) {
        if (!ticketId) throw new Error("ticket id required for update");
        await updateMut.mutate(ticketId, data);
        toast.success("Ticket updated");
        onSuccess?.();
      } else {
        await createMut.mutate(data);
        toast.success("Ticket created");
        reset();
        onSuccess?.();
      }
    } catch (err: unknown) {
      toast.error((err as Error)?.message ?? "Failed to save ticket");
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <div>
        <Label>Title</Label>
        <Input id="title" {...register("title")} placeholder="Short title" />
        {errors.title && <div className="text-destructive text-sm">{errors.title.message}</div>}
      </div>

      <div>
        <Label>Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Label>Status</Label>
          <select {...register("status")} className="w-full rounded-md border px-3 py-2">
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </select>
        </div>

        <div className="w-40">
          <Label>Priority</Label>
          <select {...register("priority")} className="w-full rounded-md border px-3 py-2">
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={isSubmitting || createMut.isLoading || updateMut.isLoading}>
          {isSubmitting || createMut.isLoading || updateMut.isLoading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
