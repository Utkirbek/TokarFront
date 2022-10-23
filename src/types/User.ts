type User = {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  permissions: string[];
  isLoggedIn: boolean;
};

export default User;
