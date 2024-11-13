"use client";

import Pagina from '../../components/Pagina';
import { useRouter } from 'next/navigation';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useState } from 'react';

export default function CadastroClientePage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            nome: '',
            cpf: '',
            telefone: '',
            endereco: '',
            email: ''
        },
    });

    const [message, setMessage] = useState('');

    // Função para salvar os dados do cliente
    const salvar = (dados) => {
        // Verifica se já existe um cliente com o mesmo CPF
        const storedClientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const clienteExistente = storedClientes.find(cliente => cliente.cpf === dados.cpf);

        if (clienteExistente) {
            setMessage("Cliente já cadastrado!");
            return;
        }

        // Cria um novo cliente com um ID único
        const novaLista = [...storedClientes, { ...dados, id: uuidv4() }];
        
        // Salva a nova lista no localStorage
        localStorage.setItem('clientes', JSON.stringify(novaLista));
        
        setMessage("Cliente cadastrado com sucesso!");
        
        // Redireciona para a página de listagem de clientes
        router.push("/clientes");
    };

    return (
        <Pagina titulo="Cadastro de Cliente">
            {/* Exibe a mensagem de sucesso ou erro */}
            {message && <div className="alert alert-info">{message}</div>}

            <Form onSubmit={handleSubmit(salvar)} className="p-3">
                <Card className="mb-3">
                    <Card.Header as="h4" className="text-center">Dados do Cliente</Card.Header>
                    <Card.Body>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Nome Completo:</Form.Label>
                                <Form.Control
                                    {...register("nome", { required: "Campo obrigatório" })}
                                    type='text'
                                    placeholder="Digite o nome completo"
                                    isInvalid={errors.nome}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.nome?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CPF:</Form.Label>
                                <InputMask 
                                    mask="999.999.999-99"
                                    {...register("cpf", { required: "Campo obrigatório" })}
                                >
                                    {(inputProps) => (
                                        <Form.Control 
                                            {...inputProps}
                                            type="text"
                                            isInvalid={errors.cpf}
                                        />
                                    )}
                                </InputMask>
                                <Form.Control.Feedback type="invalid">
                                    {errors.cpf?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Telefone:</Form.Label>
                                <InputMask 
                                    mask="(99) 99999-9999"
                                    {...register("telefone", { required: "Campo obrigatório" })}
                                >
                                    {(inputProps) => (
                                        <Form.Control 
                                            {...inputProps}
                                            type="text"
                                            placeholder="(00) 00000-0000"
                                            isInvalid={errors.telefone}
                                        />
                                    )}
                                </InputMask>
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    {...register("email", { required: "Campo obrigatório" })}
                                    type='email'
                                    placeholder="Digite o email"
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Endereço:</Form.Label>
                                <Form.Control
                                    {...register("endereco", { required: "Campo obrigatório" })}
                                    type='text'
                                    placeholder="Digite o endereço"
                                    isInvalid={errors.endereco}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.endereco?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group className='text-end'>
                            <Button className='me-2' variant='secondary' onClick={() => router.push('/clientes')}>
                                <FaArrowLeft className='me-1' /> Voltar
                            </Button>
                            <Button className='me-2' variant='danger' type="reset" onClick={() => reset()}>
                                <FaTrash className='me-1' /> Limpar
                            </Button>
                            <Button variant='primary' type="submit">
                                <FaCheck className='me-1' /> Salvar
                            </Button>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Form>
        </Pagina>
    );
}
