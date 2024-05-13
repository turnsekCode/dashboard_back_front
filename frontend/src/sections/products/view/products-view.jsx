/* eslint-disable */
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';

import { products } from 'src/_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import { useForm } from 'react-hook-form';
import { useAuth } from 'src/context/AuthContext';
import { useTasks } from 'src/context/TasksContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const { tasks, getTasks, getTaskSlug } = useTasks()

  useEffect(() => {
    getTasks()
    getTaskSlug()
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Projects</Typography>

        <Button variant="contained" color="inherit" starticon={<Iconify icon="eva:plus-fill" />}>
          <Link to="/add-project" variant="contained" color="inherit" starticon={<Iconify icon="eva:plus-fill" />}>
            New Project
          </Link>
        </Button>
      </Stack>

      {/* formulario para los proyector */}

     {tasks.length !== 0 ? <>
     <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {tasks.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3} lg={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid></> : <h1>No hay tareas</h1>}

      <ProductCartWidget />
    </Container>
  );
}
