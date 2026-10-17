/** Names and leaders as printed on the Elections Canada registry page read on 2026-10-17. */
export const REGISTERED_PARTIES: { name: string; leader: string }[] = [
  { name: "Animal Protection Party of Canada", leader: "Liz White" },
  { name: "Bloc Québécois", leader: "Yves-François Blanchet" },
  { name: "Canadian Future Party", leader: "Dominic Cardy" },
  { name: "Centrist Party of Canada", leader: "A.Q. Rana" },
  { name: "Christian Heritage Party of Canada", leader: "Rodney L. Taylor" },
  { name: "Communist Party of Canada", leader: "Drew Garvie" },
  { name: "Conservative Party of Canada", leader: "Pierre M.J. Poilievre" },
  { name: "Green Party of Canada", leader: "Elizabeth May" },
  { name: "Liberal Party of Canada", leader: "Mark Carney" },
  { name: "Marxist-Leninist Party of Canada", leader: "Anna Di Carlo" },
  { name: "New Democratic Party", leader: "Avram Lewis" },
  { name: "Parti Rhinocéros Party", leader: "Chinook B. Blais-Leduc" },
  { name: "People's Party of Canada", leader: "Maxime Bernier" },
  { name: "Reforge Party", leader: "Grant S. Abraham" },
];

if (REGISTERED_PARTIES.length !== 14) {
  throw new Error(`Expected 14 registered parties, got ${REGISTERED_PARTIES.length}`);
}
