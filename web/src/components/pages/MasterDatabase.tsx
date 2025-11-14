import { Database, UserPlus, Search, Filter, Edit, Trash2, Eye, Upload, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';

interface EmployeeRecord {
  // Basic Info
  sNo: number;
  salutation: string;
  employeesFullName: string;
  employeeId: string;
  nameAsPerAadhar: string;
  employeeStatus: string;
  employeeOnlineId: string;
  
  // Dates
  doj: string;
  dobGovt: string;
  dobActual: string;
  
  // Organization
  department: string;
  subDivision: string;
  designation: string;
  reportingManager: string;
  clientTeam: string;
  location: string;
  
  // Personal Details
  fatherName: string;
  bloodGroup: string;
  mothersMaidenName: string;
  
  // Government IDs
  panNo: string;
  passportNumber: string;
  passportExpiry: string;
  aadhaarCardNo: string;
  uanNo: string;
  
  // Banking
  bankAccount: string;
  nameAsPerAccount: string;
  ifscCode: string;
  
  // Contact
  officialPhoneNo: string;
  mobileNoOfficial: string;
  mobileNoPersonal: string;
  emergencyContactPrimary: string;
  emergencyContactSecondary: string;
  personalEmailId: string;
  officialEmailId: string;
  
  // Address
  residentialAddress: string;
  permanentAddress: string;
  
  // Additional
  nameAsPerPassport: string;
  customerIdForFoodCard: string;
  maternityLeavePlans: string;
  paternityLeavePlans: string;
}

export function MasterDatabase() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([
    {
      sNo: 1,
      salutation: 'Mr.',
      employeesFullName: 'Arjun Joshi',
      employeeId: 'INT-EMP-9322',
      nameAsPerAadhar: 'Arjun Joshi',
      employeeStatus: 'Pending',
      employeeOnlineId: 'INT-EMP-9322',
      doj: '04 May 2019',
      dobGovt: '10 Jan 1983',
      dobActual: '10 Jan 1983',
      department: 'Product',
      subDivision: '',
      designation: 'Chief Product Officer (CPO)',
      reportingManager: 'Meera Goel',
      clientTeam: '',
      location: 'Hyderabad',
      fatherName: 'Mahesh Joshi',
      bloodGroup: 'O-',
      mothersMaidenName: '',
      panNo: 'OUQDL2586R',
      passportNumber: 'I9978574',
      passportExpiry: '04 May 2025',
      aadhaarCardNo: '057869226320',
      uanNo: '856614235226',
      bankAccount: 'OPHV0125445',
      nameAsPerAccount: 'Arjun Joshi',
      ifscCode: 'INT-901',
      officialPhoneNo: '8719515005',
      mobileNoOfficial: '8719515005',
      mobileNoPersonal: '8719515005',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'arjun.joshi@introlligent.com',
      officialEmailId: 'arjun.joshi@introlligent.com',
      residentialAddress: 'INT-901',
      permanentAddress: 'INT-317',
      nameAsPerPassport: 'Arjun Joshi',
      customerIdForFoodCard: 'INT-199',
      maternityLeavePlans: '',
      paternityLeavePlans: '',
    },
    {
      sNo: 2,
      salutation: 'Mr.',
      employeesFullName: 'Rohan Iyer',
      employeeId: 'INT-EMP-7551',
      nameAsPerAadhar: 'Rohan Iyer',
      employeeStatus: 'In Progress',
      employeeOnlineId: 'INT-EMP-7551',
      doj: '11 Jan 2024',
      dobGovt: '10 Aug 1990',
      dobActual: '10 Aug 1990',
      department: 'Engineering',
      subDivision: '',
      designation: 'Chief Technology Officer (CTO)',
      reportingManager: 'Meera Goel',
      clientTeam: '',
      location: 'Mumbai',
      fatherName: 'Arun Iyer',
      bloodGroup: 'AB-',
      mothersMaidenName: '',
      panNo: 'WDEMX8470X',
      passportNumber: 'R3403652',
      passportExpiry: '11 Jan 2029',
      aadhaarCardNo: '546031818261',
      uanNo: '564809367961',
      bankAccount: 'GASE0149451',
      nameAsPerAccount: 'Rohan Iyer',
      ifscCode: 'INT-406',
      officialPhoneNo: '7530113095',
      mobileNoOfficial: '7530113095',
      mobileNoPersonal: '7530113095',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'rohan.iyer@introlligent.com',
      officialEmailId: 'rohan.iyer@introlligent.com',
      residentialAddress: 'INT-406',
      permanentAddress: 'INT-153',
      nameAsPerPassport: 'Rohan Iyer',
      customerIdForFoodCard: 'INT-191',
      maternityLeavePlans: '',
      paternityLeavePlans: '',
    },
    {
      sNo: 3,
      salutation: 'Mr.',
      employeesFullName: 'Kunal Monga',
      employeeId: 'INT-EMP-9642',
      nameAsPerAadhar: 'Kunal Monga',
      employeeStatus: 'In Progress',
      employeeOnlineId: 'INT-EMP-9642',
      doj: '22 Sep 2023',
      dobGovt: '12 Jan 1980',
      dobActual: '12 Jan 1980',
      department: 'IT',
      subDivision: '',
      designation: 'Chief Information Officer (CIO)',
      reportingManager: 'Rohan Iyer',
      clientTeam: '',
      location: 'Mumbai',
      fatherName: 'Kishore Monga',
      bloodGroup: 'B+',
      mothersMaidenName: '',
      panNo: 'OAWCN1686G',
      passportNumber: 'D1723865',
      passportExpiry: '22 Sep 2031',
      aadhaarCardNo: '745898142694',
      uanNo: '230117148207',
      bankAccount: 'SIMD0150099',
      nameAsPerAccount: 'Kunal Monga',
      ifscCode: 'INT-348',
      officialPhoneNo: '6404259218',
      mobileNoOfficial: '6404259218',
      mobileNoPersonal: '6404259218',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'kunal.monga@introlligent.com',
      officialEmailId: 'kunal.monga@introlligent.com',
      residentialAddress: 'INT-348',
      permanentAddress: 'INT-331',
      nameAsPerPassport: 'Kunal Monga',
      customerIdForFoodCard: 'INT-635',
      maternityLeavePlans: '',
      paternityLeavePlans: '',
    },
    {
      sNo: 4,
      salutation: 'Ms.',
      employeesFullName: 'Nisha Chawla',
      employeeId: 'INT-EMP-9913',
      nameAsPerAadhar: 'Nisha Chawla',
      employeeStatus: 'Pending',
      employeeOnlineId: 'INT-EMP-9913',
      doj: '20 May 2024',
      dobGovt: '22 Sep 1998',
      dobActual: '22 Sep 1998',
      department: 'Operations',
      subDivision: '',
      designation: 'Chief Operating Officer (COO)',
      reportingManager: 'Meera Goel',
      clientTeam: '',
      location: 'Pune',
      fatherName: 'Nitin Chawla',
      bloodGroup: 'B+',
      mothersMaidenName: '',
      panNo: 'FUCAU2138P',
      passportNumber: 'P7631736',
      passportExpiry: '20 May 2029',
      aadhaarCardNo: '377669560147',
      uanNo: '812762021114',
      bankAccount: 'BQOZ0651860',
      nameAsPerAccount: 'Nisha Chawla',
      ifscCode: 'INT-485',
      officialPhoneNo: '9027630782',
      mobileNoOfficial: '9027630782',
      mobileNoPersonal: '9027630782',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'nisha.chawla@introlligent.com',
      officialEmailId: 'nisha.chawla@introlligent.com',
      residentialAddress: 'INT-485',
      permanentAddress: 'INT-198',
      nameAsPerPassport: 'Nisha Chawla',
      customerIdForFoodCard: 'INT-107',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
    {
      sNo: 5,
      salutation: 'Mr.',
      employeesFullName: 'Kabir Joshi',
      employeeId: 'INT-EMP-2197',
      nameAsPerAadhar: 'Kabir Joshi',
      employeeStatus: 'Completed',
      employeeOnlineId: 'INT-EMP-2197',
      doj: '30 Apr 2025',
      dobGovt: '08 Oct 1992',
      dobActual: '08 Oct 1992',
      department: 'Customer Success',
      subDivision: '',
      designation: 'Head of Customer Success',
      reportingManager: 'Minal Monga',
      clientTeam: '',
      location: 'Mumbai',
      fatherName: 'Arun Joshi',
      bloodGroup: 'AB+',
      mothersMaidenName: '',
      panNo: 'YBOTX9836R',
      passportNumber: 'Y4399330',
      passportExpiry: '30 Apr 2030',
      aadhaarCardNo: '287816977456',
      uanNo: '323626889937',
      bankAccount: 'EWJD0052130',
      nameAsPerAccount: 'Kabir Joshi',
      ifscCode: 'INT-752',
      officialPhoneNo: '9686717378',
      mobileNoOfficial: '9686717378',
      mobileNoPersonal: '9686717378',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'kabir.joshi@introlligent.com',
      officialEmailId: 'kabir.joshi@introlligent.com',
      residentialAddress: 'INT-752',
      permanentAddress: 'INT-338',
      nameAsPerPassport: 'Kabir Joshi',
      customerIdForFoodCard: 'INT-522',
      maternityLeavePlans: '',
      paternityLeavePlans: 'Eligible',
    },
    {
      sNo: 6,
      salutation: 'Ms.',
      employeesFullName: 'Swati Khandelwal',
      employeeId: 'INT-EMP-5921',
      nameAsPerAadhar: 'Swati Khandelwal',
      employeeStatus: 'In Progress',
      employeeOnlineId: 'INT-EMP-5921',
      doj: '03 Dec 2024',
      dobGovt: '18 Feb 1976',
      dobActual: '18 Feb 1976',
      department: 'IT',
      subDivision: '',
      designation: 'IT Support Lead',
      reportingManager: 'Kunal Monga',
      clientTeam: '',
      location: 'Chennai',
      fatherName: 'Mahesh Khandelwal',
      bloodGroup: 'B-',
      mothersMaidenName: '',
      panNo: 'ODTNS5015T',
      passportNumber: 'U7178839',
      passportExpiry: '03 Dec 2033',
      aadhaarCardNo: '191479602241',
      uanNo: '473902152512',
      bankAccount: 'WSAN0570139',
      nameAsPerAccount: 'Swati Khandelwal',
      ifscCode: 'INT-836',
      officialPhoneNo: '8320081578',
      mobileNoOfficial: '8320081578',
      mobileNoPersonal: '8320081578',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'swati.khandelwal@introlligent.com',
      officialEmailId: 'swati.khandelwal@introlligent.com',
      residentialAddress: 'INT-836',
      permanentAddress: 'INT-556',
      nameAsPerPassport: 'Swati Khandelwal',
      customerIdForFoodCard: 'INT-113',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
    {
      sNo: 7,
      salutation: 'Ms.',
      employeesFullName: 'Simran Gupta',
      employeeId: 'INT-EMP-2642',
      nameAsPerAadhar: 'Simran Gupta',
      employeeStatus: 'Completed',
      employeeOnlineId: 'INT-EMP-2642',
      doj: '20 Dec 2018',
      dobGovt: '06 Dec 1988',
      dobActual: '06 Dec 1988',
      department: 'Finance',
      subDivision: '',
      designation: 'Chief Financial Officer (CFO)',
      reportingManager: 'Meera Goel',
      clientTeam: '',
      location: 'Chennai',
      fatherName: 'Karan Gupta',
      bloodGroup: 'A-',
      mothersMaidenName: '',
      panNo: 'NCAFB3819K',
      passportNumber: 'X5943436',
      passportExpiry: '20 Dec 2026',
      aadhaarCardNo: '484556232415',
      uanNo: '743061770525',
      bankAccount: 'PZLJ0314338',
      nameAsPerAccount: 'Simran Gupta',
      ifscCode: 'INT-724',
      officialPhoneNo: '6158792172',
      mobileNoOfficial: '6158792172',
      mobileNoPersonal: '6158792172',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'simran.gupta@introlligent.com',
      officialEmailId: 'simran.gupta@introlligent.com',
      residentialAddress: 'INT-724',
      permanentAddress: 'INT-472',
      nameAsPerPassport: 'Simran Gupta',
      customerIdForFoodCard: 'INT-228',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
    {
      sNo: 8,
      salutation: 'Ms.',
      employeesFullName: 'Sneha Rao',
      employeeId: 'INT-EMP-3637',
      nameAsPerAadhar: 'Sneha Rao',
      employeeStatus: 'Pending',
      employeeOnlineId: 'INT-EMP-3637',
      doj: '15 Feb 2025',
      dobGovt: '10 Jun 2001',
      dobActual: '10 Jun 2001',
      department: 'Engineering',
      subDivision: '',
      designation: 'Frontend Lead',
      reportingManager: 'Rohan Iyer',
      clientTeam: '',
      location: 'Hyderabad',
      fatherName: 'Suresh Rao',
      bloodGroup: 'A+',
      mothersMaidenName: '',
      panNo: 'GHNSO2671H',
      passportNumber: 'V1507812',
      passportExpiry: '15 Feb 2033',
      aadhaarCardNo: '830254667082',
      uanNo: '602680390860',
      bankAccount: 'GCJW0294195',
      nameAsPerAccount: 'Sneha Rao',
      ifscCode: 'INT-800',
      officialPhoneNo: '8317201939',
      mobileNoOfficial: '8317201939',
      mobileNoPersonal: '8317201939',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'sneha.rao@introlligent.com',
      officialEmailId: 'sneha.rao@introlligent.com',
      residentialAddress: 'INT-800',
      permanentAddress: 'INT-349',
      nameAsPerPassport: 'Sneha Rao',
      customerIdForFoodCard: 'INT-257',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
    {
      sNo: 9,
      salutation: 'Ms.',
      employeesFullName: 'Minal Monga',
      employeeId: 'INT-EMP-3326',
      nameAsPerAadhar: 'Minal Monga',
      employeeStatus: 'Completed',
      employeeOnlineId: 'INT-EMP-3326',
      doj: '13 Oct 2020',
      dobGovt: '29 May 1969',
      dobActual: '29 May 1969',
      department: 'Sales',
      subDivision: '',
      designation: 'Chief Revenue Officer (CRO)',
      reportingManager: 'Nisha Chawla',
      clientTeam: '',
      location: 'Mumbai',
      fatherName: 'Deepak Monga',
      bloodGroup: 'O-',
      mothersMaidenName: '',
      panNo: 'ZCBJZ8560P',
      passportNumber: 'W3247416',
      passportExpiry: '13 Oct 2026',
      aadhaarCardNo: '721528239552',
      uanNo: '044132596647',
      bankAccount: 'TNLW0077095',
      nameAsPerAccount: 'Minal Monga',
      ifscCode: 'INT-973',
      officialPhoneNo: '8506964165',
      mobileNoOfficial: '8506964165',
      mobileNoPersonal: '8506964165',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'minal.monga@introlligent.com',
      officialEmailId: 'minal.monga@introlligent.com',
      residentialAddress: 'INT-973',
      permanentAddress: 'INT-119',
      nameAsPerPassport: 'Minal Monga',
      customerIdForFoodCard: 'INT-138',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
    {
      sNo: 10,
      salutation: 'Ms.',
      employeesFullName: 'Meera Goel',
      employeeId: 'INT-EMP-5601',
      nameAsPerAadhar: 'Meera Goel',
      employeeStatus: 'Completed',
      employeeOnlineId: 'INT-EMP-5601',
      doj: '14 Feb 2024',
      dobGovt: '04 Jan 1966',
      dobActual: '04 Jan 1966',
      department: 'Executive',
      subDivision: '',
      designation: 'Chief Executive Officer (CEO)',
      reportingManager: '',
      clientTeam: '',
      location: 'Hyderabad',
      fatherName: 'Amit Goel',
      bloodGroup: 'A+',
      mothersMaidenName: '',
      panNo: 'ZCWSW0410R',
      passportNumber: 'A2443612',
      passportExpiry: '14 Feb 2033',
      aadhaarCardNo: '811219308375',
      uanNo: '892102234571',
      bankAccount: 'AZQJ0829340',
      nameAsPerAccount: 'Meera Goel',
      ifscCode: 'INT-581',
      officialPhoneNo: '6872141317',
      mobileNoOfficial: '6872141317',
      mobileNoPersonal: '6872141317',
      emergencyContactPrimary: '',
      emergencyContactSecondary: '',
      personalEmailId: 'meera.goel@introlligent.com',
      officialEmailId: 'meera.goel@introlligent.com',
      residentialAddress: 'INT-581',
      permanentAddress: 'INT-895',
      nameAsPerPassport: 'Meera Goel',
      customerIdForFoodCard: 'INT-745',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
    {
      sNo: 11,
      salutation: 'Ms.',
      employeesFullName: 'Ritika Sharma',
      employeeId: 'INT-EMP-1135',
      nameAsPerAadhar: 'Ritika Sharma',
      employeeStatus: 'Completed',
      employeeOnlineId: 'INT-EMP-1135',
      doj: '15 Feb 2022',
      dobGovt: '18 Jul 1995',
      dobActual: '18 Jul 1995',
      department: 'Engineering',
      subDivision: 'Backend Development',
      designation: 'Software Engineer II (Backend)',
      reportingManager: 'Rohan Iyer',
      clientTeam: '',
      location: 'Mumbai',
      fatherName: 'Vijay Sharma',
      bloodGroup: 'O+',
      mothersMaidenName: 'Kavita Sharma',
      panNo: 'QWERT4521B',
      passportNumber: 'S7639210',
      passportExpiry: '15 Feb 2032',
      aadhaarCardNo: '488563229410',
      uanNo: '812762020111',
      bankAccount: 'QWER0051982',
      nameAsPerAccount: 'Ritika Sharma',
      ifscCode: 'INT-601',
      officialPhoneNo: '9024511182',
      mobileNoOfficial: '9024511182',
      mobileNoPersonal: '9824511182',
      emergencyContactPrimary: '9874511183',
      emergencyContactSecondary: '',
      personalEmailId: 'ritika.sharma@introlligent.com',
      officialEmailId: 'ritika.sharma@introlligent.com',
      residentialAddress: 'Flat 302, Palm Residency, Mumbai',
      permanentAddress: 'B-92, Andheri East, Mumbai',
      nameAsPerPassport: 'Ritika Sharma',
      customerIdForFoodCard: 'INT-601',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
    {
      sNo: 12,
      salutation: 'Mr.',
      employeesFullName: 'Tushar Mehta',
      employeeId: 'INT-EMP-1187',
      nameAsPerAadhar: 'Tushar Mehta',
      employeeStatus: 'Completed',
      employeeOnlineId: 'INT-EMP-1187',
      doj: '10 Nov 2021',
      dobGovt: '03 Oct 1993',
      dobActual: '03 Oct 1993',
      department: 'Engineering',
      subDivision: 'Frontend Development',
      designation: 'UI Developer',
      reportingManager: 'Sneha Rao',
      clientTeam: '',
      location: 'Bengaluru',
      fatherName: 'Rakesh Mehta',
      bloodGroup: 'B+',
      mothersMaidenName: 'Anita Mehta',
      panNo: 'KLOPM5123C',
      passportNumber: 'N8496017',
      passportExpiry: '10 Nov 2031',
      aadhaarCardNo: '671223981044',
      uanNo: '720912338421',
      bankAccount: 'PLMN0987211',
      nameAsPerAccount: 'Tushar Mehta',
      ifscCode: 'INT-533',
      officialPhoneNo: '8094112268',
      mobileNoOfficial: '8094112268',
      mobileNoPersonal: '7894112268',
      emergencyContactPrimary: '9034112269',
      emergencyContactSecondary: '',
      personalEmailId: 'tushar.mehta@introlligent.com',
      officialEmailId: 'tushar.mehta@introlligent.com',
      residentialAddress: 'Whitefield Main Road, Bengaluru',
      permanentAddress: 'Sector 12, Gurugram',
      nameAsPerPassport: 'Tushar Mehta',
      customerIdForFoodCard: 'INT-533',
      maternityLeavePlans: '',
      paternityLeavePlans: 'Eligible',
    },
    {
      sNo: 13,
      salutation: 'Ms.',
      employeesFullName: 'Sneha Patel',
      employeeId: 'INT-EMP-1223',
      nameAsPerAadhar: 'Sneha Patel',
      employeeStatus: 'In Progress',
      employeeOnlineId: 'INT-EMP-1223',
      doj: '05 Apr 2023',
      dobGovt: '22 Feb 1998',
      dobActual: '22 Feb 1998',
      department: 'Sales',
      subDivision: 'SEO & Content',
      designation: 'Content Strategist',
      reportingManager: 'Minal Monga',
      clientTeam: '',
      location: 'Pune',
      fatherName: 'Ramesh Patel',
      bloodGroup: 'AB+',
      mothersMaidenName: 'Nirmala Patel',
      panNo: 'XCVBN6294A',
      passportNumber: 'Z1983275',
      passportExpiry: '05 Apr 2033',
      aadhaarCardNo: '881245399912',
      uanNo: '810937502114',
      bankAccount: 'BNMP0042112',
      nameAsPerAccount: 'Sneha Patel',
      ifscCode: 'INT-704',
      officialPhoneNo: '9124567823',
      mobileNoOfficial: '9124567823',
      mobileNoPersonal: '9824567823',
      emergencyContactPrimary: '9974567823',
      emergencyContactSecondary: '',
      personalEmailId: 'sneha.patel@introlligent.com',
      officialEmailId: 'sneha.patel@introlligent.com',
      residentialAddress: 'Kalyani Nagar, Pune',
      permanentAddress: 'Vadodara, Gujarat',
      nameAsPerPassport: 'Sneha Patel',
      customerIdForFoodCard: 'INT-704',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
    {
      sNo: 14,
      salutation: 'Mr.',
      employeesFullName: 'Ankit Verma',
      employeeId: 'INT-EMP-1261',
      nameAsPerAadhar: 'Ankit Verma',
      employeeStatus: 'Completed',
      employeeOnlineId: 'INT-EMP-1261',
      doj: '11 Jul 2020',
      dobGovt: '29 Dec 1989',
      dobActual: '29 Dec 1989',
      department: 'IT',
      subDivision: 'Support Services',
      designation: 'System Administrator',
      reportingManager: 'Swati Khandelwal',
      clientTeam: '',
      location: 'Delhi',
      fatherName: 'Rajesh Verma',
      bloodGroup: 'B-',
      mothersMaidenName: 'Savita Verma',
      panNo: 'QAZPO0999K',
      passportNumber: 'W1290387',
      passportExpiry: '11 Jul 2030',
      aadhaarCardNo: '578910234662',
      uanNo: '991287451007',
      bankAccount: 'KMNB0045210',
      nameAsPerAccount: 'Ankit Verma',
      ifscCode: 'INT-908',
      officialPhoneNo: '8297624511',
      mobileNoOfficial: '8297624511',
      mobileNoPersonal: '8997624511',
      emergencyContactPrimary: '9897624512',
      emergencyContactSecondary: '',
      personalEmailId: 'ankit.verma@introlligent.com',
      officialEmailId: 'ankit.verma@introlligent.com',
      residentialAddress: 'Dwarka Sector 10, Delhi',
      permanentAddress: 'Ghaziabad, Uttar Pradesh',
      nameAsPerPassport: 'Ankit Verma',
      customerIdForFoodCard: 'INT-908',
      maternityLeavePlans: '',
      paternityLeavePlans: 'Eligible',
    },
    {
      sNo: 15,
      salutation: 'Ms.',
      employeesFullName: 'Kavita Menon',
      employeeId: 'INT-EMP-1302',
      nameAsPerAadhar: 'Kavita Menon',
      employeeStatus: 'Pending',
      employeeOnlineId: 'INT-EMP-1302',
      doj: '03 Mar 2024',
      dobGovt: '10 Mar 1994',
      dobActual: '10 Mar 1994',
      department: 'Operations',
      subDivision: 'Vendor Management',
      designation: 'Operations Coordinator',
      reportingManager: 'Nisha Chawla',
      clientTeam: '',
      location: 'Chennai',
      fatherName: 'Vinod Menon',
      bloodGroup: 'A+',
      mothersMaidenName: 'Lakshmi Menon',
      panNo: 'EDFGH5631N',
      passportNumber: 'V8475290',
      passportExpiry: '03 Mar 2034',
      aadhaarCardNo: '655210998372',
      uanNo: '822911558390',
      bankAccount: 'TYUI0976234',
      nameAsPerAccount: 'Kavita Menon',
      ifscCode: 'INT-477',
      officialPhoneNo: '8095567810',
      mobileNoOfficial: '8095567810',
      mobileNoPersonal: '9495567810',
      emergencyContactPrimary: '9695567811',
      emergencyContactSecondary: '',
      personalEmailId: 'kavita.menon@introlligent.com',
      officialEmailId: 'kavita.menon@introlligent.com',
      residentialAddress: 'Anna Nagar, Chennai',
      permanentAddress: 'Kochi, Kerala',
      nameAsPerPassport: 'Kavita Menon',
      customerIdForFoodCard: 'INT-477',
      maternityLeavePlans: 'Eligible',
      paternityLeavePlans: '',
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleViewEmployee = (employee: EmployeeRecord) => {
    setSelectedEmployee(employee);
    setViewDialogOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#9b7cd9]/90 to-[#5da3ff]/90 flex items-center justify-center shadow-md">
            <Database className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Master Database</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Comprehensive employee records with 40+ fields</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 px-4">
                <UserPlus className="w-4 h-4" />
                Add New Employee
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] bg-card/95 backdrop-blur-xl border-border">
            <DialogHeader>
              <DialogTitle>Add New Employee to Master Database</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[75vh] pr-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>S. No.</Label>
                      <Input type="number" placeholder="1" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Salutation</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Ms.">Ms.</SelectItem>
                          <SelectItem value="Mrs.">Mrs.</SelectItem>
                          <SelectItem value="Dr.">Dr.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Employee's Full Name</Label>
                    <Input placeholder="Full legal name" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Employee ID</Label>
                      <Input placeholder="EMP001" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Employee Online ID</Label>
                      <Input placeholder="username" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label>Name as per Aadhar</Label>
                    <Input placeholder="Name on Aadhar card" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Name As per Passport (First, Middle & Surname)</Label>
                    <Input placeholder="Full name as per passport" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Employee Status</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="On Leave">On Leave</SelectItem>
                          <SelectItem value="Notice Period">Notice Period</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>DOJ (Date of Joining)</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Date of Birth (on Govt. records)</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Date of Birth (Actual Born Date)</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="organization" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Department/Team</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select department..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Sub Division</Label>
                      <Input placeholder="Backend, Frontend, etc." className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Designation</Label>
                      <Input placeholder="Senior Developer" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Reporting Manager</Label>
                      <Input placeholder="Manager name" className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Client Team</Label>
                      <Input placeholder="Client or project team" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input placeholder="City/Office location" className="mt-1.5" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Father Name</Label>
                      <Input placeholder="Father's full name" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Mother's Maiden Name</Label>
                      <Input placeholder="Mother's maiden name" className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Blood Group</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Customer ID - For Food Card</Label>
                      <Input placeholder="Food card customer ID" className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Maternity Leave Plans</Label>
                      <Input placeholder="Any maternity plans" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Paternity Leave Plans</Label>
                      <Input placeholder="Any paternity plans" className="mt-1.5" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Pan No</Label>
                      <Input placeholder="ABCDE1234F" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Aadhar Card NO</Label>
                      <Input placeholder="1234 5678 9012" className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Passport Number</Label>
                      <Input placeholder="M1234567" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Passport Expiry</Label>
                      <Input type="date" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label>UAN No</Label>
                    <Input placeholder="UAN number" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Bank A/C</Label>
                      <Input placeholder="Account number" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Name as per Account number</Label>
                      <Input placeholder="Name on bank account" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>IFSC Code</Label>
                      <Input placeholder="HDFC0001234" className="mt-1.5" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Official Phone No.</Label>
                      <Input placeholder="+91 80 1234 5678" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Mobile No. Official</Label>
                      <Input placeholder="+91 98765 43210" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label>Mobile No. Personal</Label>
                    <Input placeholder="+91 98765 43211" className="mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Emergency Contact No. (Primary)</Label>
                      <Input placeholder="+91 98765 43212" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Emergency Contact No. (Secondary)</Label>
                      <Input placeholder="+91 98765 43213" className="mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Personal Email Id</Label>
                      <Input type="email" placeholder="personal@gmail.com" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Official Email ID</Label>
                      <Input type="email" placeholder="employee@company.com" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label>Residential Address</Label>
                    <Input placeholder="Current residential address" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Permanent Address</Label>
                    <Input placeholder="Permanent address" className="mt-1.5" />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4 mt-4 border-t">
                <Button className="flex-1">Save Employee</Button>
                <Button variant="outline" className="flex-1">Cancel</Button>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
          <Button className="gap-2 px-4">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <Button className="gap-2 px-4">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search employees in database..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-sm text-foreground">S. No.</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Employee</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">ID</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Department</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Designation</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-sm text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeId} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                  <td className="p-4 text-sm text-muted-foreground font-medium">{employee.sNo}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5da3ff]/90 to-[#8b6fd9]/90 flex items-center justify-center text-white text-sm font-medium">
                        {employee.employeesFullName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{employee.salutation} {employee.employeesFullName}</div>
                        <div className="text-xs text-muted-foreground font-medium">{employee.officialEmailId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground font-medium">{employee.employeeId}</td>
                  <td className="p-4 text-sm text-muted-foreground font-medium">{employee.department}</td>
                  <td className="p-4 text-sm text-muted-foreground font-medium">{employee.designation}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      employee.employeeStatus === 'Completed'
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : employee.employeeStatus === 'In Progress'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : employee.employeeStatus === 'Pending'
                        ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                        : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                    }`}>
                      {employee.employeeStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewEmployee(employee)}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Employee Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] bg-card/95 backdrop-blur-xl border-border">
          <DialogHeader>
            <DialogTitle>Employee Details - {selectedEmployee?.employeeId}</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <ScrollArea className="h-[75vh] pr-4">
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">S. No.:</span> <span className="font-medium text-foreground">{selectedEmployee.sNo}</span></div>
                    <div><span className="text-muted-foreground">Salutation:</span> <span className="font-medium text-foreground">{selectedEmployee.salutation}</span></div>
                    <div><span className="text-muted-foreground">Full Name:</span> <span className="font-medium text-foreground">{selectedEmployee.employeesFullName}</span></div>
                    <div><span className="text-muted-foreground">Employee ID:</span> <span className="font-medium text-foreground">{selectedEmployee.employeeId}</span></div>
                    <div><span className="text-muted-foreground">Name as per Aadhar:</span> <span className="font-medium text-foreground">{selectedEmployee.nameAsPerAadhar}</span></div>
                    <div><span className="text-muted-foreground">Name as per Passport:</span> <span className="font-medium text-foreground">{selectedEmployee.nameAsPerPassport}</span></div>
                    <div><span className="text-muted-foreground">Online ID:</span> <span className="font-medium text-foreground">{selectedEmployee.employeeOnlineId}</span></div>
                    <div><span className="text-muted-foreground">Status:</span> <span className="font-medium text-foreground">{selectedEmployee.employeeStatus}</span></div>
                  </div>
                </div>

                {/* Dates */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Dates</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><span className="text-muted-foreground">DOJ:</span> <span className="font-medium text-foreground">{selectedEmployee.doj}</span></div>
                    <div><span className="text-muted-foreground">DOB (Govt):</span> <span className="font-medium text-foreground">{selectedEmployee.dobGovt}</span></div>
                    <div><span className="text-muted-foreground">DOB (Actual):</span> <span className="font-medium text-foreground">{selectedEmployee.dobActual}</span></div>
                  </div>
                </div>

                {/* Organization */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Organization</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Department:</span> <span className="font-medium text-foreground">{selectedEmployee.department}</span></div>
                    <div><span className="text-muted-foreground">Sub Division:</span> <span className="font-medium text-foreground">{selectedEmployee.subDivision}</span></div>
                    <div><span className="text-muted-foreground">Designation:</span> <span className="font-medium text-foreground">{selectedEmployee.designation}</span></div>
                    <div><span className="text-muted-foreground">Reporting Manager:</span> <span className="font-medium text-foreground">{selectedEmployee.reportingManager}</span></div>
                    <div><span className="text-muted-foreground">Client Team:</span> <span className="font-medium text-foreground">{selectedEmployee.clientTeam}</span></div>
                    <div><span className="text-muted-foreground">Location:</span> <span className="font-medium text-foreground">{selectedEmployee.location}</span></div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Father Name:</span> <span className="font-medium text-foreground">{selectedEmployee.fatherName}</span></div>
                    <div><span className="text-muted-foreground">Mother's Maiden Name:</span> <span className="font-medium text-foreground">{selectedEmployee.mothersMaidenName}</span></div>
                    <div><span className="text-muted-foreground">Blood Group:</span> <span className="font-medium text-foreground">{selectedEmployee.bloodGroup}</span></div>
                    <div><span className="text-muted-foreground">Food Card ID:</span> <span className="font-medium text-foreground">{selectedEmployee.customerIdForFoodCard}</span></div>
                    <div><span className="text-muted-foreground">Maternity Leave Plans:</span> <span className="font-medium text-foreground">{selectedEmployee.maternityLeavePlans}</span></div>
                    <div><span className="text-muted-foreground">Paternity Leave Plans:</span> <span className="font-medium text-foreground">{selectedEmployee.paternityLeavePlans}</span></div>
                  </div>
                </div>

                {/* Government IDs & Banking */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Government IDs & Banking</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">PAN No:</span> <span className="font-medium text-foreground">{selectedEmployee.panNo}</span></div>
                    <div><span className="text-muted-foreground">Aadhar Card No:</span> <span className="font-medium text-foreground">{selectedEmployee.aadhaarCardNo}</span></div>
                    <div><span className="text-muted-foreground">Passport No:</span> <span className="font-medium text-foreground">{selectedEmployee.passportNumber}</span></div>
                    <div><span className="text-muted-foreground">Passport Expiry:</span> <span className="font-medium text-foreground">{selectedEmployee.passportExpiry}</span></div>
                    <div><span className="text-muted-foreground">UAN No:</span> <span className="font-medium text-foreground">{selectedEmployee.uanNo}</span></div>
                    <div><span className="text-muted-foreground">Bank Account:</span> <span className="font-medium text-foreground">{selectedEmployee.bankAccount}</span></div>
                    <div><span className="text-muted-foreground">Name as per Account:</span> <span className="font-medium text-foreground">{selectedEmployee.nameAsPerAccount}</span></div>
                    <div><span className="text-muted-foreground">IFSC Code:</span> <span className="font-medium text-foreground">{selectedEmployee.ifscCode}</span></div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Official Phone:</span> <span className="font-medium text-foreground">{selectedEmployee.officialPhoneNo}</span></div>
                    <div><span className="text-muted-foreground">Mobile (Official):</span> <span className="font-medium text-foreground">{selectedEmployee.mobileNoOfficial}</span></div>
                    <div><span className="text-muted-foreground">Mobile (Personal):</span> <span className="font-medium text-foreground">{selectedEmployee.mobileNoPersonal}</span></div>
                    <div><span className="text-muted-foreground">Emergency Contact (Primary):</span> <span className="font-medium text-foreground">{selectedEmployee.emergencyContactPrimary}</span></div>
                    <div><span className="text-muted-foreground">Emergency Contact (Secondary):</span> <span className="font-medium text-foreground">{selectedEmployee.emergencyContactSecondary}</span></div>
                    <div><span className="text-muted-foreground">Personal Email:</span> <span className="font-medium text-foreground">{selectedEmployee.personalEmailId}</span></div>
                    <div className="col-span-2"><span className="text-muted-foreground">Official Email:</span> <span className="font-medium text-foreground">{selectedEmployee.officialEmailId}</span></div>
                  </div>
                </div>

                {/* Address */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Address</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-muted-foreground">Residential Address:</span> <span className="font-medium text-foreground">{selectedEmployee.residentialAddress}</span></div>
                    <div><span className="text-muted-foreground">Permanent Address:</span> <span className="font-medium text-foreground">{selectedEmployee.permanentAddress}</span></div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm text-muted-foreground mb-2 font-medium">Total Employees</h3>
          <p className="text-3xl font-semibold text-foreground">{employees.length}</p>
        </div>
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm text-muted-foreground mb-2 font-medium">Active Employees</h3>
          <p className="text-3xl font-semibold text-foreground">
            {employees.filter(e => e.employeeStatus === 'Active').length}
          </p>
        </div>
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm text-muted-foreground mb-2 font-medium">Total Fields</h3>
          <p className="text-3xl font-semibold text-foreground">40+</p>
        </div>
      </div>
    </div>
  );
}
