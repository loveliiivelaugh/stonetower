// Packages
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// Utilities
import { paths, queries } from "../api";
// Styles
import { Styled } from "../theme/common";


// Types
interface ProductProps {
    id: number
    name: string
    recipe: string
    image: string
    category: string
    price: number
    description: string
    available: boolean
    imageName?: string[]
};

interface ImageProps {
    item: ProductProps
    handleClick?: () => void
    sx?: any
};

// Compoonent
const Image = ({
    // Props w/defaults
    item,
    handleClick = () => {},
    sx = {
        width: "100%",
        Height: "auto"
    }
}: ImageProps) => ( // Prop Types
    <Styled.PictureFrame
        component={motion.div}
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
    >
        <ImagePreLoader item={item}>
            {({ image }: { image: string }) => (
                <LazyLoadImage
                    alt={item.name}
                    height={sx?.height || "auto"}
                    src={image} // use normal <img> attributes as props
                    width={sx?.width || "100%"}
                />
            )}
        </ImagePreLoader>
    </Styled.PictureFrame>
);


export default Image;

interface ImagePreLoaderProps {
    item: ProductProps
    children: ({ image }: { image: string }) => JSX.Element
};

const ImagePreLoader = ({ item, children }: ImagePreLoaderProps) => {
    const name = ((item.imageName as string[])[0] || "");
    const imageQuery = useQuery(queries.query(paths.getImage + name));
    return ({
        error: <>Error Loading Image</>,
        pending: <></>,
        loading: <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px" }} />,
        success: children({ image: imageQuery.data }),
    }[imageQuery.status]);
};