import { Box, Button, Grid, Typography } from '@mui/material';
import { BottomNavigation, BottomNavigationAction, Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useAppStore, useSupabaseStore } from '../../store';
import { appScripts } from '../../utilities/appScripts';
import { queries } from '../../api';

import { Styled } from '../../theme/common';


const topics = ["Bar", "Dining 1", "Dining 2", "Patio"];

const TableLayout = () => {
    const appStore = useAppStore();
    const supabaseStore = useSupabaseStore();
    const tablesQuery = useQuery(queries.query("/tables"));

    const handleRunImages = async () => {
        // Next we need to combine the menu items with their images
        // ... and the stripe product IDs -> For checkout with Stripe
        // ... and then create all the products in Supabase with refs to the images
        console.log("handleRunImages: *Created all products in Stripe* ", {});
    };

    return (
        <Box sx={{ 
            p: 4,
            gap: 4,
            alignItems: "center",
            height: "100vh"
        }}>
            <Grid container mt={10}>
                <Grid item sm={12}>
                    <Typography variant="h4">
                        Build All Menu Images 😮
                    </Typography>
                    <Button variant="contained" onClick={handleRunImages}>
                        Combine Menu items with images
                    </Button>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="h4">
                        Tables
                    </Typography>
                    <Typography variant="body1">
                        {supabaseStore.session?.user?.email}
                    </Typography>
                </Grid>
                <Grid item sm={12} sx={{ display: "flex", justifyContent: "space-between", gap: 2, textWrap: "wrap", maxWidth: "100vw" }}>
                    <Typography variant="h6">
                        Bar |
                    </Typography>
                    {tablesQuery.isSuccess 
                        && new Array(8)
                            .fill("")
                            .map((_, index) => {
                                // TODO: move this to backend property
                                const isTableActive = tablesQuery.data
                                    // filter tables down to only those that belong to the user
                                    .filter(({ employee_id }: { employee_id: string }) => (employee_id === supabaseStore.session?.user?.id))
                                    // extract all the table numbers from the filtered tables
                                    .map(({ table_number }: { table_number: number }) => table_number)
                                    // check if the table number matches the index
                                    .includes(index + 1);

                                return (
                                    <Styled.TableIcon
                                        key={index}
                                        isTableActive={isTableActive}
                                        onClick={() => appScripts.handleOpenNewTable(
                                            (index + 1).toString(), 
                                            {
                                                ...appStore, 
                                                ...supabaseStore, 
                                                isTableActive, 
                                                table: tablesQuery.data.find(({ table_number }: { table_number: number }) => (table_number === (index + 1)))
                                            }
                                        )}
                                    >
                                        {index + 1}
                                    </Styled.TableIcon>
                                )
                            })
                    }
                </Grid>
            </Grid>

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
                            // onClick={() => appStore.setActiveCategory(item.toLowerCase())}
                        />
                    ))}
                </BottomNavigation>
            </Styled.BottomNavWrapper>
        </Box>
    )
}

export default TableLayout
