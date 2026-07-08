// import CreateReportComp from "@/src/components/state_admin_portal/routine_inspections/comps/create_report";

import dynamic from "next/dynamic";

const CreateReportComp = dynamic(
  import(
    "@/src/components/state_admin_portal/routine_inspections/comps/create_report"
  ),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default CreateReportComp;
