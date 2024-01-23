export const ACCOUNTS_LOGIN = "accounts/login/";
export const ACCOUNTS_REGISTER = "accounts/register/";
export const ACCOUNTS_PROFILE = "accounts/profile/";
export const ACCOUNTS_PROFILE_UPDATE = "accounts/profile-update/";
export const ACCOUNTS_SEND_OTP = "accounts/send-otp/";
export const ACCOUNTS_RESET_PASSWORD = "accounts/reset-password/";
export const ACCOUNTS_TOKEN_REFRESH = "accounts/token-refresh/";
export const ACCOUNTS_LOGOUT = "accounts/logout/";

export const PRODUCTS = "api/v1/products/";
export const PRODUCT_BY_ID = (id) => `products/${id}/`;
export const CREATE_PRODUCT_REVIEW = (productId) =>
  `products/${productId}/create_review/`;
export const RECOMMENDED_PRODUCTS = "api/v1/products/recommended/";

export const CATEGORIES = "api/v1/categories/";
export const CATEGORY_BY_ID = (id) => `categories/${id}/`;

export const ORDERS = "api/v1/orders/";
export const ORDER_BY_ID = (id) => `orders/${id}/`;
export const CREATE_ORDER = "api/v1/orders/";
export const MARK_ORDER_AS_PAID = (id) => `orders/${id}/mark_as_paid/`;
export const DELETE_ORDER = (id) => `orders/${id}/`;

export const USERS = "accounts/users/";
export const USER_BY_ID = (id) => `accounts/users/${id}/`;
export const USERS_STAFF = "api/v1/accounts/users_staff/";

export const CREATE_PRODUCT = "api/v1/products/";
export const DELETE_PRODUCT = (id) => `products/${id}/`;

export const CREATE_CATEGORY = "api/v1/categories/";
export const DELETE_CATEGORY = (id) => `categories/${id}/`;

export const MARK_ORDER_AS_DELIVERED = (id) =>
  `orders/${id}/mark_as_delivered/`;
