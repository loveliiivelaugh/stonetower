import { Box, IconButton } from "@mui/material";
import { 
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon 
} from "@mui/icons-material";


const ChartButtons = (props: any) => {
    const buttons = [
        {
            label: "Add",
            value: "add",
            icon: <AddIcon />
        },
        {
            label: "Edit",
            value: "edit",
            icon: <EditIcon />
        },
        {
            label: "Delete",
            value: "delete",
            icon: <DeleteIcon />
        }
    ];

    return (
        <Box sx={{ display:"flex", justifyContent: "flex-end", gap: 1 }}>
            {buttons.map((button) => (
                <IconButton
                    key={`${button.value}-chart-button`}
                    // variant="contained"
                    color="inherit"
                    size="small"
                    onClick={() => props.handleClick(button.value)}
                >
                    {button.icon || button.label}
                </IconButton>
            ))}
        </Box>
    );
};

export default ChartButtons;