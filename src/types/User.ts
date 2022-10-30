type User = {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: {
    _id: string;
    name: string;
    permissions?: {
      _id: string;
      name: string;
    }[];
  };
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  permissions: {
    _id: string;
    name: string;
  }[];
  isLoggedIn: boolean;
  orders?: any[];
};

export default User;
