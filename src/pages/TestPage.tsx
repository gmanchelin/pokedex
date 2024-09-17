import { useEffect, useState } from "react";
import { getEmployees } from "../models/SharedFunctions";
import { Employee } from "../models/Employee";

function TestPage() {

  const [employees, setEmployees] = useState<Employee[]>([]); 

  async function fetchData() {
    setEmployees(await getEmployees());
  }
  useEffect(() => {
    fetchData();
  }, [employees]);
  return (
    <div>
      {employees!.map((employee) => (
        <div key={employee.username}>{employee.username}</div>
      ))}
    </div>
  );
}

export default TestPage;
