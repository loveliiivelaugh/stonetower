// Packages
// import { useQuery } from "@tanstack/react-query";
// import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// Utilities
// import { paths, queries } from "../api";
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
    item?: ProductProps
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
}: ImageProps | any) => ( // Prop Types
    <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
    >
        <Styled.PictureFrame>
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
    </motion.div>
);


export default Image;

interface ImagePreLoaderProps {
    item: ProductProps
    children: ({ image }: { image: string }) => JSX.Element
};

const ImagePreLoader = ({ item, children }: ImagePreLoaderProps) => {
    console.log("ImagePreLoader.item: ", item);
    return children({ image: item.image });
}
// const ImagePreLoader2 = ({ item, children }: ImagePreLoaderProps) => {
//     // const name = ((item.imageName as string[])[0] || "");
//     // const imageQuery = useQuery(queries.query(paths.getImage + name));
//     const imageQuery = useQuery(queries.query(item.image));
//     return ({
//         pending: <></>,
//         loading: <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px" }} />,
//         error: <Skeleton variant="rectangular" sx={{ width: "200px", height: "200px" }}>Error Loading Image</Skeleton>,
//         success: children({ image: imageQuery.data }),
//     }[imageQuery.status]);
// };