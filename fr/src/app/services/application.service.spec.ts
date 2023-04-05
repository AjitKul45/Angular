import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApplicationService } from './application.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let http: jasmine.SpyObj<HttpClient>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    let httpspy = jasmine.createSpyObj('HttpClient', ['get', 'delete', 'post']);
    TestBed.configureTestingModule({
      providers: [
        ApplicationService,
        {
          provide: HttpClient,
          useValue: httpspy,
        },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApplicationService);
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('VendorService', () => {
    let VENDORS = [
      {
        id: 1,
        name: 'DEll',
        contactNo: '12345678',
        address: 'asdfghjkl',
        registrationDate: '2023-02-06T00:00:00',
        terminationDate: '2023-02-06T00:00:00',
      },
      {
        id: 2,
        name: 'DE',
        contactNo: '12345678',
        address: 'asdfghjkl',
        registrationDate: '2023-02-06T00:00:00',
        terminationDate: '2023-02-06T00:00:00',
      },
      {
        id: 3,
        name: 'Digital Providers',
        contactNo: '12345',
        address: 'pune',
        registrationDate: '2023-02-16T00:00:00',
        terminationDate: '2023-03-11T00:00:00',
      },
    ];

    it('should return expected vendors when getVendors is called', (done: DoneFn) => {
      http.get.and.returnValue(of(VENDORS));
      service.getVendors().subscribe({
        next: (vendors) => {
          expect(vendors).toEqual(VENDORS);
          done();
        },
        error: (err) => {
          done.fail();
        },
      });
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should return specific vendor', () => {
      http.get.and.returnValue(of(VENDORS[1]));
      service.getVendorById(2).subscribe({
        next: (vendor) => {
          expect(vendor).toEqual(VENDORS[1]);
        },
        error: (err) => {
          console.log(err);
        },
      });
      expect(http.get).toHaveBeenCalledTimes(1);
    });

    it('should delete specific vendor when vendorid is passed', () => {
      http.delete.and.returnValue(of());
      service.deleteVender(2).subscribe({
        next: (res) => {
          console.log(res);
          expect(res).toEqual(2);
        },
        error: (err) => {
          console.log(err);
        },
      });
      expect(http.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw error when invalid vendor id is passed to getVendorById', (done: DoneFn) => {
      // http.get.and.returnValue(of(VENDORS[1]));
      http.get.and.returnValue(of(VENDORS[1]));
      // expect(() => service.getVendorById(2345))
      let res = service.getVendorById(23453);
      console.log(res);
    });

    it('should add vendor to when addVendor is called', () => {
      http.post.and.returnValue(of(VENDORS[1]));
      service.addVendor(VENDORS[1]).subscribe({
        next: (res) => {
          expect(res).toEqual(VENDORS[1]);
        },
        error: (err) => {
          console.log(err);
        },
      });
      expect(http.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Assets', () => {
    let ASSETS = [
      {
        id: 21,
        tyape: 'Laptop',
        name: 'thinkpad',
        proprietary: 'Own',
        configuration: 'I5 10th gen',
        serviceTag: 'NIT123',
        model: 'iu',
        hostName: 'iuh',
        oem: 'Yes',
        expiryDate: '2023-02-18T00:00:00',
        owner: 'iugsdsaa',
        remarks: 'Released by Pratik',
        ram: '16 gb',
        vendorId: 1,
      },
      {
        id: 24,
        tyape: 'Laptop',
        name: 'Legion 5',
        proprietary: 'Rent',
        configuration: 'I5 10th gen',
        serviceTag: 'NIT12',
        model: 'iu',
        hostName: 'iuh',
        oem: 'Yes',
        expiryDate: '2023-02-18T00:00:00',
        owner: 'xyx',
        remarks: 'OK',
        ram: '32 gb',
        vendorId: 2,
      },
    ];

    it('should return expected assets when getAsset() is called', (done: DoneFn) => {
      http.get.and.returnValue(of(ASSETS));
      service.getAssets().subscribe({
        next: (res) => {
          console.log(res);
          expect(res).toEqual(ASSETS);
          done();
        },
      });
      expect(http.get).toHaveBeenCalledTimes(1);
    });
    it('should return specific asset when assetid is passed to getAsset()', (done: DoneFn) => {
      http.get.and.returnValue(of(ASSETS[1]));
      service.getAsset(24).subscribe({
        next: (res) => {
          expect(res).toEqual(ASSETS[1]);
          done();
        },
      });
      expect(http.get).toHaveBeenCalledTimes(1);
    });
    it('should delete asset when deleteAsset() is called', (done: DoneFn) => {
      http.delete.and.returnValue(of(true));
      service.deleteAsset(24).subscribe({
        next: (res) => {
          expect(res).toBeTruthy();
          done();
        },
      });
      expect(http.delete).toHaveBeenCalledTimes(1);
    });
    it('should add asset when addAsset() is called', (done: DoneFn) => {
      http.post.and.returnValue(of(ASSETS[1]));
      service.addAsset(ASSETS[1]).subscribe({
        next: (res) => {
          expect(res).toEqual(ASSETS[1]);
          done();
        },
      });
      expect(http.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('Asset Trasancations', () => {
    let ASSETTRANSACTONS = [
      {
        assetId: 1,
        assetName: 'string',
        assetType: 'string',
        transactionId: 1,
        empId: 'string',
        email: 'string',
        username: 'string',
        location: 'string',
        issueDate: 'string',
        issuedBy: 'string',
        submitDate: 'string',
        department: 'string',
      },
      {
        assetId: 2,
        assetName: 'string',
        assetType: 'string',
        transactionId: 2,
        empId: 'string',
        email: 'string',
        username: 'string',
        location: 'string',
        issueDate: 'string',
        issuedBy: 'string',
        submitDate: 'string',
        department: 'string',
      },
    ];

    it('should return expected result when ', (done: DoneFn) => {
      http.get.and.returnValue(of(ASSETTRANSACTONS));
      service.getDetailTransactions().subscribe({
        next: (res) => {
          expect(res).toEqual(ASSETTRANSACTONS);
          done();
        },
      });
      expect(http.get).toHaveBeenCalledTimes(1);
    });
    it('should return specific transaction when transaction id is passed to getTransaction()', (done: DoneFn) => {
      http.get.and.returnValue(of(ASSETTRANSACTONS[0]));
      service.getTransaction(1).subscribe({
        next: (res) => {
          expect(res).toEqual(ASSETTRANSACTONS[0]);
          done();
        },
      });
      expect(http.get).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
