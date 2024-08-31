// Scripts to help load the menu item data into Stripe ...
// ... also to automatically generate the menu images using AI


    // ?? A little script to generate menu images
    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function generateResponses(items: any[]) {
        const responses = [];
    
        for (const item of items) {
            // const response = (await client.post('/stripe/product', convertToStripeProduct(item))).data;
            const response = {}
            // console.log("generateResponses: " + item.id, response);
            responses.push(response);
            await delay(5500); // 5.5-second delay
        }
    
        return responses;
    }; 

    // const sortMatchingValuesToObject = async () => {
    //     // const response = await generateResponses(pizzaNames);
    //     const keys =  Object.keys(items);
    //     const allMenu = keys.map(key => items[key as keyof typeof items]);
    //     // const menuItems = Object.assign({}, ...allMenu);
    //     const flatMenu = allMenu.flat();
    //     console.log("Full Menu: ", flatMenu, "imageNames: ", imageNames);

    //     // *** This logic works really good ***
    //     const getImageNames = (name: string) => {
    //         const images = imageNames.map((imageName: string) => imageName.split(".png")[0]);
    //         const matches = [];
    //         for (const image of images) {
    //             const result = fuzzysort.single(name.toLowerCase(), image.toLowerCase());
    //             if (result && (result.score > 0.8)) {
    //                 matches.push(image + ".png");
    //             }
    //         }
    //         return matches
    //     }
    
    //     const allItems = flatMenu.map(item => {
    //         return {
    //             ...item,
    //             imageName: getImageNames(item.name) 
    //         }
    //     })
    //     console.log("handleRunImages: ", allItems);
    // };
