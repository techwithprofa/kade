export interface Employee {
  id: string;
  name: string;
  contactNumber: string;
  position: string;
  department: string;
  dateOfBirth: string;
}

// Function to generate unique employee ID
export const generateEmployeeId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `EMP-${timestamp}-${randomStr}`.toUpperCase();
};
