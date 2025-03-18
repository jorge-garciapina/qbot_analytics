import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { HandlingOverviewDataType } from "../../../charts/handling_overview/types/types_handling_overview";

interface TableInput {
  backendData: HandlingOverviewDataType | undefined;
}

const DataTable: React.FC<TableInput> = ({ backendData }) => {
  if (!backendData) {
    return <p>No data available</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Total Calls</TableCell>
            <TableCell>Calls Handled By AI</TableCell>
            <TableCell>Calls Handled By Human</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {backendData.xAxis.map((date, index) => (
            <TableRow key={index}>
              <TableCell>{date}</TableCell>
              <TableCell>
                {backendData.callsHandledByAI[index] +
                  backendData.callsHandledByHuman[index]}
              </TableCell>
              <TableCell>{backendData.callsHandledByAI[index]}</TableCell>
              <TableCell>{backendData.callsHandledByHuman[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
