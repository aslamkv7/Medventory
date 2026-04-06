export async function fetchMRNById(mrnId) {
  const res = await fetch(`/api/mrn?mrnId=${encodeURIComponent(mrnId)}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("MRN not found");
  return res.json();
}

export async function fetchMRN(from, length) {
  const res = await fetch(`/api/mrn?from=${from}&length=${length}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("MRN not found");
  return res.json();
}
