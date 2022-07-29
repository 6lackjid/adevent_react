export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

// auth

export interface PROPS_AUTHEN {
  email: string;
  password: string;
}

export interface PROPS_ACCOUNT {
  id: undefined;
  username: undefined;
  email: undefined;
  last_name: string;
  first_name: string;
  password: string;
  zip_code: string;
  address1: string;
  address2: string;
  address3: string;
  phone_number: number;
  user_icon: File | null;
  self_introduction: string;
}

export interface PROPS_EVENTS {
    id: undefined;
    jenre: string;
    title: string;
    eventpics: File | null;
    time: string;
    location: string;
    over_view: string;
  }
  