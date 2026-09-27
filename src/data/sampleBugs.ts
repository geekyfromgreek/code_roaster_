export interface SampleBug {
  id: string;
  name: string;
  language: string;
  code: string;
  errorMessage?: string;
}

export const SAMPLE_BUGS: SampleBug[] = [
  {
    id: "async_disaster",
    name: "Async Loop Memory Meltdown",
    language: "javascript",
    code: `// DevFest Nashik Ticket Reservation Handler
async function reserveNashikTickets(users) {
  let reservedCount = 0;
  
  // What could possibly go wrong with async in forEach?
  users.forEach(async (user) => {
    const isAvailable = await checkTicketAvailability(user.id);
    if (isAvailable == true) {
      reservedCount = reservedCount + 1;
      await db.tickets.insert({ userId: user.id, reservedAt: Date.now() });
    }
  });
  
  // Who cares about waiting for promises?
  return { status: "Success", reserved: reservedCount };
}`,
    errorMessage: "UnhandledPromiseRejection: Connection pool exhausted (max connections: 10 reached)"
  },
  {
    id: "off_by_one_subtraction",
    name: "Panchavati Express Minus Bug",
    language: "python",
    code: `def calculate_coach_passengers(passengers_in, passengers_out):
    # Calculate net passengers entering the train at Nashik Road
    total = 0
    for i in range(len(passengers_in)):
        # Oops, subtract instead of add!
        total = total - passengers_in[i]
        
    if total = 0: # Assignment inside condition!
        print("Empty train!")
        
    return total`,
    errorMessage: "SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?"
  },
  {
    id: "infinite_recursion",
    name: "Recursion Without Braking",
    language: "typescript",
    code: `// Calculate Sula Grape Harvest Yield
function calculateHarvest(crates: any[]): any {
  if (crates == null) return 0;
  
  // Who needs a base condition when you have infinite RAM?
  const first = crates[0];
  const remaining = crates.slice(1);
  
  return first.weight + calculateHarvest(crates); // Oops, passing crates instead of remaining!
}`,
    errorMessage: "RangeError: Maximum call stack size exceeded"
  }
];
