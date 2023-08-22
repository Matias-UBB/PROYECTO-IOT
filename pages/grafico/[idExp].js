import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Auth/Layout';
import Navbar from '@/components/Layout/Navbar';
import { Box, Button, Flex, Heading, Select, Text , Stack} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { useRouter } from 'next/router';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { format } from 'date-fns';
import { Icon } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ExcelJS from 'exceljs';




const Grafico = () => {
  const router = useRouter();
  const { idExp } = router.query;
  const [data, setData] = useState([]);
  const { data: session, status } = useSession();
  const [selectedType, setSelectedType] = useState("");
  const [exp,setExp] = useState([]);
  const[dateNow,setDateNow] = useState(new Date());

  const handleDownloadExcel = () => {
    setDateNow(new Date());
    if (selectedType && data[selectedType]) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(`${selectedType}_${format(dateNow, 'dd-MM-yyyy HH-mm-ss')}`);

      worksheet.addRow(['Fecha', 'Valor']);

      data[selectedType].forEach((dato) => {
        worksheet.addRow([
          format(new Date(dato.date), 'dd/MM/yyyy HH:mm:ss'),
          dato.valor,
        ]);
      });

      const buffer = workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${selectedType}_${format(dateNow, 'dd-MM-yyyy HH-mm-ss')}.xlsx`;
        link.click();
      });
    }
  };
  const getExp = async () => {
    try {
      const response = await axios.get(`/api/experimentos/getOne/${idExp}`);
      setExp(response.experimento);
      console.log("exp",exp);
    } catch (error) {
      console.error('error al obtener el experimento ', error);
    }
  };




  useEffect(() => {
    if (status === 'loading') {
      console.log('Cargando');
    } else if (!session) {
      router.push('/login');
    } else {
      getExp();
      getData();
    }
  }, [session, router]);

  const getData = async () => {
    try {
      const response = await axios.get(`/api/datos/${idExp}`);

      setData(response.data.datos);
      console.log(data);
    } catch (error) {
      console.error('error al obtener el experimento ', error);
    }
  };
  const getChartData = (values) => {
    const labels = values.map((dato) => format(new Date (dato.date), 'dd/MM/yyyy HH:mm:ss'));
    const valores = values.map((dato) => dato.valor);
  
    return {
      labels,
      datasets: [
        {
          label: 'Valores',
          data: valores,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };
  

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
    plugins: {
        title: {
            display: true,
            text: selectedType,
            font: {
                size: 20
            }
        },
        legend: {
            display: true,
            position: 'bottom'
        }
    },
    responsive: true,
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  return (
    <>
      <Layout>
        <Navbar />
        <Box >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Link href="/">
              <Button colorScheme="red" mr={4}>
                <Icon as={ArrowBackIcon} w={6} h={6} />
              </Button>
            </Link>
            <Text fontSize="2xl" fontWeight="bold">
              Gráfico
            </Text>
          </Stack>
          <Stack direction="row"  >
            <Select size="sm" value={selectedType} onChange={handleTypeChange}>
              <option value="">Seleccione un tipo</option>
              {Object.keys(data).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            </Stack>
            <Button colorScheme="green" onClick={handleDownloadExcel}>
              Descargar Excel
            </Button>
          
        </Stack>

          

         
          <Flex justify="center" mt={4}>
                {selectedType && (
                <Box key={selectedType}>
                    <Line
                        data={getChartData(data[selectedType])}
                        options={options}
                        width={600}
                        height={400}

                    />

                </Box>
                )}
            
          </Flex>
        </Box>
      </Layout>
    </>
  );
};


export default Grafico;