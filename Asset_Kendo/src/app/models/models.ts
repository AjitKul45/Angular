export class Asset {
  id!: number;
  tyape!: string;
  name!: string;
  proprietary!: string;
  configuration!: string;
  serviceTag!: string;
  model!: string;
  hostName!: string;
  oem!: string;
  expiryDate!: Date;
  owner!: string;
  remarks!: string;
  ram!: string;
  vendorId!: number;
}

export class Vendor {
  id!: number;
  name!: string;
  contactNo!: string;
  address!: string;
  registrationDate!: Date;
  terminationDate!: Date;
}
