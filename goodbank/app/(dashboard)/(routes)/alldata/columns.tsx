"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  Type: string
  Amount: number
  Balance_update: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "Type",
    header: "Transaction Type",
  },
  {
    accessorKey: "Amount",
    header: "Amount",
  },
  {
    accessorKey: "Balance_update",
    header: "Balance",
  },
]
