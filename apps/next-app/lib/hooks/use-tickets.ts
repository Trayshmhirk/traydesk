import { useState, useCallback, useEffect } from "react";
import * as api from "@/lib/mock-tickets";
import type { Ticket } from "@/lib/mock-tickets";

type MutationState<T> = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: T | null;
  reset: () => void;
};

function createInitialState<T>(): MutationState<T> {
  return {
    isLoading: false,
    isError: false,
    error: null,
    data: null,
    reset: () => {},
  };
}

/**
 * useGetTicketsQuery - fetch all tickets
 */
export function useGetTicketsQuery() {
  const [state, setState] = useState<MutationState<{ tickets: Ticket[] }>>(createInitialState());

  const fetch = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, isError: false, error: null }));
    try {
      const res = await api.fetchTickets();
      setState((s) => ({ ...s, isLoading: false, data: res, isError: false }));
      // hooks-only: keep behaving like an API client; no store wiring here
      return res;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      setState((s) => ({ ...s, isLoading: false, isError: true, error }));
      throw error;
    }
  }, []);

  useEffect(() => {
    // Defer fetch to next microtask to avoid calling setState synchronously inside the effect
    Promise.resolve().then(() => fetch().catch(() => {}));
  }, [fetch]);

  return { ...state, refetch: fetch };
}

/**
 * useGetTicketByIdQuery - fetch single ticket by id
 */
export function useGetTicketByIdQuery(id?: string) {
  const [state, setState] = useState<MutationState<{ ticket: Ticket }>>(createInitialState());

  const fetch = useCallback(
    async (ticketId?: string) => {
      const tid = ticketId ?? id;
      if (!tid) throw new Error("ticket id required");
      setState((s) => ({ ...s, isLoading: true, isError: false, error: null }));
      try {
        const res = await api.getTicketById(tid);
        setState((s) => ({ ...s, isLoading: false, data: res, isError: false }));
        // hooks-only: return the ticket, do not update any store here
        return res;
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState((s) => ({ ...s, isLoading: false, isError: true, error }));
        throw error;
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      // Defer fetch to next microtask to avoid calling setState synchronously inside the effect
      Promise.resolve().then(() => fetch().catch(() => {}));
    }
  }, [id, fetch]);

  return { ...state, refetch: fetch };
}

/**
 * useCreateTicketMutation
 */
export function useCreateTicketMutation() {
  const [state, setState] = useState<MutationState<{ ticket: Ticket }>>(createInitialState());

  const mutate = useCallback(
    async (payload: {
      title: string;
      description?: string;
      status?: Ticket["status"];
      priority?: Ticket["priority"];
    }) => {
      setState((s) => ({ ...s, isLoading: true, isError: false, error: null }));
      try {
        const res = await api.createTicket(payload);
        setState((s) => ({ ...s, isLoading: false, data: res, isError: false }));
        // hooks-only: created ticket returned; no store update here
        return res;
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState((s) => ({ ...s, isLoading: false, isError: true, error }));
        throw error;
      }
    },
    []
  );

  return { mutate, ...state };
}

/**
 * useUpdateTicketMutation
 */
export function useUpdateTicketMutation() {
  const [state, setState] = useState<MutationState<{ ticket: Ticket }>>(createInitialState());

  const mutate = useCallback(
    async (
      id: string,
      payload: {
        title?: string;
        description?: string;
        status?: Ticket["status"];
        priority?: Ticket["priority"];
      }
    ) => {
      setState((s) => ({ ...s, isLoading: true, isError: false, error: null }));
      try {
        const res = await api.updateTicket(id, payload);
        setState((s) => ({ ...s, isLoading: false, data: res, isError: false }));
        // hooks-only: updated ticket returned; no store update here
        return res;
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState((s) => ({ ...s, isLoading: false, isError: true, error }));
        throw error;
      }
    },
    []
  );

  return { mutate, ...state };
}

/**
 * useDeleteTicketMutation
 */
export function useDeleteTicketMutation() {
  const [state, setState] = useState<MutationState<{ success: true }>>(createInitialState());

  const mutate = useCallback(async (id: string) => {
    setState((s) => ({ ...s, isLoading: true, isError: false, error: null }));
    try {
      const res = await api.deleteTicket(id);
      setState((s) => ({ ...s, isLoading: false, data: res, isError: false }));
      // hooks-only: deletion succeeded; no store update here
      return res;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      setState((s) => ({ ...s, isLoading: false, isError: true, error }));
      throw error;
    }
  }, []);

  return { mutate, ...state };
}

/**
 * useGetDashboardAnalytics
 */
export function useGetDashboardAnalytics() {
  const [state, setState] = useState<
    MutationState<{
      total: number;
      open: number;
      in_progress: number;
      closed: number;
    }>
  >(createInitialState());

  const fetch = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, isError: false, error: null }));
    try {
      const res = await api.getTicketStats();
      setState((s) => ({ ...s, isLoading: false, data: res, isError: false }));
      return res;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      setState((s) => ({ ...s, isLoading: false, isError: true, error }));
      throw error;
    }
  }, []);

  useEffect(() => {
    // Defer fetch to next microtask to avoid calling setState synchronously inside the effect
    Promise.resolve().then(() => fetch().catch(() => {}));
  }, [fetch]);

  return { ...state, refetch: fetch };
}
