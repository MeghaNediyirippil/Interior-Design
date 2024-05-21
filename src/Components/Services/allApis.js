import { BASEURL } from "./baseUrl";
import { commonAPI } from "./commonAPI";

// register API
export const registerAPI = async(body)=>{
    await commonAPI("POST",`${BASEURL}/register/`,body,"")
}

// login API
export const loginAPI = async(data)=>{
   return await commonAPI("POST",`${BASEURL}login/`,data,"")
}

// product list
export const productlistAPI = async(header)=>{
    return await commonAPI("GET",`${BASEURL}productlist/`,"",header)
 }

//  home category 
 export const diningroomlistAPI = async(id,header)=>{
    return await commonAPI("GET",`${BASEURL}homecategory/${id}`,{},header)
 }

 //  home category 
 export const officelistAPI = async(id,header)=>{
   return await commonAPI("GET",`${BASEURL}officecategory/${id}`,{},header)
}

//  home booking -pending
export const homedesignbookingAPI = async(id,body,header)=>{
   return await commonAPI("POST",`${BASEURL}homebook/${id}/book/`,body,header)
}

//  home category single item  
export const homecategorysingleitemAPI = async(id,header)=>{
   return await commonAPI("GET",`${BASEURL}homedetails/${id}`,{},header)
}

//  office category single item  
export const officecategorysingleitemAPI = async(id,header)=>{
   return await commonAPI("GET",`${BASEURL}officedetails/${id}`,{},header)
}

// office booking 
export const officedesignbookingAPI = async(id,body,header)=>{
   return await commonAPI("POST",`${BASEURL}officebook/${id}/book/`,body,header)
}





// export const homesingleviewAPI = async(id,header)=>{
//    return await commonAPI("GET",`${BASEURL}homecategory/${id}`,{},header)
// }
// add to cart
export const addTocartApi = async(id,quantity,body,header)=>{
   return await commonAPI("POST",`${BASEURL}AddToCart/ ${id}/${quantity}`,body,header)
}



// cartList
export const cartListApi = async(header)=>{
   return await commonAPI("GET",`${BASEURL}cartlist/ `,{},header)
}

// cartDelete
export const cartDeleteApi = async(id,header)=>{
   return await commonAPI("DELETE",`${BASEURL}cart/remove/${id}`,{},header)
}

// wishList
export const wishListApi = async(header)=>{
   return await commonAPI("GET",`${BASEURL}wishlistview/`,{},header)
}

// wishListDelete
export const wishListDeleteApi = async(id,header)=>{
   return await commonAPI("DELETE",`${BASEURL}wishlist/remove/${id}/`,{},header)
}


// // addToWishlist
// export const addTowishlistApi = async(id,body,header)=>{
//    return await commonAPI("POST",`${BASEURL}wishlist/add/ ${id}/`,body,header)
// }

// AGENT

// agent to add product
export const agentProductAdd = async(body,header)=>{
   return await commonAPI("POST",`${BASEURL}agent-product-create/`,body,header)
}

// get agent products
export const getProductsApi = async(id,header)=>{
   return await commonAPI("GET",`${BASEURL}agent-products/${id}/`,{},header)
}

// company list in header
export const getCompanylistApi= async()=>{
   return await commonAPI("GET",`${BASEURL}agent-list-view/`,{},"")
}

// view a particular agent products
export const viewsAgentProductDetails= async(id)=>{
   return await commonAPI("GET",`${BASEURL}agentproductdetails/${id}/`,{},"")
}

// view a particular product detail- agent product
export const viewSingleProductDetails= async(id)=>{
   return await commonAPI("GET",`${BASEURL}agentproductdetails/${id}/`,{},"")
}


export const agentproductbookingApi = async(id,body,header)=>{
   return await commonAPI("POST",`${BASEURL}agentproductbooking/${id}/book/`,body,header)
}

export const agentproductbookinglistApi = async(id,header)=>{
   return await commonAPI("GET",`${BASEURL}agent-products-book-details/${id}/`,{},header)
}
 
//buy
export const cartbuyApi=async(body,header)=>{
   return await commonAPI("POST",`${BASEURL}order/create/`,body,header)
}

// chat
export const message=async(id,body,header)=>{
   return await commonAPI("POST",`${BASEURL}messages/${id}/`,body,header)
}

export const viewmessage=async(id,header)=>{
   return await commonAPI("GET",`${BASEURL}listmessages/${id}/`,"",header)
}

// list messaged user
export const listuser=async(header)=>{
   return await commonAPI("GET",`${BASEURL}message-senders/`,{},header)
}

export const updatecart=async(id,body,header)=>{
   return await commonAPI("PUT",`${BASEURL}update-cart/${id}/`,body,header)
}


   