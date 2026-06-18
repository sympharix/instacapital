import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Select, MenuItem, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { userService, User } from '../services/userService';

const ROLES = [
  'SUPER_ADMIN', 'ADMIN', 'MANAGER', 'LOAN_EXECUTIVE', 
  'TELECALLER', 'OPERATIONS_EXECUTIVE', 'SUPPORT', 'CUSTOMER'
];

export default function TeamManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Create User Modal State
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '', password: '', email: '', role: 'ADMIN', first_name: '', last_name: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch users. You might not have permission.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await userService.updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const handleCreateUser = async () => {
    try {
      await userService.createUser(newUser);
      setOpenModal(false);
      setNewUser({ username: '', password: '', email: '', role: 'ADMIN', first_name: '', last_name: '' });
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.username?.[0] || 'Failed to create user');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Team Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpenModal(true)}
          sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}
        >
          Add Team Member
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={user.role || ''}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    sx={{ minWidth: 150 }}
                  >
                    {ROLES.map(role => (
                      <MenuItem key={role} value={role}>{role.replace('_', ' ')}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create User Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Team Member</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField 
            label="Username" 
            fullWidth 
            value={newUser.username} 
            onChange={(e) => setNewUser({...newUser, username: e.target.value})} 
          />
          <TextField 
            label="Email" 
            type="email" 
            fullWidth 
            value={newUser.email} 
            onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
          />
          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            value={newUser.password} 
            onChange={(e) => setNewUser({...newUser, password: e.target.value})} 
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
              label="First Name" 
              fullWidth 
              value={newUser.first_name} 
              onChange={(e) => setNewUser({...newUser, first_name: e.target.value})} 
            />
            <TextField 
              label="Last Name" 
              fullWidth 
              value={newUser.last_name} 
              onChange={(e) => setNewUser({...newUser, last_name: e.target.value})} 
            />
          </Box>
          <Select
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            fullWidth
          >
            {ROLES.map(role => (
              <MenuItem key={role} value={role}>{role.replace('_', ' ')}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateUser}>Create User</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
