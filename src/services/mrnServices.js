// src/services/mrnService.js
export async function fetchMRNById(mrnId) {
  console.log("Calling API with MRN ID:", mrnId); // ✅ log here
  const res = await fetch(`http://localhost:3000/api/mrn?mrnId=${mrnId}`);
  console.log("Fetch status:", res.status); // ✅ log HTTP status

  if (!res.ok) throw new Error("MRN not found");
  const data = await res.json();
  console.log("Data received from API:", data); // ✅ log response
  return data;
}

export async function fetchMRN(from, length) {
  const res = await fetch(`http://localhost:3000/api/mrn?from=${from}&length=${length}`);
  console.log("Fetch status:", res.status); // ✅ log HTTP status

  if (!res.ok) throw new Error("MRN not found");
  const data = await res.json();
  console.log("Data received from API:", data); // ✅ log response
  return data;
}
