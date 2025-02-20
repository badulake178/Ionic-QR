export interface User {
  id: string,
  name: string,
  email:string,
  password?: string,
  ubicacion?: Local
}

export interface Local {
  id: string,
  name: string,
  comuna: string,
  provincia: string,
  region: string,
}
