"use client";

import {
  Box,
  Switch,
  Avatar,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { CLIENT_DETAILS_ROUTE } from "@/core/routes";
import { replaceUrlVariables } from "@/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ClientsDataTable = ({ data }: { data: any[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (id: string) => {
    setLoadingId(id);
    router.push(replaceUrlVariables(CLIENT_DETAILS_ROUTE, { id }));
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(115, 103, 240, 0.2)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid #7367f033",
        borderRadius: "24px",
      }}
    >
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#fff",
                  backgroundColor: "#0A0F1E",
                  fontWeight: 700,
                }}
              >
                #
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  backgroundColor: "#0A0F1E",
                  fontWeight: 700,
                }}
              >
                Client name
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  backgroundColor: "#0A0F1E",
                  fontWeight: 700,
                }}
              >
                Lead Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  backgroundColor: "#0A0F1E",
                  fontWeight: 700,
                }}
              >
                Contact
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  backgroundColor: "#0A0F1E",
                  fontWeight: 700,
                }}
              >
                Company
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  backgroundColor: "#0A0F1E",
                  fontWeight: 700,
                }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{
                    textAlign: "center",
                    py: 8,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    key={row._id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.05) !important",
                      },
                      "& td": {
                        color: "white",
                        borderBottom: "1px solid #333333",
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          src={row.photoUrl}
                          alt={row.name[0]}
                          sx={{ width: 40, height: 40 }}
                        />
                        <Box>
                          <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>
                            {row.name}
                          </div>
                          <div style={{ color: "#666", fontSize: "0.875rem" }}>
                            {row.email}
                          </div>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.leadEmail || "N/A"}</TableCell>
                    <TableCell>{row.phoneNumber || "N/A"}</TableCell>
                    <TableCell>{row.company?.name || "N/A"}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewDetails(row._id)}
                        disabled={loadingId === row._id}
                        sx={{
                          textTransform: "none",
                          borderColor: "#7367f0",
                          color: "#7367f0",
                          minWidth: "120px",
                          "&:hover": {
                            borderColor: "rgba(115, 103, 240, 0.03)",
                          },
                          "&.Mui-disabled": {
                            borderColor: "rgba(115, 103, 240, 0.3)",
                            color: "rgba(115, 103, 240, 0.3)",
                          },
                        }}
                      >
                        {loadingId === row._id ? (
                          <CircularProgress
                            size={20}
                            sx={{ color: "#7367f0" }}
                          />
                        ) : (
                          "View Detail"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "#fff",
          "& .MuiTablePagination-select": { color: "#fff" },
          "& .MuiTablePagination-selectIcon": { color: "#ce9ffc" },
          "& .MuiTablePagination-actions button": {
            color: "#ce9ffc",
            "&:disabled": { color: "rgba(255, 255, 255, 0.3)" },
          },
        }}
      />
    </Paper>
  );
};

export default ClientsDataTable;
