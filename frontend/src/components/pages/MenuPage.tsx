// Packages
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Tabs, Tab, Toolbar } from "@mui/material";
// Components
import ProductsSection from "./Landing/ProductsSection";
// Styles
import { Styled } from "../../theme/common";

// Constants
const categoryMap = {
    favorites: "favorites",
    pizzas: "pizzas",
    appetizers: "appetizers",
    drinks: "drinks",
    desserts: "desserts"
};

// Component
const MenuPage = (
    { defaultCategory = "favorites" }: // Props w/default
    { defaultCategory?: string } // Prop Types
) => {
    // Hooks
    const params = useParams();
    const [value, setValue] = useState(
        params?.category 
            ? params.category 
            : defaultCategory
    );

    // Render
    return (
        <Grid container>
            <Toolbar sx={{ my: 1 }} />
            <Styled.GridSection item sm={12}>
                <Toolbar>
                    <Tabs 
                        variant="fullWidth" 
                        value={value} 
                        onChange={(_: ChangeEvent<{}>, newValue: string) => setValue(newValue)}
                    >
                        {Object.keys(categoryMap).map((category: string) => (
                            <Tab label={category} key={category} value={category} />
                        ))}
                    </Tabs>
                </Toolbar>
            </Styled.GridSection>
            <Grid item sm={12} sx={{ height: "100vh" }}>
                <ProductsSection 
                    header={false} 
                    filterMap={(key) => (value === defaultCategory) 
                        || (key === categoryMap[value as keyof typeof categoryMap])
                    }
                />
            </Grid>
        </Grid>
    )
}

export default MenuPage