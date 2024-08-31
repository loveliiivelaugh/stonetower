import { useRef, useState } from "react"
import { Box, Popover, Typography } from "@mui/material";
import { motion } from "framer-motion";

const ReusablePopover = (props: any) => {
    const { params } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const anchorRef = useRef<any | null>(null);

    return (
        <Box ref={anchorRef}>
            <Typography 
                pt={2} 
                variant="body2" 
                color="text.secondary" 
                sx={{ cursor: 'pointer' }} 
                component={motion.p} 
                onClick={() => setIsOpen(!isOpen)} 
                whileHover={{ scale: 1.1 }}
            >
                Hover for JSON
            </Typography>
            <Popover
                open={isOpen}
                anchorEl={anchorRef.current}
                onClose={() => setIsOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ p: 2 }}
            >
                <Typography sx={{ p: 2 }}>
                    {JSON.stringify(params.value, null, 2)}
                </Typography>
            </Popover>
        </Box>
    )
};

export default ReusablePopover