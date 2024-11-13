'use client'

import Pagina from '../app/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [agencias, setAgencias] = useState([]);
  const [modelos, setModelos] = useState([]);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientes(JSON.parse(localStorage.getItem("clientes")) || []);
      setReservas(JSON.parse(localStorage.getItem("reservas")) || []);
      setVeiculos(JSON.parse(localStorage.getItem("veiculos")) || []);
      setAgencias(JSON.parse(localStorage.getItem("agencias")) || []);
      setModelos(JSON.parse(localStorage.getItem("modelos")) || []);
    }
  }, []);

  const lista = [
    {
      nome: "Clientes",
      imagem: "/img.1.jpeg", // Atualize o caminho da imagem
      quantidade: clientes.length,
      link: "/clientes"
    },
    {
      nome: "Reservas",
      imagem: "/img.2.jpeg", // Atualize o caminho da imagem
      quantidade: reservas.length,
      link: "/reservas"
    },
    {
      nome: "Veículos",
      imagem: "/img.3.jpeg", // Atualize o caminho da imagem
      quantidade: veiculos.length,
      link: "/veiculos"
    },
    {
      nome: "Agências",
      imagem: "/img.4.jpeg", // Atualize o caminho da imagem
      quantidade: agencias.length,
      link: "/agencias"
    },
    {
      nome: "Modelos",
      imagem: "/img.5.jpeg", // Atualize o caminho da imagem
      quantidade: modelos.length,
      link: "/modelos"
    },
  ];

  return (
    <Pagina titulo={"Sistema de Reservas de Veículos"}>
      <Row md={4}>
        {lista.map((item, index) => (
          <Col className='py-2' key={index}>
            <Card style={{ height: '100%' }}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
