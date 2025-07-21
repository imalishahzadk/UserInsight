"use client";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

interface Package {
  _id: string;
  name: string;
  price: number;
  duration: string;
  offers: string[];
  totalSubscriptions: string[];
  __v: number;
}

interface PurchaseHistory {
  _id: string;
  clientId: string;
  packageId: Package;
  activationId: string;
  price: number;
  packageName: string;
  duration: string;
  status: string;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RecentTransactionsProps {
  purchaseHistory: PurchaseHistory[];
}

export default function RecentTransactions({
  purchaseHistory,
}: RecentTransactionsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "rgba(30, 30, 50, 0.4)",
        borderRadius: "16px",
        border: "1px solid rgba(115, 103, 240, 0.2)",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 15px 40px, rgba(115, 103, 240, 0.2) 0px 0px 20px",
        p: 3,
        color: "white",
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 600, mb: 3 }}>
        Recent Transactions
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#fff",
                  opacity: 0.7,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 8px",
                }}
              >
                Package
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  opacity: 0.7,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 8px",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  opacity: 0.7,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 8px",
                }}
              >
                Time
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  opacity: 0.7,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 8px",
                }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseHistory.map((purchase) => (
              <TableRow
                key={purchase._id}
                sx={{
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(0, 229, 255, 0.05)",
                  },
                }}
              >
                <TableCell
                  sx={{
                    color: "#fff",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "16px 8px",
                  }}
                >
                  {purchase.packageName}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "16px 8px",
                  }}
                >
                  {formatDate(purchase.purchaseDate)}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "16px 8px",
                  }}
                >
                  {formatTime(purchase.purchaseDate)}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "16px 8px",
                  }}
                >
                  ${purchase.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
