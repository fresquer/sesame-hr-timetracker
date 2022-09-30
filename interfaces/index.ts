export type UserName = {
  lastName: string;
  firstName: string;
};

export type TrankInfoModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
  workEntryIn: WorkEntry;
  workEntryOut: WorkEntry;
  employee: Employee;
};

type WorkEntry = {
  date: string;
};

type Employee = {
  lastName: string;
  firstName: string;
  id: string;
  workStatus: string;
};
