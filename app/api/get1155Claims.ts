import { NextApiRequest, NextApiResponse } from "next";
import { fetchClaims } from "@/lib/fetch1155Claims";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const claims = await fetchClaims();
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ERC-1155 claims" });
  }
}
