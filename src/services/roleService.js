export const sellerOnly = (userState) => {
    return userState?.role?.name == "SELLER";
}

export const adminOnly = (userState) => {
    return userState?.role?.name == "ADMIN";
}

export const buyerOnly = (userState) => {
    return userState?.role?.name == "BUYER";
}

export const buyerView = (userState) => {
    return publicOnly(userState) || buyerOnly(userState);
}

export const sellerView = (userState) => {
    return publicOnly(userState) || sellerOnly(userState);
}

export const adminView = (userState) => {
    return publicOnly(userState) || sellerOnly(userState);
}

export const publicOnly =(userState) => {
    return !loggedInOnly(userState);
}

export const loggedInOnly = (userState) => {
    return ["ADMIN", "BUYER", "SELLER"].includes(userState?.role?.name);
}

export const approvedSellerOnly = (userState) => {
    return sellerOnly(userState) && userState.isSellerApproved === true;
}