export const getWishlist = (): string[] => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
};

export const addToWishlist = (id: string): string[] => {
    const wishlist = getWishlist();
    if (!wishlist.includes(id)) {
        const updatedWishlist = [...wishlist, id];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        return updatedWishlist;
    }
    return wishlist;
};

export const removeFromWishlist = (id: string): string[] => {
    const wishlist = getWishlist();
    const updatedWishlist = wishlist.filter((item:any) => item !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    return updatedWishlist;
};
