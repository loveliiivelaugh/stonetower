// Packages
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid, Modal, Typography } from '@mui/material'
import { BottomNavigation, BottomNavigationAction, Tabs } from '@mui/material';
// Components
import FormContainer from '../forms/FormContainer';
import ChartButtons from '../charts/ChartButtons';
import ReusableTable from '../charts/ReusableTable';
// Utitilities
import { paths, queries } from '../../api';
// Styles
import { Styled } from '../../theme/common';


const topics = ["Orders", "Tables", "Inventory", "Staff"];

const AdminDashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("staff");
    // Returns the table schemas for each table in the dashboard ...
    const schemaQuery = useQuery(queries.query(paths.schema));
    // ... to dynamically build and prepopulate the table data and ...
    // ... dynamically build associated forms for full CRUD functionality.

    console.log("schemaQuery: ", schemaQuery)

    const handleChartButtons = (button: string) => {
        // Can handle any middle logic here
        // ...

        setModalOpen(true);
    };

    const getTableSection = (activeTable: string) => {
        return (
            <Grid item sm={12}>
                <ChartButtons handleClick={handleChartButtons} />
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <Styled.ModalContainer>
                        <FormContainer 
                            schema={
                                schemaQuery.isSuccess 
                                && schemaQuery.data
                                    .find(({ table }: { table: string }) => (table === activeTable))
                            } 
                            handleRefreshQueries={() => schemaQuery.refetch()} 
                        />
                    </Styled.ModalContainer>
                </Modal>
                <ReusableTable 
                    table={activeTable}
                    columns={
                        schemaQuery.isSuccess 
                        && schemaQuery.data
                            .find(({ table }: { table: string }) => (table === activeTable)).columns
                    } 
                />
            </Grid>
        )
    };
    
    return (
        <Grid container mt={10}>
            <Grid item sm={12}>
                <Box>
                    <Typography variant="h4">
                        Admin Dashboard
                    </Typography>
                </Box>
            </Grid>
            
            {schemaQuery.isSuccess && getTableSection(activeTab)}
            {/* <Grid item sm={12}>
                <ChartButtons handleClick={handleChartButtons} />
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <Styled.ModalContainer>
                        <FormContainer 
                            schema={
                                schemaQuery.isSuccess 
                                && schemaQuery.data
                                    .find(({ table }: { table: string }) => (table === activeTab))
                            } 
                            handleRefreshQueries={() => schemaQuery.refetch()} 
                        />
                    </Styled.ModalContainer>
                </Modal>
                <ReusableTable 
                    table={activeTab}
                    columns={
                        schemaQuery.isSuccess 
                        && schemaQuery.data
                            .find(({ table }: { table: string }) => (table === activeTab)).columns
                    } 
                />
            </Grid> */}

            <Styled.BottomNavWrapper>
                <BottomNavigation
                    component={Tabs}
                    showLabels
                    variant="scrollable"
                    scrollButtons="auto"
                    value={0}
                    sx={{ zIndex: 1000, pt: 2 }}
                >
                    {topics.map((item: string, index: number) => (
                        <BottomNavigationAction
                            key={index} 
                            label={item} 
                            icon={(topics as any)[item]}
                            // onClick={() => {}}
                            onClick={() => setActiveTab(item.toLowerCase())}
                        />
                    ))}
                </BottomNavigation>
            </Styled.BottomNavWrapper>

        </Grid>
    );
};

export default AdminDashboard;
