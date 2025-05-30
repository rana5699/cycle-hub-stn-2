import { getAllUsers } from "@/actions/User"
import CustomersTable from "@/components/Module/Dashboard/Admin/Table/CustomersTable"

const CustomersManagePage = async () => {

  const {data} = await getAllUsers()

  // console.log(data,"data")
  return (
    <div>
        <CustomersTable customers={data} />
    </div>
  )
}

export default CustomersManagePage