import { sleep, generateId } from "./utils";
import type { Session } from "./mock-api"; // reuse Session type from auth API
import { ApiError } from "./mock-api"; // if ApiError is exported from mock-api; if not, copy below

export type TicketStatus = "open" | "in_progress" | "closed";
export type TicketPriority = "low" | "medium" | "high";

export type Ticket = {
  id: string;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: number;
  updatedAt: number;
  createdBy?: { id: string; name?: string; email: string };
};

const TICKETS_KEY = "ticketapp_tickets";
const SESSION_KEY = "ticketapp_session";

// helper to read session and verify
function getSessionFromStorage(): Session | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data) as Session;

    if (!parsed || !parsed.token) return null;
    if (parsed.expiresAt && parsed.expiresAt <= Date.now()) return null;

    return parsed;
  } catch {
    return null;
  }
}

function getTickets(): Ticket[] {
  try {
    const data = localStorage.getItem(TICKETS_KEY);
    if (!data) return [];
    return JSON.parse(data) as Ticket[];
  } catch {
    return [];
  }
}

function createTickets(tickets: Ticket[]) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

function validateTicketInput(input: { title?: string; status?: string; priority?: string }) {
  const errors: Record<string, string> = {};

  if (!input.title || input.title.trim().length === 0) {
    errors.title = "Title is required.";
  } else if (input.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  const allowedStatuses: TicketStatus[] = ["open", "in_progress", "closed"];

  if (input.status && !allowedStatuses.includes(input.status as TicketStatus)) {
    errors.status = `Status must be one of ${allowedStatuses.join(", ")}.`;
  }

  const allowedPriorities: TicketPriority[] = ["low", "medium", "high"];

  if (input.priority && !allowedPriorities.includes(input.priority as TicketPriority)) {
    errors.priority = `Priority must be one of ${allowedPriorities.join(", ")}.`;
  }

  return Object.keys(errors).length ? errors : null;
}

/**
 * API: fetchTickets
 */
export async function fetchTickets(): Promise<{ tickets: Ticket[] }> {
  await sleep(300 + Math.random() * 300);

  const session = getSessionFromStorage();
  if (!session) {
    throw new ApiError("Your session has expired — please log in again.", "UNAUTHORIZED");
  }

  try {
    // return only tickets created by the current session user
    const tickets = getTickets();
    const userId = session.user.id;
    const userTickets = tickets.filter((t) => t.createdBy?.id === userId);
    return { tickets: userTickets };
  } catch (e: unknown) {
    // surface a friendly API error
    // include the original for diagnostics
    console.warn("fetchTickets error:", e);
    throw new ApiError("Failed to load tickets. Please retry.", "FETCH_ERROR");
  }
}

/**
 * API: getTicketById
 */
export async function getTicketById(id: string): Promise<{ ticket: Ticket }> {
  await sleep(200 + Math.random() * 200);

  const session = getSessionFromStorage();
  if (!session) {
    throw new ApiError("Your session has expired — please log in again.", "UNAUTHORIZED");
  }

  const tickets = getTickets();
  const found = tickets.find((t) => t.id === id);
  if (!found) throw new ApiError("Ticket not found.", "NOT_FOUND");

  // ensure the ticket belongs to the current user
  if (found.createdBy?.id !== session.user.id) {
    throw new ApiError("Ticket not found.", "NOT_FOUND");
  }

  return { ticket: found };
}

/**
 * API: createTicket
 */
export async function createTicket(payload: {
  title: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}): Promise<{ ticket: Ticket }> {
  await sleep(400 + Math.random() * 300);

  const session = getSessionFromStorage();
  if (!session) {
    throw new ApiError("Your session has expired — please log in again.", "UNAUTHORIZED");
  }

  const validation = validateTicketInput(payload);
  if (validation) {
    throw new ApiError("Validation failed", "VALIDATION_ERROR");
  }

  const tickets = getTickets();
  const now = Date.now();

  const ticket: Ticket = {
    id: generateId(),
    title: payload.title.trim(),
    description: payload.description?.trim(),
    status: (payload.status ?? "open") as TicketStatus,
    priority: (payload.priority ?? "low") as TicketPriority,
    createdAt: now,
    updatedAt: now,
    createdBy: { id: session.user.id, name: session.user.name, email: session.user.email },
  };

  tickets.unshift(ticket); // newest first
  createTickets(tickets);

  // attach ticket to session.user in stored session so UI can access user's tickets if needed
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsed = JSON.parse(raw) as any;
      // keep any existing tickets array and append
      parsed.user = parsed.user || {};
      parsed.user.tickets = parsed.user.tickets || [];
      parsed.user.tickets.unshift(ticket);
      localStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
    }
  } catch (err) {
    // non-fatal; ignore but log for debugging
    console.warn("Failed to attach ticket to session user:", err);
  }

  return { ticket };
}

/**
 * API: updateTicket
 */
export async function updateTicket(
  id: string,
  update: {
    title?: string;
    description?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
  }
): Promise<{ ticket: Ticket }> {
  await sleep(300 + Math.random() * 300);

  const session = getSessionFromStorage();
  if (!session) {
    throw new ApiError("Your session has expired — please log in again.", "UNAUTHORIZED");
  }

  // If status provided, validate allowed values
  const validation = validateTicketInput(update);
  if (validation) {
    throw new ApiError("Validation failed", "VALIDATION_ERROR");
  }

  const tickets = getTickets();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new ApiError("Ticket not found.", "NOT_FOUND");

  const now = Date.now();
  const updated: Ticket = {
    ...tickets[idx],
    title: update.title ? update.title.trim() : tickets[idx].title,
    description:
      update.description !== undefined ? update.description?.trim() : tickets[idx].description,
    status: update.status ?? tickets[idx].status,
    priority: update.priority ?? tickets[idx].priority,
    updatedAt: now,
  };

  // ensure the ticket belongs to the current user
  if (tickets[idx].createdBy?.id !== session.user.id) {
    throw new ApiError("Ticket not found.", "NOT_FOUND");
  }

  tickets[idx] = updated;
  createTickets(tickets);

  // update user's tickets in session storage if present
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsed = JSON.parse(raw) as any;
      if (parsed.user && Array.isArray(parsed.user.tickets)) {
        parsed.user.tickets = parsed.user.tickets.map((t: unknown) =>
          (t as { id?: string }).id === updated.id ? updated : t
        );
        localStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
      }
    }
  } catch (err) {
    // ignore but keep a small debug log
    console.warn("Failed to update session user tickets:", err);
  }

  return { ticket: updated };
}

/**
 * API: deleteTicket
 */
export async function deleteTicket(id: string): Promise<{ success: true }> {
  await sleep(200 + Math.random() * 200);

  const session = getSessionFromStorage();
  if (!session) {
    throw new ApiError("Your session has expired — please log in again.", "UNAUTHORIZED");
  }

  let tickets = getTickets();
  const exists = tickets.find((t) => t.id === id);
  if (!exists) throw new ApiError("Ticket not found.", "NOT_FOUND");

  // ensure ownership
  if (exists.createdBy?.id !== session.user.id) {
    throw new ApiError("Ticket not found.", "NOT_FOUND");
  }

  tickets = tickets.filter((t) => t.id !== id);
  createTickets(tickets);

  // remove from stored session user tickets if present
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsed = JSON.parse(raw) as any;
      if (parsed.user && Array.isArray(parsed.user.tickets)) {
        parsed.user.tickets = parsed.user.tickets.filter(
          (t: unknown) => (t as { id?: string }).id !== id
        );
        localStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
      }
    }
  } catch (err) {
    // ignore but keep a small debug log
    console.warn("Failed to remove ticket from session user:", err);
  }

  return { success: true };
}

/**
 * API: analytics - returns summary stats
 */
export async function getTicketStats(): Promise<{
  total: number;
  open: number;
  in_progress: number;
  closed: number;
}> {
  await sleep(150 + Math.random() * 150);

  const session = getSessionFromStorage();
  if (!session) {
    throw new ApiError("Your session has expired — please log in again.", "UNAUTHORIZED");
  }

  const tickets = getTickets();
  // only count tickets belonging to current user
  const userId = session.user.id;
  const userTickets = tickets.filter((t) => t.createdBy?.id === userId);
  const total = userTickets.length;
  const open = userTickets.filter((t) => t.status === "open").length;
  const in_progress = userTickets.filter((t) => t.status === "in_progress").length;
  const closed = userTickets.filter((t) => t.status === "closed").length;

  return { total, open, in_progress, closed };
}
