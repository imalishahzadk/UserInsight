"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: any, row: any, index: number) => JSX.Element | string;
}

interface Action {
  label: string;
  onClick: (row: any) => void;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  actions?: any[];
  rowsPerPage?: number;
}

export default function DataTable({
  columns,
  rows,
  actions,
  rowsPerPage = 10,
}: DataTableProps) {
  const [page, setPage] = useState(0);

  // Calculate pagination
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = rows.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Box>
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
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      color: "#fff",
                      backgroundColor: "#0A0F1E",
                      fontWeight: 700,
                      border: "none",
                      fontSize: "1rem",
                      "&:first-of-type": {
                        borderTopLeftRadius: "24px",
                      },
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                      backgroundColor: "#0A0F1E",
                      fontWeight: 700,
                      border: "none",
                      borderTopRightRadius: "24px",
                      width: "80px",
                    }}
                  >
                    Action
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions ? 1 : 0)}
                    sx={{
                      textAlign: "center",
                      py: 8,
                      color: "rgba(255,255,255,0.7)",
                      borderBottom: "1px solid #333333",
                    }}
                  >
                    <Typography variant="h6">No data available</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                currentRows.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.05) !important",
                      },
                      "& td": {
                        borderBottom: "1px solid #333333",
                        color: "white",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(value, row, index)
                            : value}
                        </TableCell>
                      );
                    })}
                    {actions && (
                      <>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            {actions[0] && (
                              <Button
                                onClick={() => actions[0].onClick(row)}
                                sx={{
                                  minWidth: 0,
                                  p: 1,
                                  bgcolor: "rgba(255, 255, 255, 0.1)",
                                  borderRadius: "50%",
                                  color: "#ce9ffc",
                                  width: 40,
                                  height: 40,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow:
                                    "0 4px 12px rgba(115, 103, 240, 0.2)",
                                  "&:hover": {
                                    bgcolor: "rgba(115, 103, 240, 0.2)",
                                  },
                                }}
                              >
                                <VisibilityOutlinedIcon fontSize="small" />
                              </Button>
                            )}
                            {actions[1] && (
                              <Button
                                onClick={() => actions[1].onClick(row)}
                                sx={{
                                  minWidth: 0,
                                  p: 1,
                                  bgcolor: "rgba(255, 255, 255, 0.1)",
                                  borderRadius: "50%",
                                  color: "#ce9ffc",
                                  width: 40,
                                  height: 40,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow:
                                    "0 4px 12px rgba(115, 103, 240, 0.2)",
                                  "&:hover": {
                                    bgcolor: "rgba(115, 103, 240, 0.2)",
                                  },
                                }}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </Button>
                            )}
                            {actions[2] && (
                              <Button
                                onClick={() => actions[2].onClick(row)}
                                sx={{
                                  minWidth: 0,
                                  p: 1,
                                  bgcolor: "rgba(248, 21, 1, 0.1)",
                                  borderRadius: "50%",
                                  color: "#fc9f9f",
                                  width: 40,
                                  height: 40,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow:
                                    "0 4px 12px rgba(115, 103, 240, 0.2)",
                                  "&:hover": {
                                    bgcolor: "rgba(115, 103, 240, 0.2)",
                                  },
                                }}
                              >
                                <DeleteOutlinedIcon fontSize="small" />
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "transparent",
              borderBottomLeftRadius: "24px",
              borderBottomRightRadius: "24px",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handlePreviousPage}
                disabled={page === 0}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    borderColor: "#7367f033",
                    color: "#fff",
                  },
                  "&.Mui-disabled": {
                    borderColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleNextPage}
                disabled={page >= totalPages - 1}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    borderColor: "#7367f033",
                    color: "#fff",
                  },
                  "&.Mui-disabled": {
                    borderColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                Next
              </Button>
            </Box>
            <Box sx={{ color: "rgba(255,255,255,0.7)" }}>
              Page {page + 1} of {Math.max(1, totalPages)}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
