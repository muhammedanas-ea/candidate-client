export interface SidebarLink {
  id: number;
  name: string;
  path?: string;
  icon?: React.ReactNode;
  subMenu?: {
    id: number;
    name: string;
    path: string;
  }[];
}

export interface LoginProps {
    username: string,
    password: string,
}

export interface CandidateProps{
  userName: string,
  mobileNumber: string,
  email: string,
  password: string,
  address: string,
}

export interface Candidate {
  _id: string;
  username: string;
  email: string;
  phone: string;
  userKey: string;
  profileImage?: { url?: string };
}

export interface ProfileDetails {
  username?: string;
  email?: string;
  phone?: string;
  userKey?: string;
  profileImage?: { url?: string };
  resume?: { url?: string };
  address?:string
}