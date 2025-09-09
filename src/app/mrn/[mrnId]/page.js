"use client";

import ItemsTable from "@/components/tables/ItemsTable";
import { useParams } from "next/navigation";

export default function MRNDetailsPage() {
  const params = useParams();
  const { mrnId } = params;

  return (
    <div>
        <div>MRN Details for ID: {mrnId}</div>
        <ItemsTable/>
    </div>
  )
}