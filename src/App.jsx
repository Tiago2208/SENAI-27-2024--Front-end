import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './App.css';
import axios from 'axios';

const App = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formik = useFormik({
    initialValues: {
      cpf: '',
      nome: '',
      email: '',
      celular: '',
      especializacao: '',
      categoria: '',
      casa: '',
    },
    validationSchema: Yup.object({
      cpf: Yup.string().required('CPF é obrigatório'),
      nome: Yup.string().required('Nome é obrigatório'),
      email: Yup.string().email('Email inválido').required('Email é obrigatório'),
      celular: Yup.string().required('Celular é obrigatório'),
      especializacao: Yup.string().required('Especialização é obrigatória'),
      categoria: Yup.string().required('Categoria é obrigatória'),
      casa: Yup.string().required('Casa é obrigatória'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submetendo formulário:', values);
        setSubmitting(true);
        await axios.post('/items', values);
        setSubmitSuccess(true);
        resetForm();
      } catch (error) {
        setSubmitError('Erro ao enviar os dados. Tente novamente.');
        console.error('Erro ao enviar os dados:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
      <div className="form-container">
        <button className="close-button">FECHAR</button>
        <img src="/senai_logo 1.png" alt="Sistema FIEMS" className="logo" />
        <h2>Formulário de Inscrição de Voluntário na Campanha MS Pela Vida</h2>
        {submitSuccess && <p className="success-message">Inscrição realizada com sucesso!</p>}
        {submitError && <p className="error-message">{submitError}</p>}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            placeholder="000.000.000-00"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cpf}
          />
          {formik.touched.cpf && formik.errors.cpf ? <div>{formik.errors.cpf}</div> : null}

          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Informe seu nome"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
          />
          {formik.touched.nome && formik.errors.nome ? <div>{formik.errors.nome}</div> : null}

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Informe seu e-mail institucional"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <label htmlFor="celular">Celular</label>
          <input
            id="celular"
            name="celular"
            type="text"
            placeholder="(67) 99999-9999"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.celular}
          />
          {formik.touched.celular && formik.errors.celular ? <div>{formik.errors.celular}</div> : null}

          <label htmlFor="especializacao">Especialização</label>
          <select
            id="especializacao"
            name="especializacao"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.especializacao}
          >
            <option value="" label="Clique para selecionar" />
            <option value="Professor" label="Professor" />
            <option value="Técnico" label="Técnico" />
            <option value="Engenheiro" label="Engenheiro" />
          </select>
          {formik.touched.especializacao && formik.errors.especializacao ? <div>{formik.errors.especializacao}</div> : null}

          <label htmlFor="casa">Casa</label>
          <select
            id="casa"
            name="casa"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.casa}
          >
            <option value="" label="Clique para selecionar" />
            <option value="FIEMS" label="FIEMS" />
            <option value="SESI" label="SESI" />
            <option value="IEL" label="IEL" />
            <option value="SENAI" label="SENAI" />
          </select>
          {formik.touched.casa && formik.errors.casa ? <div>{formik.errors.casa}</div> : null}

          <button type="submit" disabled={!formik.isValid || submitting}>
            {submitting ? 'Enviando...' : 'REALIZAR INSCRIÇÃO'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
