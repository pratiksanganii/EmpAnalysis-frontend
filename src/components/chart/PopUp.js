import {
  Box,
  Button,
  Container,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import http from '../../http-common';
import { useDispatch } from 'react-redux';

const Form = ({ visible, setVisible, data }) => {
  const [type, setType] = useState(data?.type);
  const [field, setField] = useState(data?.field);
  const [typeList, setTypeList] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (data) dispatch();
  };

  useEffect(() => {
    async function fetchTypes() {
      const data = await http.get('/chart/types');
      setTypeList(
        Object.keys(data.data).map((k) => ({ id: data.data[k], title: k }))
      );
    }
    fetchTypes();
  }, []);
  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Container maxWidth='sm' style={{ background: 'white' }}>
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 7,
            borderRadius: '10px',
          }}
        >
          <Button
            style={{
              position: 'absolute',
              marginLeft: '500px',
              marginTop: '-25px',
            }}
            onClick={() => setVisible(false)}
          >
            x
          </Button>

          <Typography component='h1' variant='h5'>
            {data ? 'Update Chart' : 'Create Chart'}
          </Typography>

          <Select
            margin='normal'
            fullWidth
            required
            value={type}
            label='Chart Type'
            name='Chart Type'
            onChange={(e) => setType(e.target.value)}
          >
            {typeList.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.title}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin='normal'
            fullWidth
            required
            value={field}
            label='Field'
            name='Field'
            onChange={(e) => setField(e.target.value)}
          >
            {['skills', 'designation', 'employeeStatus'].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          onClick={handleSubmit}
          variant='contained'
          sx={{ mt: 3, mb: 2, ml: 50 }}
        >
          {data ? 'Update' : 'Create'}
        </Button>
      </Container>
    </Modal>
  );
};

export default Form;
