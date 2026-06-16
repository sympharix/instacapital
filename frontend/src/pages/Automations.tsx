import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import api from '../services/api';

export default function Automations() {
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const res = await api.get('/automations/');
      setRules(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Workflow Automations</Typography>
        <Button variant="contained" color="primary">Create Rule</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rule Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Trigger</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.length === 0 ? (
              <TableRow><TableCell colSpan={7} align="center">No automation rules configured</TableCell></TableRow>
            ) : (
              rules.map((rule: any) => (
                <TableRow key={rule.id}>
                  <TableCell>{rule.name}</TableCell>
                  <TableCell>{rule.model_name}</TableCell>
                  <TableCell>{rule.trigger_type}</TableCell>
                  <TableCell>{rule.condition_field} = {rule.condition_value}</TableCell>
                  <TableCell>{rule.action_type}</TableCell>
                  <TableCell><Chip label={rule.is_active ? "Active" : "Inactive"} color={rule.is_active ? "success" : "default"} size="small" /></TableCell>
                  <TableCell>
                    <Button size="small">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
